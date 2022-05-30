import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../css/StudentSchedule.css'
import DrawerMenu2 from './DrawerMenu2';
function StudentSchedule() {
    const [schedule, setSchedule] = useState([]);
    useEffect(async () => {
     await axios.get(`https://54.196.9.169:5001/api/scheduleclass/${JSON.parse(window.sessionStorage.getItem("current-student")).UserID}`).then(res=>{
         setSchedule(res.data)
     })
    }, [])
    
  return (
    <div className='schedule'>
        <DrawerMenu2/>
        {schedule.map((obj,index)=>(
        <div key ={index} className="schedule-class">
           <p><h5>CRN</h5>{obj.CRN}</p>
        <p><h5>Course Name</h5>{obj.CourseName}</p>
       
        <p><h5>Room Number</h5>{obj.RoomNumber}</p>
        <p><h5>Professor</h5>{obj.ProfessorLastName}, {obj.ProfessorFirstName}</p>
        
        <p><h5>Start Time</h5>{obj.StartTime}</p>
        <p><h5>End Time</h5>{obj.EndTime}</p>
        <p><h5>Day</h5>{obj.Day}</p>
        <p><h5>Semester</h5>{obj.Semester}</p>
        <p><h5>Year</h5>{obj.Year}</p>


        </div>
    ))}</div>
  )
}

export default StudentSchedule