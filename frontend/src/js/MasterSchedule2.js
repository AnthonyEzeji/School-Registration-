import React from 'react'
import '../css/MasterSchedule.css'
import Navbar from './Navbar'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';
import DrawerMenu2 from './DrawerMenu2'
import { Button, Input } from '@mui/material'

function MasterSchedule2() {
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

  useEffect(() => {
    console.log(selectionModel)
   }, [selectionModel])
  const columns = [
    { field: 'CRN', headerName: 'CRN', width: 70 },
   
    { field: 'CourseID', headerName: 'CourseID', width: 100 },
   
    {
      field: 'CourseName',
      headerName: 'Course Name',
      
      width: 250,
    },
    { field: 'Section', headerName: 'Section', width: 5001 },
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
  console.log(schedule)
  var rows = schedule;

  async function handleSaveClick(e){
    
    var obj = {
      CRN,CourseID,CourseName, Section, Day, RoomNumber,DepartmentName, Building, ProfessorFirstName, ProfessorLastName, EndTime, StartTime,TotalSeats, AvailableSeats,Semester

    }
    await axios.post('https://54.196.9.169:5001/api/masterschedule', obj)
  }
  return (
    <div className = {JSON.parse(window.sessionStorage.getItem('session')).user.UserType == "Admin"?"masterschedule":'masterschedule2'}>
      
      <DrawerMenu2/>
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

export default MasterSchedule2