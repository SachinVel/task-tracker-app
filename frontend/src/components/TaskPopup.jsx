import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import '../styles/Layout.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function TaskPopup({ isOpen, popupType, onClose, onCreate, onUpdate, taskData }) {

    const [taskStatus, setTaskStatus] = useState('todo');
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDate, setTaskDate] = useState(dayjs(new Date()));
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [errorMesage, setErrorMessage] = useState('');
    const [taskId, setTaskId] = useState('');


    const handleClose = () => {
        onClose();
    };

    const hanldeSnackbarClose = () => {
        setIsSnackbarOpen(false)
    }

    const handleStatusChange = (event) => {
        setTaskStatus(event.target.value);
    };

    const handleCreate = () => {
        if (taskTitle === '' || taskDescription === '') {
            setErrorMessage('some fields are empty');
            setIsSnackbarOpen(true);
            return;
        }
        onCreate({
            taskTitle : taskTitle,
            taskDesc : taskDescription,
            taskStatus : taskStatus,
            taskDue : taskDate.unix()+''
        });
    }

    const handleUpdate = () => {
        if (taskTitle === '' || taskDescription === '') {
            setErrorMessage('some fields are empty');
            setIsSnackbarOpen(true);
            return;
        }
        onUpdate({
            taskID : taskId,
            taskTitle : taskTitle,
            taskDesc : taskDescription,
            taskStatus : taskStatus,
            taskDue : taskDate.unix()+''
        });
    }

    useEffect(()=>{
        if( popupType==='update' && taskData!=null ){
            setTaskDate(dayjs(new Date(+taskData.taskDue*1000)));
            setTaskDescription(taskData.taskDesc);
            setTaskStatus(taskData.taskStatus);
            setTaskTitle(taskData.taskTitle);
            setTaskId(taskData.id);
        }
    },[taskData,isOpen]);


    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>{popupType === 'create' ? 'Create Task' : 'Update Task'}</DialogTitle>
            <DialogContent className="task-popup-container">
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Title"
                    value={taskTitle}
                    onChange={(e) => { setTaskTitle(e.target.value) }}
                />
                <TextField
                    label="Description"
                    multiline
                    value={taskDescription}
                    onChange={(e) => { setTaskDescription(e.target.value) }}
                />
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Task status</InputLabel>
                    <Select
                        value={taskStatus}
                        label="Task Status"
                        onChange={handleStatusChange}
                    >
                        <MenuItem value='todo'>To Do</MenuItem>
                        <MenuItem value='progress'>In Progress</MenuItem>
                        <MenuItem value='waitlist'>Waitlist</MenuItem>
                        <MenuItem value='completed'>Completed</MenuItem>
                    </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Due Date" value={taskDate} minDate={dayjs(new Date())} onChange={(value) => { setTaskDate(value) }} />
                </LocalizationProvider>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                {popupType=='create' && <Button onClick={handleCreate}>Create</Button>}
                {popupType=='update' && <Button onClick={handleUpdate}>Update</Button>}
                
            </DialogActions>
            <Snackbar open={isSnackbarOpen} autoHideDuration={4000} onClose={hanldeSnackbarClose}>
                <Alert severity="error" onClose={hanldeSnackbarClose}>{errorMesage}</Alert>
            </Snackbar>
        </Dialog>

    )
}