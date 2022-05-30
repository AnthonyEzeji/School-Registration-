import { Button, Input } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import DrawerMenu from './DrawerMenu';
import DrawerMenu3 from './DrawerMenu3';


function GiveGrade() {
var navigate = useNavigate()
  const [grade, setGrade] = useState('');
  useEffect(async() => {
    await axios.get(`https://54.196.9.169:5001/grades/${JSON.parse(window.sessionStorage.getItem('curr-class'))}/${JSON.parse(window.sessionStorage.getItem('current-student')).UserID}`).then(res=>{
      setGrade(res.data)
      console.log(res.data)
    })
  }, [])
  console.log(grade)
  useEffect(async () => {
  
    console.log(grade)
  }, [grade]);

  async function onClick(){
await axios.post('https://54.196.9.169:5001/api/grades',{Student_ID:JSON.parse(window.sessionStorage.getItem('current-student')).UserID, CRN:JSON.parse(window.sessionStorage.getItem('curr-class')), Grade:grade} ).then(res=>{
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


      <Input value={grade.toString()} onChange={(e)=>setGrade(e.target.value)}>
      </Input>
<Button onClick = {onClick}>Save Grade</Button>

    </div>
  )
}

export default GiveGrade