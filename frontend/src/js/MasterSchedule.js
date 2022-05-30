import React from 'react'
import '../css/MasterSchedule.css'
import Navbar from './Navbar'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';
import DrawerMenu from './DrawerMenu'
import DrawerMenu2 from './DrawerMenu2'
import { Button, Input, MenuItem, Select } from '@mui/material'
import DrawerMenu3 from './DrawerMenu3'
function MasterSchedule() {
  const [CRN, setCRN] = useState(Number)
  const [CourseID, setCourseID] = useState(Number)
  const [CourseName, setCourseName] = useState(String)
  const [DepartmentName, setDepartmentName] = useState(String)
  const [Section, setSection] = useState(Number)
  const [Day, setDay] = useState(String)
  const [StartTime, setStartTime] = useState(String)
  const [EndTime, setEndTime] = useState(String)
  const [Semester, setSemester] = useState(String)
  const [Year, setYear] = useState(String)
  const [Building, setBuilding] = useState(String)
  const [RoomNumber, setRoomNumber] = useState(String)
  const [ProfessorFirstName, setProfessorFirstName] = useState(String)
  const [ProfessorLastName, setProfessorLastName] = useState(String)
  const [AvailableSeats, setAvailableSeats] = useState(Number)
  const [TotalSeats, setTotalSeats] = useState(Number)
  const [selectionModel, setSelectionModel] = useState([]);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    console.log(selectionModel)
   }, [selectionModel])
   useEffect(() => {
    console.log(CourseName)
   }, [CourseName])
  const columns = [
    { field: 'CRN', headerName: 'CRN', width: 70 },
   
    { field: 'CourseID', headerName: 'CourseID', width: 100 },
   
    {
      field: 'CourseName',
      headerName: 'Course Name',
      
      width: 250,
    },
    { field: 'Section', headerName: 'Section', width: 80 },
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

  const [schedule, setSchedule] = useState([]);
  
  function handleDeleteClick(e){
    axios.delete("https://54.196.9.169:5001/api/masterschedule",{data:{selectionModel}}).then(res=>{
      alert("The class associated with CRN: "+JSON.stringify(res.data.CRN)+ " has been deleted");
   })
  }
  useEffect(() => {
      axios.get("https://54.196.9.169:5001/api/masterschedule").then(res=>{
         setSchedule(res.data)
      })
      
      return () => {
         
      };
  }, []);
  useEffect(() => {
    axios.get("https://54.196.9.169:5001/api/courses").then(res=>{
       setCourses(res.data)
    })
    
    return () => {
       
    };
}, []);
  console.log(schedule)
  var rows = schedule;

  async function handleSaveClick(e){
    
    var obj = {
      CRN,CourseID,CourseName:CourseName, Section, Day, RoomNumber, Building, ProfessorFirstName, ProfessorLastName, EndTime, StartTime,TotalSeats, AvailableSeats,Semester

    }
    await axios.post('https://54.196.9.169:5001/api/masterschedule', obj).then(res=>{
      if(res.data.hasOwnProperty('message')){
        alert(res.data.message)
      }else{
        alert(res.data)
      }
    })
  }
  if(JSON.parse(window.sessionStorage.hasOwnProperty('session'))){
    if(  JSON.parse(window.sessionStorage.getItem('session')).userType =="Admin"){
      return (
        <div className = 'masterschedule'>
          
          <DrawerMenu/>
          <h1>Master Schedule</h1>
            <div div style={{marginTop:10, height: 800, width: '90vw' }} className = 'shadow'>
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
    
        <Button id="btn-delete" onClick = {handleDeleteClick}>Delete</Button>
    
    
        <div className="add-masterschedule">
          <div className="add-top">
          <div className="add-field">
          <div className="add-field">
          <h5>Year</h5>
          <Input onChange={(e)=>{setYear(e.target.value)}} id= "input-field"> </Input>
          </div>
            <h5>CRN</h5>
          <Input onChange={(e)=>{setCRN(e.target.value)}} id= "input-field">CRN</Input>
          </div>
          <div className="add-field">
          <h5>Course ID</h5>
          <Input onChange={(e)=>{setCourseID(e.target.value)}}  id= "input-field">Course Name</Input>
          </div>
          <div className="add-field">
          <h5>Section</h5>
          <Input  onChange={(e)=>{setSection(e.target.value)}}  id= "input-field">Department</Input>
          </div>
          <div className="add-field">
          <h5>Day</h5>
          <Input  onChange={(e)=>{setDay(e.target.value)}} id= "input-field"></Input>
          </div>
          <div className="add-field">
          <h5>Start Time</h5>
          <Input  onChange={(e)=>{setStartTime(e.target.value)}} id= "input-field"></Input>
          </div>
          <div className="add-field">
          <h5>Professor Last Name</h5>
          <Input  onChange={(e)=>{setProfessorLastName(e.target.value)}}  id= "input-field"></Input>
          </div>
          <div className="add-field">
          <h5>Available Seats</h5>
          <Input  onChange={(e)=>{setAvailableSeats(e.target.value)}}  id= "input-field"></Input>
          </div>
     
         
    
          </div>
          <div className="add-bottom">
          <div className="add-field">
          <h5>End Time </h5>
          <Input onChange={(e)=>{setEndTime(e.target.value)}} id= "input-field"> </Input>
          </div>
          <div className="add-field">
          <h5>Course Name</h5>
          <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={CourseName}
      label="CourseName"
      onChange={(e)=>setCourseName(e.target.value)}
    >
      {courses.map((course,index) =>(
        <MenuItem key ={index} value={course.Course_Name}>{course.Course_Name}</MenuItem>
      ))}
  
      
    </Select>
  
          </div>
        
          <div className="add-field">
          <h5>Semester</h5>
          <Input onChange={(e)=>{setSemester(e.target.value)}} id= "input-field"></Input>
          </div>
         
          <div className="add-field">
          <h5>Building</h5>
          <Input onChange={(e)=>{setBuilding(e.target.value)}}  id= "input-field"></Input>
          </div>
          <div className="add-field">
          <h5>Room Number</h5>
          <Input onChange={(e)=>{setRoomNumber(e.target.value)}} id= "input-field"></Input>
          </div>
          <div className="add-field">
          <h5>Professor First Name</h5>
          <Input onChange={(e)=>{setProfessorFirstName(e.target.value)}} id= "input-field"></Input>
          </div>
          <div className="add-field">
          <h5>Total Seats</h5>
          <Input onChange={(e)=>{setTotalSeats(e.target.value)}} id= "input-field"></Input>
          </div>
          </div>
          
          <Button onClick={(e)=>handleSaveClick(e)}>Save</Button>
    
        </div>
        
           
        </div>
      )
    }else if(JSON.parse(window.sessionStorage.getItem('session')).userType =="Student"){
      return (
        <div className = 'masterschedule2'>
          
          {JSON.parse(window.sessionStorage.getItem('session')).user.UserType == "Admin"?<DrawerMenu/>:<DrawerMenu2/>}
          <h1>Master Schedule</h1>
            <div div style={{marginTop:10, height: 800, width: '90vw' }} className = 'shadow'>
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
    
       
           
        </div>
      )
    }else{
      return (
        <div className = 'masterschedule3'>
          
          <DrawerMenu3/>
          <h1>Master Schedule</h1>
            <div div style={{marginTop:10, height: 800, width: '90vw' }} className = 'shadow'>
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
    
       
           
        </div>
      )
    }
  }else{
    return (
      <div className = 'masterschedule4'>
          
      <DrawerMenu3/>
      <h1>Master Schedule</h1>
        <div div style={{marginTop:10, height: 800, width: '90vw' }} className = 'shadow'>
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

   
       
    </div>
    )
  }
  

}

export default MasterSchedule