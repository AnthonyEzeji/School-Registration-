import axios from 'axios'
import '../css/FacultySchedule.css'
import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import Search from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'

function FacultySchedule() {
  var navigate = useNavigate()
  function handleClick(e){
    window.sessionStorage.setItem('curr-class',e.target.value)
navigate(`/faculty-class/faculty-schedule`)
  }
  const [classes, setClasses] = useState([])
    useEffect( async () => {
  await axios.get(`https://54.196.9.169:5001/api/faculty-class/${JSON.parse(window.sessionStorage.getItem('current-faculty')).UserID}`).then(res=>{
    console.log(res.data)
    setClasses(res.data)
  })
    }, [])
    
  return (
    <div className='faculty-schedule'>
      <div className="faculty-schedule-container"> 

{classes.map((obj, index)=> (
<div className = 'faculty-schedule-class' key= {index}>
<p>CRN</p>
<Button value={obj.CRN} onClick = {(e)=>handleClick(e)}>{obj.CRN}<Search></Search></Button>

<h5>{obj.CourseName}</h5>
<p>Day</p>
<p>Section</p>
  <h5>{obj.Section}</h5>
  <p>Day</p>
  <h5>{obj.Day}</h5>
  <p>Building</p>
  <h5>{obj.Building}</h5>
  <p>Start Time</p>
  
  <h5>{obj.StartTime}</h5>
  <p>End Time</p>
  <h5>{obj.EndTime}</h5>

</div>
))}

    </div>
    </div>
  )
}

export default FacultySchedule