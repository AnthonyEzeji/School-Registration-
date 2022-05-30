import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AdminAddEnrollments() {
    const [schedule, setSchedule] = useState([]);
    useEffect(() => {
axios.get("https://54.196.9.169:5001/api/masterschedule").then(res=>{
    setSchedule(res.data)
})
}, [])
var navigate = useNavigate()
    const [selectionModel, setSelectionModel] = useState([])
    useEffect(() => {
      console.log(selectionModel)
    }, [selectionModel])
    
    const columns = [
        { field: 'CRN', headerName: 'CRN', width: 70 },
       
        { field: 'CourseID', headerName: 'CourseID', width: 100 },
        { field: 'Section', headerName: 'Section', width: 100 },
        {
          field: 'CourseName',
          headerName: 'Course Name',
          
          width: 250,
        },
        {
          field: 'DepartmentName',
          headerName: 'Department',
          width: 300
        },
        {field: 'Day',
        headerName: 'Day',
        width: 160},
        {field: 'StartTime',
        headerName: 'Start Time',
        width: 160},
        {
          field: 'EndTime',
          headerName: 'End Time',
          width: 160
      },
      {
        field: 'Semester',
            headerName: 'Semester',
            width: 160
      },{
        field: 'Year',
            headerName: 'Year',
            width: 160
      },{
        field: 'Building',
          headerName: 'Building',
          width: 160
    },{
      field: 'RoomNumber',
          headerName: 'Room Number',
          width: 160
    },{
      field: 'ProfessorFirstName',
          headerName: 'Professor First Name',
          width: 160
    },{
      field: 'ProfessorLastName',
          headerName: 'Professor Last Name',
          width: 160
    
    },{
      field: 'AvailableSeats',
          headerName: 'Available Seats',
          width: 160
    },{
      field: 'TotalSeats',
          headerName: 'Toatal Seats',
          width: 160
    },
      ];
    
    var rows = schedule

    function handleEnrollClick(e){
        axios.post(`https://54.196.9.169:5001/api/enrollment/${JSON.parse(window.sessionStorage.getItem('current-student')).UserID}`,{data:selectionModel} ).then(res=>{
          if(res.data.hasOwnProperty("CRN")){
            alert("Student: " + JSON.parse(window.sessionStorage.getItem('current-student')).UserID + " registered for class:" +res.data.CRN)
          }
          if(res.data.hasOwnProperty("message")){
            alert(res.data.message)
          }
          
        })
    }
    
  return (
    <div>
        
      <h5>Student: {JSON.parse(window.sessionStorage.getItem('current-student')).UserID} Course Registry</h5>
        <div className="shadow" div style={{marginTop:50, height: 800, width: '90vw' }} >
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
      
        
      />
      </div>
      <Button onClick = {handleEnrollClick}>"add course"</Button>
      <Button onClick = {()=>{navigate(`/enrollment/${JSON.parse(window.sessionStorage.getItem('current-student')).UserID}`)}}>Go to {JSON.parse(window.sessionStorage.getItem('current-student')).FirstName}'s Enrollments</Button>
    </div>
    
  )
}

export default AdminAddEnrollments