import React from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import TagIcon from '@mui/icons-material/Tag';
import '../styles/Layout.css';

export default function Header() {

  return (
      <Box className="header-container">
        {/* <TagIcon fontSize="large" sx={{
            color : "#fbe608"
        }}/> */}
        <Typography sx={{
            fontSize : "25px",
            fontWeight : "bold"
        }}>Task Tracker</Typography>
      </Box>
  );
}
