import { Button, Input } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../css/Classes.css'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import DrawerMenu from './DrawerMenu';

function Classes() {
var currFaculty = JSON.parse(window.sessionStorage.getItem('current-faculty'))
console.log(currFaculty._id)
  
  var navigate = useNavigate()
   async function handleClick(e,cellValues){
     window.sessionStorage.setItem('class-id', cellValues.id)
     navigate(`/faculty-class`)
   }
   function handleChange(){

   }
    const columns = [
   
        { field: 'CRN', headerName: 'CRN', width: 70 },
        { field: 'CourseName', headerName: 'Course Name', width: 200 },
        { field: 'Section', headerName: 'Section', width: 70 },
        { field: 'Day', headerName: 'Day', width: 150 },
        { field: 'Semester', headerName: 'Semester', width: 100 },
        { field: 'Year', headerName: 'Year', width: 70 },
        { field: 'StartTime', headerName: 'Start Time', width: 100 },
        { field: 'EndTime', headerName: 'End Time', width: 100 },
        { field: 'RoomNumber', headerName: 'Room Number', width: 120 },
        {
          field: "Edit",
          renderCell: (cellValues) => {
            return (
              <Button
                variant="contained"
                color="primary"
                onClick={(event) => {
                  handleClick(event, cellValues);
                }}
              >
                <SearchIcon/>
              </Button>
            );
          }
        },
        {
          field: "Grade",
          renderCell: (cellValues) => {
            return (
              <Input
                variant="contained"
                color="primary"
                onChange={(event) => {
                  handleChange(event, cellValues);
                }}
              >
                Print
              </Input>
            );
          }
        }
      ];
      const [selectionModel, setSelectionModel] = useState([]);
    const [classes, setClasses] = useState()
   useEffect(async () => {
     
     console.log(JSON.parse(window.sessionStorage.getItem('current-faculty')).UserID)
    await axios.get(`https://54.196.9.169:5001/api/faculty-class/${currFaculty.UserID}`).then(res=>{
      console.log(res.data)
      if(res.data.length>0){
        setClasses(res.data)
        console.log(classes)
      }
      
    })
   }, [])
   
 
    
    var rows = classes
    console.log(rows)
    function handleDeleteClick(){

    }

  return (
    <div className='classes'>
      <DrawerMenu/>
       <h5>Classes for Faculty {JSON.parse(window.sessionStorage.getItem('current-faculty')).UserID}</h5>

<div style={{ height: 400, width: '70vw' }}>
  <DataGrid
    rows={rows}
    columns={columns}
    pageSize={100}
    rowsPerPageOptions={[5]}
    getRowId={(row) => row._id}
    checkboxSelection = {true}
    onSelectionModelChange={(newSelectionModel) => {
      setSelectionModel(newSelectionModel);
      
    }}
    selectionModel={selectionModel}
    
    
  />
  <Button onClick={handleDeleteClick()}><h3>DELETE</h3></Button>
</div>

    </div>
  )
}

export default Classes