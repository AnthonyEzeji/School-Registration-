import { Button, Input } from '@mui/material';
import axios from 'axios';

import React, { useEffect, useState } from 'react'
import '../css/EditClass.css'

function EditClass() {
 
    const [availableSeats, setAvailableSeats] = useState(Number)
    const [day, setDay] = useState('')
    const [totalSeats, setTotalSeats] = useState(Number)
    const [semester, setSemester] = useState(String)
    const [section, setSection] = useState(Number)
    const [roomNumber, setRoomNumber] = useState(Number)
    const [endTime, setEndTime] = useState(Number)
    const [building, setBuilding] = useState(Number)
    const [startTime, setStartTime] = useState(Number)
    const [currClass, setCurrClass] = useState({})
    
    useEffect(async () => {
      
      await axios.get(`https://54.196.9.169:5001/api/masterschedule/${window.sessionStorage.getItem('current-faculty')}`).then(res=>{
          
          setCurrClass(res.data)
          console.log(currClass)

      })
      window.sessionStorage.setItem('curr-class',JSON.stringify(currClass))
    }, []);
    var obj = currClass
    console.log(obj.AvailableSeats)
    function handleSaveClick(e){
        console.log( availableSeats, building, day, section , startTime , endTime , roomNumber, totalSeats, semester)
    }
    function handleAvailableSeatsChange(e){
        
        setAvailableSeats(e.target.value)
        console.log(availableSeats)
    }
    function handleDayChange(e){
        
        setDay(e.target.value)
        console.log(day)
    }
    function handleStartTimeChange(e){
        
        setStartTime(e.target.value)
        console.log(startTime)
    }
    function handleEndTimeChange(e){
        
        setEndTime(e.target.value)
        console.log(endTime)
    }
    function handleRoomNumberChange(e){
        
        setRoomNumber(e.target.value)
        console.log(roomNumber)
    }
    function handleTotalSeatsChange(e){
        
        setTotalSeats(e.target.value)
        console.log(totalSeats)
    }
    function handleSemesterChange(e){
        
        setSemester(e.target.value)
        console.log(semester)
    }
    function handleSectionChange(e){
        
        setSection(e.target.value)
        console.log(section)
    }
    function handleBuildingChange(e){
        
        setBuilding(e.target.value)
        console.log(section)
    }
  return (
    <div className='edit-class'>
        <h1>Update Class: {obj.CRN}</h1>
        <div className='edit-container'>
        <div className="edit-field">
                <h3>
Course Name
                </h3>
            
                <p>{obj.CourseName} </p>
                <Input id= "edit-input" readOnly={true} defaultValue={obj.CourseName}  onChange= {(e)=>handleAvailableSeatsChange(e)}></Input>
             
            </div>
            
            <div className="edit-field">
                <h3>
Available Seats
                </h3>
               <p>{obj.AvailableSeats} </p>
                <Input id= "edit-input"  defaultValue={obj.AvailableSeats}  onChange= {(e)=>handleAvailableSeatsChange(e)}></Input>
            </div>
            <div className="edit-field">
                <h3>
Building
                </h3>
                <p>{obj.Building} </p>
                <Input id= "edit-input" defaultValue={obj.Building} onChange= {(e)=>handleBuildingChange(e)}></Input>
            </div>
            <div className="edit-field">
                <h3>
Day
                </h3>
                <p>{obj.Day} </p>
                <Input id= "edit-input" defaultValue={obj.Day} onChange= {(e)=>handleDayChange(e)}></Input>
            </div>
            <div className="edit-field">
                <h3>
Section
                </h3>
                <p>{obj.Section} </p>
                <Input id= "edit-input" defaultValue={obj.Section} onChange= {(e)=>handleSectionChange(e)}></Input>
            </div>
            <div className="edit-field">
                <h3>
Start Time:
                </h3>
                <p>{obj.StartTime} </p>
                <Input id= "edit-input" defaultValue={obj.StartTime} onChange= {(e)=>handleStartTimeChange(e)}></Input>
            </div>
            <div className="edit-field">
                <h3>
End Time
                </h3>
                <p>{obj.EndTime}</p>
                <Input id= "edit-input" defaultValue={obj.EndTime} onChange= {(e)=>handleEndTimeChange(e)}></Input>
            </div>
            <div className="edit-field">
                <h3>
Room Number
                </h3>
                <p>{obj.RoomNumber}</p>
                <Input id= "edit-input" defaultValue={obj.RoomNumber} onChange= {(e)=>handleRoomNumberChange(e)}></Input>
            </div>
            <div className="edit-field">
                <h3>
Total Seats
                </h3>
                <p>{obj.TotalSeats}</p>
                <Input id= "edit-input" defaultValue={obj.TotalSeats} onChange= {(e)=>handleTotalSeatsChange(e)}></Input>
            </div>
            <div className="edit-field">
                <h3>
Semester
                </h3>
                <p>{obj.Semester}</p>
                <Input id= "edit-input" defaultValue={obj.Semester} onChange= {(e)=>handleSemesterChange(e)}></Input>
            </div>

        </div>
        <Button onClick={handleSaveClick}>Click</Button>
    </div>
  )
}

export default EditClass