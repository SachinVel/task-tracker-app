/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from '@xstyled/styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import PostItem from './PostItem';
import { Typography } from '@mui/material';
import '../styles/Layout.css';

export const getBackgroundColor = (isDraggingOver, isDraggingFrom) => {
  if (isDraggingOver) {
    return '#FFEBE6';
  }
  if (isDraggingFrom) {
    return '#E6FCFF';
  }
  return '#EBECF0';
};

const Wrapper = styled.div`
  background-color: ${(props) => getBackgroundColor(props.isDraggingOver, props.isDraggingFrom)};
  display: flex;
  flex-direction: column;
  opacity: ${({ isDropDisabled }) => (isDropDisabled ? 0.5 : 'inherit')};
  padding: 8px;
  border: 8px;
  padding-bottom: 0;
  transition: background-color 0.2s ease, opacity 0.1s ease;
  user-select: none;
  border-radius : 0px 0px 5px 5px;
  height : 100%;
`;

const scrollContainerHeight = 500;

const DropZone = styled.div`
  /* stop the list collapsing when empty */
  /*min-height: ${scrollContainerHeight}px;*/
  height : 100%;
  /*
    not relying on the items for a margin-bottom
    as it will collapse when the list is empty
  */
  padding-bottom: 8px;
`;

const ScrollContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  / *max-height: ${scrollContainerHeight}px; */
  height : 100%;
`;

/* stylelint-disable block-no-empty */
const Container = styled.div`
  height : 100%;
`;
/* stylelint-enable */

const InnerQuoteList = React.memo(function InnerQuoteList(props) {
  return props.quotes.map((quote, index) => (
    <Draggable key={quote.id} draggableId={quote.id} index={index}>
      {(dragProvided, dragSnapshot) => (
        <PostItem
          key={quote.id}
          task={quote}
          isDragging={dragSnapshot.isDragging}
          isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
          provided={dragProvided}
          onDelete={props.onDelete}
          onUpdate={props.onUpdate}
        />
      )}
    </Draggable>
  ));
});

function InnerList(props) {
  const { quotes, dropProvided } = props;
  const title = props.title ? <Typography>{props.title}</Typography> : null;

  return (
    <Container>
      {title}
      <DropZone ref={dropProvided.innerRef}>
        <InnerQuoteList quotes={quotes} onDelete={props.onDelete} onUpdate={props.onUpdate}/>
        {dropProvided.placeholder}
      </DropZone>
    </Container>
  );
}

export default function PostList(props) {
  const {
    ignoreContainerClipping,
    internalScroll,
    scrollContainerStyle,
    isDropDisabled,
    listId = 'LIST',
    listType,
    style,
    quotes,
    title,
    onDelete,
    onUpdate
  } = props;

  return (
    <Droppable
      droppableId={listId}
      type={listType}
      ignoreContainerClipping={ignoreContainerClipping}
      isDropDisabled={isDropDisabled}
      sx={{
        height : "900px"
      }}
      // renderClone={(provided, snapshot, descriptor) => (
      //   <PostItem
      //     quote={quotes[descriptor.source.index]}
      //     provided={provided}
      //     isDragging={snapshot.isDragging}
      //     isClone
      //   />)
      // }
    >
      {(dropProvided, dropSnapshot) => (
        <Wrapper
          style={style}
          isDraggingOver={dropSnapshot.isDraggingOver}
          isDropDisabled={isDropDisabled}
          isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          {...dropProvided.droppableProps}
          
        >
          {internalScroll ? (
            <ScrollContainer style={scrollContainerStyle} className="scroll-container">
              <InnerList quotes={quotes} title={title} dropProvided={dropProvided} onDelete={onDelete} onUpdate={onUpdate}/>
            </ScrollContainer>
          ) : (
            <InnerList quotes={quotes} title={title} dropProvided={dropProvided} />
          )}
        </Wrapper>
      )}
    </Droppable>
  );
}
