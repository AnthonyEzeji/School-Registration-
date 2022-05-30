import { Button, Input } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import DrawerMenu from './DrawerMenu';
import DrawerMenu3 from './DrawerMenu3';


function GiveAttendance() {
var navigate = useNavigate()
  const [attendance, setAttendance] = useState({
      Present : "",
      Absent:''
  });
  useEffect(() => {
    console.log(attendance)
   }, [attendance])
   
  useEffect(async() => {
    await axios.get(`https://54.196.9.169:5001/api/attendance/${JSON.parse(window.sessionStorage.getItem('curr-class'))}/${JSON.parse(window.sessionStorage.getItem('current-student')).UserID}`).then(res=>{
      setAttendance({Present:res.data.Present, Absent:res.data.Absent})
      console.log(attendance)
    })
  }, [])
  console.log(attendance)
  useEffect(async () => {
  
    console.log(attendance)
  }, [attendance]);

  async function onClick(){
await axios.post('https://54.196.9.169:5001/api/attendance',{Student_ID:JSON.parse(window.sessionStorage.getItem('current-student')).UserID, CRN:JSON.parse(window.sessionStorage.getItem('curr-class')), Attendance : attendance} ).then(res=>{
  console.log(res.data)
})
navigate("/faculty-class/faculty-schedule")
  }
 
  return (
    <div className='update-grade'>
{JSON.parse(window.sessionStorage.getItem('session')).user.UserType=="Admin"?<DrawerMenu/>:<DrawerMenu3/>}
<div className="grade-top">
  Change {JSON.parse(window.sessionStorage.getItem('current-student')).FirstName + " " + JSON.parse(window.sessionStorage.getItem('current-student')).LastName+"'s Grade in "+JSON.parse(window.sessionStorage.getItem('curr-class')) }
</div>


      <Input value={attendance.Present.toString()} onChange={(e)=>setAttendance({Present:e.target.value, Absent:attendance.Absent})}/>
      <Input value={attendance.Absent.toString()} onChange={(e)=>setAttendance({Present:attendance.Present, Absent:e.target.value})}>
      </Input>
<Button onClick = {onClick}>Save Attendance</Button>

    </div>
  )
}

export default GiveAttendance