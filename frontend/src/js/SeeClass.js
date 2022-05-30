import { Button, Input } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DrawerMenu3 from './DrawerMenu3';
import DrawerMenu from './DrawerMenu';

function SeeClass() {
 
useEffect(async () => {
await axios.get(`https://54.196.9.169:5001/api/attendance/${JSON.parse(window.sessionStorage.getItem('curr-class'))}`).then(res=>{
  console.log(res.data)
})
}, [])

  var navigate = useNavigate()
    async function handleGradeClick(e,cellValues){
      await axios.get(`https://54.196.9.169:5001/api/faculty-class/update-grade/${cellValues.id}`).then(res=>{
               
        window.sessionStorage.setItem('current-student', JSON.stringify(res.data))
        
        navigate('/update-grade')
    })
     
    }
    async function handleAttendanceClick(e,cellValues){
      await axios.get(`https://54.196.9.169:5001/api/faculty-class/update-grade/${cellValues.id}`).then(res=>{
               
        window.sessionStorage.setItem('current-student', JSON.stringify(res.data))
        
        navigate('/update-attendance')
    })
     
    }
    function handleChange(e){

    }
    const columns = [
 
        { field: 'FirstName', headerName: 'First Name', width: 150 },
        { field: 'LastName', headerName: 'Last Name', width: 150 },
        { field: 'Email', headerName: 'Email', width: 200 },
        {field: 'UserID', headerName: 'UserID', width:200},
          {
            field: "Gardes",width:300,
            renderCell: (cellValues) => {
              return (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(event) => {
                    handleGradeClick(event, cellValues);
                  }}
                >
                  Update Grade
                </Button>
              );
            }
          },
          {
            field: "Attendance",width:200,
            renderCell: (cellValues) => {
              return (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(event) => {
                    handleAttendanceClick(event, cellValues);
                  }}
                >
                  Update Attendance
                </Button>
              );
            }
          }
       
    
      ];
    const [classStudents, setclassStudents] = useState([])
    const [selectionModel, setSelectionModel] = useState([])
    useEffect(() => {
      console.log(selectionModel)
      }, [selectionModel])
    useEffect(async() => {
    await axios.get(`https://54.196.9.169:5001/api/faculty-class/faculty-schedule/${window.sessionStorage.getItem('curr-class')}`).then(res=>{
        console.log(res)
        setclassStudents(res.data)
    })
    }, []);
    var rows = classStudents
  return (
    <div>
{JSON.parse(window.sessionStorage.getItem('session')).user.UserType=="Admin"?<DrawerMenu/>:<DrawerMenu3/>}
        <div className = "shadow" style={{marginTop:50, height: "50vh", width: '70vw' }}>
  <DataGrid
  
    rows={rows}
    columns={columns}
    pageSize={100}
    rowsPerPageOptions={[5]}
    getRowId={(row) => row._id}
    checkboxSelection = {false}
    onSelectionModelChange={(newSelectionModel) => {
      setSelectionModel(newSelectionModel);
      console.log(selectionModel)
    }}
    selectionModel={selectionModel}
    
    
  />
  
  
</div>
    </div>
  )
}

export default SeeClass