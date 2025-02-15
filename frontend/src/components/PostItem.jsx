import React from 'react';
import styled from '@xstyled/styled-components';
import { Typography,Stack,IconButton } from '@mui/material';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const imageSize = 40;

const CloneBadge = styled.div`
  background: #79f2c0;
  bottom: 4px;
  border: 2px solid #57d9a3;
  border-radius: 50%;
  box-sizing: border-box;
  font-size: 10px;
  position: absolute;
  right: -${imageSize / 3}px;
  top: -${imageSize / 3}px;
  transform: rotate(40deg);
  height: ${imageSize}px;
  width: ${imageSize}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.a`
  border-radius: 5px;
  border: 2px solid transparent;
  
  background-color: white;
  border : 1px solid black;
  box-shadow: ${({ isDragging }) => (isDragging ? `2px 2px 1px #A5ADBA` : 'none')};
  box-sizing: border-box;
  padding: 8px;
  min-height: ${imageSize}px;
  margin-bottom: 8px;
  user-select: none;
  width : 100%;

  /* anchor overrides */
  color: #091e42;

  &:hover,
  &:active {
    color: #091e42;
    text-decoration: none;
  }

  &:focus {
    outline: none;
    border-color: red;
    box-shadow: none;
  }

  /* flexbox */
  display: flex;
`;

const Avatar = styled.img`
  width: ${imageSize}px;
  height: ${imageSize}px;
  border-radius: 50%;
  margin-right: 8px;
  flex-shrink: 0;
  flex-grow: 0;
`;

const Content = styled.div`
  /* flex child */
  flex-grow: 1;
  /*
    Needed to wrap text in ie11
    https://stackoverflow.com/questions/35111090/why-ie11-doesnt-wrap-the-text-in-flexbox
  */
  flex-basis: 100%;
  /* flex parent */
  display: flex;
  flex-direction: column;
`;

const BlockQuote = styled.div`
  &::before {
    content: open-quote;
  }
  &::after {
    content: close-quote;
  }
`;

const Footer = styled.div`
  display: flex;
  margin-top: 8px;
  align-items: center;
`;

const QuoteId = styled.small`
  flex-grow: 1;
  flex-shrink: 1;
  margin: 0;
  font-weight: normal;
  text-overflow: ellipsis;
  text-align: right;
`;

function getStyle(provided, style) {
  if (!style) {
    return provided.draggableProps.style;
  }

  return {
    ...provided.draggableProps.style,
    ...style,
  };
}

let statusField = {
  todo : 'To Do',
  progress : 'Progress',
  waitlist : 'Waitlist',
  completed : 'Completed'
}

// Previously this extended React.Component
// That was a good thing, because using React.PureComponent can hide
// issues with the selectors. However, moving it over does can considerable
// performance improvements when reordering big lists (400ms => 200ms)
// Need to be super sure we are not relying on PureComponent here for
// things we should be doing in the selector as we do not know if consumers
// will be using PureComponent
function PostItem(props) {
  const { task, isDragging, isGroupedOver, provided, style, isClone, index,onDelete, onUpdate } = props;

  return (
    <Container
      isDragging={isDragging}
      isGroupedOver={isGroupedOver}
      isClone={isClone}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getStyle(provided, style)}
      data-is-dragging={isDragging}
      data-testid={task.id}
      data-index={index}
    >
      {isClone ? <CloneBadge>Clone</CloneBadge> : null}
      <Content>
        {/* <BlockQuote>{quote.content}</BlockQuote>
        <Footer>
          <Author colors={quote.author.colors}>{quote.author.name}</Author>
          <QuoteId>
            id:
            {quote.id}
          </QuoteId>
        </Footer> */}
        <Typography sx={{
          fontSize: "15px",
          fontWeight: "bold"
        }}>
          {task.taskTitle}
        </Typography>

        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Typography align='left' sx={{
            fontWeight : '600'
          }}>
            Description : 
          </Typography>
          <Typography align='left' flexWrap="wrap" sx={{
            overflow: 'hidden', textOverflow: 'ellipsis', width:"100%"
          }}>
            {task.taskDesc}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Typography align='left' sx={{
            fontWeight : '600'
          }}>
            Status : 
          </Typography>
          <Typography align='left'>
            {statusField[task.taskStatus]}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Typography align='left' sx={{
            fontWeight : '600'
          }}>
            Due Date : 
          </Typography>
          <Typography align='left'>
            { dayjs(new Date(+task.taskDue*1000)).format('MM/DD/YYYY')}
          </Typography>
        </Stack>

        <Stack direction="row"  justifyContent="flex-end" spacing={2}>
            <IconButton variant="contained" size="small" onClick={()=>{onUpdate(task.id)}}><EditIcon /></IconButton>
            <IconButton variant="contained" size="small" onClick={()=>{onDelete(task.id)}}><DeleteIcon /></IconButton>
          </Stack>



      </Content>
    </Container>
  );
}

export default React.memo(PostItem);
