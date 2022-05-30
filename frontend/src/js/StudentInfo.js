
import { Button, Input } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/StudentInfo.css'
import DrawerMenu from './DrawerMenu'
import DrawerMenu3 from './DrawerMenu3'
function StudentInfo() {
  const [password, setPassword] = useState('')
  const [advisor, setAdvisor] = useState({})  
  var UserID = JSON.parse(window.sessionStorage.getItem('current-student')).UserID
  
 var major = JSON.parse(window.sessionStorage.getItem('major')).major
 console.log(major)
 var navigate = useNavigate();
function handleScheduleClick(){
  navigate('/student-schedule')
}
 
 


  useEffect(() => {
   console.log(password)
  }, [password])

  useEffect(async () => {
    await axios.get(`https://54.196.9.169:5001/api/advisor/${UserID}`).then(res=>{
     
      setAdvisor(res.data)
    })
    
   }, [])
  console.log(advisor.FirstName)

  var currentStudent = JSON.parse(window.sessionStorage.getItem('current-student'))
 
    const address = currentStudent.Street +', '+ currentStudent.City+', '+ currentStudent.State + ', '+ currentStudent.Country + " " + currentStudent.Zip
  if(JSON.parse(window.sessionStorage.getItem('session')).user.UserType=="Admin" ){
    return (
      <div className = 'student-info'>
        <DrawerMenu/>
        <h1>Student Information</h1>
        <div className="info-container">
          <div className="info-field">
            <h5>ID</h5>
            <Input readOnly = {true} disableUnderline={true} value={currentStudent.UserID}></Input>
          </div>
          <div className="info-field">
            <h5>First Name</h5>
            <Input readOnly = {true} disableUnderline={true} value={currentStudent.FirstName}></Input>
          </div>
          <div className="info-field">
            <h5>Last Name</h5>
            <Input  readOnly = {true} disableUnderline={true} value={currentStudent.LastName}></Input>
          </div>
          <div className="info-field">
            <h5>Date of Birth</h5>
            <Input readOnly = {true} disableUnderline={true} value={currentStudent.DOB}></Input>
          </div>
          <div className="info-field">
            <h5>Email</h5>
            <Input readOnly = {true} disableUnderline={true} value={currentStudent.Email}></Input>
          </div>
          <div className="info-field">
            <h5>Address</h5>
            <Input readOnly = {true}  disableUnderline={true} defaultValue={address}></Input>
          </div>
          <div className="info-field">
            <h5>User Type</h5>
            <Input readOnly = {true} disableUnderline={true}  value={currentStudent.UserType}></Input>
          </div>
          <div className="info-field">
            <h5>Major</h5>
            {<Input onChange={(e)=>{setPassword(e.target.value)  }} defaultValue = {major} ></Input>}
          </div>
          <div className="info-field">
            <h5>Password</h5>
            <Input  onChange={(e)=>{setPassword(e.target.value)  }} defaultValue = {JSON.parse(window.sessionStorage.getItem('session')).user.UserType=="Faculty"?"":currentStudent.Password} ></Input>
          </div>
        
        </div>
        
        <Button id = 'button-save'>Save</Button>
        <Button id = 'button-save' onClick = {handleScheduleClick}>View Schedule</Button>
        <div className="advisor">
          <h5>Advisor</h5>
{advisor.FirstName+", " +  advisor.LastName}
     </div>
    
          
      </div>
    )
  }else{
    return (
      <div className = 'student-info2'>
        <DrawerMenu3/>
        <h1>Student Information</h1>
        <div className="info-container">
          <div className="info-field">
            <h5>ID</h5>
            <Input readOnly = {true} disableUnderline={true} value={currentStudent.UserID}></Input>
          </div>
          <div className="info-field">
            <h5>First Name</h5>
            <Input readOnly = {true} disableUnderline={true} value={currentStudent.FirstName}></Input>
          </div>
          <div className="info-field">
            <h5>Last Name</h5>
            <Input  readOnly = {true} disableUnderline={true} value={currentStudent.LastName}></Input>
          </div>
          <div className="info-field">
            <h5>Date of Birth</h5>
            <Input readOnly = {true} disableUnderline={true} value={currentStudent.DOB}></Input>
          </div>
          <div className="info-field">
            <h5>Email</h5>
            <Input readOnly = {true} disableUnderline={true} value={currentStudent.Email}></Input>
          </div>
          <div className="info-field">
            <h5>Address</h5>
            <Input readOnly = {true}  disableUnderline={true} defaultValue={address}></Input>
          </div>
          <div className="info-field">
            <h5>User Type</h5>
            <Input readOnly = {true} disableUnderline={true}  value={currentStudent.UserType}></Input>
          </div>
          <div className="info-field">
            <h5>Major</h5>
            {<Input onChange={(e)=>{setPassword(e.target.value)  }} defaultValue = {major} ></Input>}
          </div>
          <div className="info-field">
            <h5>Password</h5>
            <Input  onChange={(e)=>{setPassword(e.target.value)  }} defaultValue = {JSON.parse(window.sessionStorage.getItem('session')).user.UserType=="Faculty"?"":currentStudent.Password} ></Input>
          </div>
        
        </div>
        <Button id = 'button-save' onClick = {handleScheduleClick}>View Schedule</Button>
      <div className="advisor">
          <h5>Advisor</h5>
{advisor.FirstName+", " +  advisor.LastName}
     </div>
    
          
      </div>
          
     
    )
  }
    
}

export default StudentInfo