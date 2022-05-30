import { Button, Input, MenuItem, Select } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../css/Courses.css'
import DrawerMenu from './DrawerMenu';

function Courses() {
   const [department, setDepartment] = useState('')
   const [major, setMajor] = useState('')
   const [credit, setCredit] = useState(Number)
   const [courseID, setCourseID] = useState('')
   const [courseName, setCourseName] = useState('')

    const columns = [
   
        { field: 'Course_ID', headerName: 'Course_ID', width: 70 },
        { field: 'Course_Name', headerName: 'Course_Name', width: 300 },
        { field: 'Major', headerName: 'Major', width: 130 },
        { field: 'Department_Name', headerName: 'Department_Name', width: 130 },
        { field: 'Dept_ID', headerName: 'Dept_ID', width: 130 },
        { field: 'Course_Credit', headerName: 'Course_Credit', width: 130 },
      ];
      const [selectionModel, setSelectionModel] = useState([]);
    const [courses, setCourses] = useState([{Course_ID:"",Course_Name:"",Major:"",_id:""}])
   useEffect(() => {
    axios.get("https://54.196.9.169:5001/api/courses").then(res=>{
        setCourses(res.data.map((doc)=>doc))
    })
   }, [])
   
 
    useEffect(() => {
    console.log(courseName)
    }, [courseName])
    
    var rows = courses
    console.log(rows)
    const handleDepartmentChange = (e) => {
      setDepartment(e.target.value);
    };
    const handleCourseNameChange = (e) => {
      setCourseName(e.target.value);
    };
    const handleCreditChange = (e) => {
      setCredit(e.target.value);
    };
    const handleCourseIDChange = (e) => {
      setCourseID(e.target.value);
    };
    const handleMajorChange = (e) => {
      setMajor(e.target.value);
    };
    async function onClick(){
      await axios.post('https://54.196.9.169:5001/api/courses',{courseName,courseID,credit,major,department}).then(res=>{
        console.log(res.data)
      })
    }
    async function onDeleteClick(){
      await axios.delete('https://54.196.9.169:5001/api/courses',{data:selectionModel}).then(res=>{
        console.log(res.data)
        alert(res.data + " has been deleted from the course catalog by admin:" + JSON.parse(window.sessionStorage.getItem('session')).user.FirstName + ", " + JSON.parse(window.sessionStorage.getItem('session')).user.LastName)
      })
    }
    if(window.sessionStorage.hasOwnProperty('session')){
      if(JSON.parse(window.sessionStorage.getItem('session')).user.UserType == "Admin"){
        return (
  <div className='courses'><h1>All Courses</h1>
      <DrawerMenu/>
  <div style={{ height: 400, width: '50%' }}>
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
      selectionModel={selectionModel}
      
      
    />
    <div className = 'add-course'>
      <Input defaultValue='Course Name' id = 'input' type="Course Name" onChange = {(e)=>handleCourseNameChange(e)}/>
      <Input defaultValue='Course ID' id = 'input' type="Course ID" onChange = {(e)=>handleCourseIDChange(e)}/>
      <Input defaultValue='Major' id = 'input' type="Major" onChange = {(e)=>handleMajorChange(e)}/>
      <Input defaultValue='Credit' id = 'input' type="Credit" onChange = {(e)=>handleCreditChange(e)}/>
    <p>Department</p>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={department}
      label="Department"
      onChange={(e)=>handleDepartmentChange(e)}
    >
      <MenuItem value={"Biological Sciences"}>Biological Sciences</MenuItem>
      <MenuItem value={"School of Business"}>School of Business</MenuItem>
      <MenuItem value={"Mathematics & Computer & Info Science"}>Mathematics & Computer & Info Science</MenuItem>
       <MenuItem value={"Chemistry and Physics"}>Chemistry and Physics</MenuItem>
       <MenuItem value={"School of General Studies"}>School of General Studies</MenuItem>
       <MenuItem value={"English"}>English</MenuItem>
       <MenuItem value={"Politics, Economics & Law"}>Politics, Economics & Law</MenuItem>
    </Select>
  
    </div>
    <Button id= "courses-btn" onClick={onClick}><h3>ADD COURSE</h3></Button>
    <Button id= "courses-btn1" onClick={onDeleteClick}><h3>DELETE COURSE</h3></Button>

  </div>
  
      </div>
        )
      }else{
        return (
          <div className='courses'><h1>All Courses</h1>
          
      <div style={{ height: 400, width: '50%' }}>
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
          selectionModel={selectionModel}
          
          
        />
        
      </div>
      
          </div>
          )
      }
    
    }else{
      return(
        <div className='courses'><h1>All Courses</h1>
          
        <div style={{ height: 400, width: '50%' }}>
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
            selectionModel={selectionModel}
            
            
          />
          
        </div>
        
            </div>
      )
    }
    
}

export default Courses