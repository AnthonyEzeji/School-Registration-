import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import '../css/DropEnrollment.css'
import DrawerMenu from './DrawerMenu';
import DrawerMenu2 from './DrawerMenu2';
function DropEnrollment() {
  var navigate = useNavigate()
  async function onClick(e){
await axios.delete(`https://54.196.9.169:5001/api/enrollment/${JSON.parse(window.sessionStorage.getItem("current-student")).UserID}`,{data:selectionModel}).then(res=>{
  console.log(res.data)
})
  }

  const [selectionModel, setSelectionModel] = useState([]);
  const columns = [
   
    { field: 'CRN', headerName: 'CRN', width: 150 },
    { field: 'Semester_Year', headerName: 'Semester', width: 150 },
    { field: 'CourseName', headerName: 'CourseName', width: 200 }

  ];
  const [studentEnrollments,setStudentEnrollments] = useState([])
  useEffect(async () => {
    await axios.get(`https://54.196.9.169:5001/api/enrollment/${JSON.parse(window.sessionStorage.getItem("current-student")).UserID}`).then(res=>{
    console.log(res.data)
      setStudentEnrollments(res.data)
    })
    }, [])
    var rows = studentEnrollments;
  return (
    <div className='drop-enrollment'>
      {JSON.parse(window.sessionStorage.getItem("session")).user.UserType == 'Student'?<DrawerMenu2/>:<DrawerMenu/>}
      <h1>Drop Enrollments</h1>
      <h5>Student: {JSON.parse(window.sessionStorage.getItem("current-student")).LastName+","+JSON.parse(window.sessionStorage.getItem("current-student")).FirstName}</h5>
      
      <div className = "shadow" style={{marginTop:50, height: "50vh", width: '60vw' }}>
  <DataGrid
  
    rows={rows}
    columns={columns}
    pageSize={100}
    rowsPerPageOptions={[5]}
    getRowId={(row) => row._id}
    checkboxSelection = {true}
    onSelectionModelChange={(newSelectionModel) => {
      setSelectionModel(newSelectionModel);
      console.log(selectionModel)
    }}
    selectionModel={selectionModel}
    
    
  />
  
  
</div>
<Button onClick = {onClick}>Delete</Button>

<Button id = 'enroll-btn'  onClick = {()=>{
  JSON.parse(window.sessionStorage.getItem("session")).user.UserType == 'Student'?navigate('/register'):navigate(`/enroll-student/${JSON.parse(window.sessionStorage.getItem("current-student")).UserID}`)
}}>ADD ENROLLMENT</Button>
    </div>
  )
}

export default DropEnrollment