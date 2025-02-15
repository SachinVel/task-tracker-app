// @flow
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Column from "./Column";
import reorder, { reorderQuoteMap } from "../utils/reorder";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Box } from "@mui/material";
import '../styles/Board.css';



const Board = ({
  initial,
  withScrollableColumns,
  data,
  onDelete,
  onUpdate,
  onTaskUpdateStatus
}) => {
  const [columns, setColumns] = useState(initial);

  const [ordered, setOrdered] = useState(['todo','progress','waitlist','completed']);

  const onDragEnd = (result) => {
    // if (result.combine) {
    //   if (result.type === "COLUMN") {
    //     const shallow = [...ordered];
    //     shallow.splice(result.source.index, 1);
    //     setOrdered(shallow);
    //     return;
    //   }

    //   const column = columns[result.source.droppableId];
    //   const withQuoteRemoved = [...column];

    //   withQuoteRemoved.splice(result.source.index, 1);

    //   const orderedColumns = {
    //     ...columns,
    //     [result.source.droppableId]: withQuoteRemoved
    //   };
    //   setColumns(orderedColumns);
    //   return;
    // }

    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // reordering column
    // if (result.type === "COLUMN") {
    //   const reorderedorder = reorder(ordered, source.index, destination.index);

    //   setOrdered(reorderedorder);

    //   return;
    // }

    const data = reorderQuoteMap({
      quoteMap: columns,
      source,
      destination
    });

    setColumns(data.quoteMap);

    onTaskUpdateStatus({
      taskID : result.draggableId,
      taskStatus : destination.droppableId
    })
  };


  const updateTaskList = (taskList,data,status)=>{
    const dataSet = {};
    const listSet = new Set();

    taskList.forEach(task => {
      listSet.add(task.id);
    });
    let newList = [];
    data.forEach(task => {
      dataSet[task.id] = task;
      if( !listSet.has(task.id) && task.taskStatus===status){
        newList.push(task);
      }
    });
    
    //update existing
    taskList = taskList.map((task)=>{
      if( dataSet[task.id] && dataSet[task.id].taskStatus===status){
        return dataSet[task.id];
      }else{
        return null;
      }
    });

    taskList = taskList.filter((task)=>(task!==null));
    taskList = [...taskList,...newList];
    return taskList;
  }

  useEffect(()=>{
    let toDoTask = updateTaskList([...columns.todo],data,'todo');
    let progressTask = updateTaskList([...columns.progress],data,'progress');
    let completedTask = updateTaskList([...columns.completed],data,'completed');
    let waitlistTask = updateTaskList([...columns.waitlist],data,'waitlist');;

    setColumns({
      todo : toDoTask,
      progress : progressTask,
      completed : completedTask,
      waitlist : waitlistTask,
    });
    setOrdered(['todo','progress','waitlist','completed']);
  },[data]);

  

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Box className="board-container">
              {ordered.map((key, index) => (
                <Column
                  key={key}
                  index={index}
                  title={key}
                  quotes={columns[key]}
                  isScrollable={withScrollableColumns}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                />
              ))}
            </Box>
      </DragDropContext>
    </>
  );
};

export default Board;
