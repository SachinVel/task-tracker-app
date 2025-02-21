// @flow
import React from "react";
import { Box } from "@mui/material";
import '../styles/Layout.css';
import { DataGrid } from "@mui/x-data-grid";

const List = ({
    data,
    columns
}) => {


    return (
        <Box className="list-container" >
            <DataGrid
                // sx={{
                //     "& .MuiDataGrid-cell": {
                //         border: "1px solid #868686",
                //         // add more css for customization
                //     },
                //     "& .MuiDataGrid-columnHeader": {
                //         border: "1px solid #868686",
                //         // add more css for customization
                //     }
                    
                // }}
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[10, 25, 50]}
                checkboxSelection={false}
                disableRowSelectionOnClick
                disableColumnMenu={true}
            />
        </Box>
    );
};

export default List;
