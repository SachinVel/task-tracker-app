import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, Checkbox, Stack, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import '../styles/Layout.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function FilterPopup({ isOpen, onClose, onFilter, filterData }) {

    const [isStatusChecked, setIsStatusChecked] = useState(false);
    const [taskStatus, setTaskStatus] = useState('');

    const [isTitleChecked, setIsTitleChecked] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');

    const [isDescChecked, setIsDescChecked] = useState(false);
    const [taskDescription, setTaskDescription] = useState('');

    const [isDateChecked, setIsDateChecked] = useState(false);
    const [taskDate, setTaskDate] = useState(null);


    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [errorMesage, setErrorMessage] = useState('');


    const handleClose = () => {
        onClose();
    };

    const hanldeSnackbarClose = () => {
        setIsSnackbarOpen(false)
    }

    const handleStatusChange = (event) => {
        setTaskStatus(event.target.value);
    };

    const handleFilter = () => {
        let date = null;
        if( taskDate!=null ){
            date = taskDate.unix()+'';
        }
        onFilter({
            title: {
                isChecked : isTitleChecked,
                value : taskTitle
            },
            description: {
                isChecked : isDescChecked,
                value : taskDescription
            },
            date: {
                isChecked : isDateChecked,
                value : date
            },
            status: {
                isChecked : isStatusChecked,
                value : taskStatus
            }
        });
    }

    useEffect(() => {
        if (filterData != null) {
            if( filterData.title ){
                let data = filterData.title;
                setTaskTitle(data.value);    
                setIsTitleChecked(data.isChecked);    
            }
            if( filterData.description ){
                let data = filterData.description;
                setTaskDescription(data.value);    
                setIsDescChecked(data.isChecked);    
            }
            if( filterData.status ){
                let data = filterData.status;
                setTaskStatus(data.value);    
                setIsStatusChecked(data.isChecked);    
            }
            if( filterData.date ){
                let data = filterData.date;
                if( data.value!=null ){
                    setTaskDate(dayjs(new Date(+data.value*1000)));    
                }else{
                    setTaskDate(null);
                }
                setIsDateChecked(data.isChecked);    
            }
        }
    }, [filterData, isOpen]);


    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>Filter</DialogTitle>
            <DialogContent className="task-popup-container">

                <Stack direction="row" justifyContent="center" spacing={2}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        value={taskTitle}
                        onChange={(e) => { setTaskTitle(e.target.value) }}
                    />
                    <Checkbox
                        checked={isTitleChecked}
                        onChange={e => {
                            setIsTitleChecked(e.target.checked);
                        }}
                    />
                </Stack>

                <Stack direction="row" justifyContent="center" spacing={2}>
                    <TextField
                        label="Description"
                        multiline
                        value={taskDescription}
                        onChange={(e) => { setTaskDescription(e.target.value) }}
                    />
                    <Checkbox
                        checked={isDescChecked}
                        onChange={e => {
                            setIsDescChecked(e.target.checked);
                        }}
                    />
                </Stack>

                <Stack direction="row" justifyContent="center" spacing={2}>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Task status</InputLabel>
                        <Select
                            value={taskStatus}
                            label="Task Status"
                            onChange={handleStatusChange}
                            sx={{
                                width : "200px"
                            }}
                        >
                            <MenuItem value='todo'>To Do</MenuItem>
                            <MenuItem value='progress'>In Progress</MenuItem>
                            <MenuItem value='waitlist'>Waitlist</MenuItem>
                            <MenuItem value='completed'>Completed</MenuItem>
                        </Select>
                    </FormControl>
                    <Checkbox
                        checked={isStatusChecked}
                        onChange={e => {
                            setIsStatusChecked(e.target.checked);
                        }}



                        
                    />
                </Stack>

                <Stack direction="row" justifyContent="center"spacing={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Due Date" value={taskDate} onChange={(value) => { setTaskDate(value) }} />
                    </LocalizationProvider>
                    <Checkbox
                        checked={isDateChecked}
                        onChange={e => {
                            setIsDateChecked(e.target.checked);
                        }}
                    />
                </Stack>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleFilter}>Filter</Button>

            </DialogActions>
            <Snackbar open={isSnackbarOpen} autoHideDuration={4000} onClose={hanldeSnackbarClose}>
                <Alert severity="error" onClose={hanldeSnackbarClose}>{errorMesage}</Alert>
            </Snackbar>
        </Dialog>

    )
}