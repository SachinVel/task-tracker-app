import React from "react";
import '../styles/Column.css';
import { Box, Typography } from "@mui/material";
import PostList from "./PostList";

const Column = (props) => {
    let columnHeader = {
        todo : 'To Do',
        progress : 'Progress',
        waitlist : 'Waitlist',
        completed : 'Completed'
    }
    const title = props.title;
    const quotes = props.quotes;
    const index = props.index;
    return (
        <Box className="column-container" >
            <Box className="column-header">
                <Typography sx={{
                    textAlign : "center",
                    fontWeight : "bold",
                    fontSize : "18px"
                }}>
                    {columnHeader[title]}
                </Typography>
            </Box>
            <PostList
                listId={title}
                listType="QUOTE"
                quotes={quotes}
                internalScroll={props.isScrollable}
                className="post-list"
                onDelete={props.onDelete}
                onUpdate={props.onUpdate}
            />
        </Box>
    );
};

export default Column;
