import { Button, Button2021, Input, MenuItem, Select } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import '../css/FacultyInfo.css'
import DrawerMenu from './DrawerMenu'
import SearchIcon from '@mui/icons-material/Search';
function FacultyInfo() {
    var currentFaculty = JSON.parse(window.sessionStorage.getItem('current-faculty'))
 console.log(currentFaculty)
 const [UserType, setUserType] = useState(currentFaculty.UserType)
 const [advisees, setAdvisees] = useState([])
 const [Password, setPassword] = useState(currentFaculty.Password)
 const [student, setStudent] = useState(' ')
 const [Email, setEmail] = useState(currentFaculty.Email)
 const [Students, setStudents] = useState([])
    const address = currentFaculty.Street +', '+ currentFaculty.City+', '+ currentFaculty.State + ', '+ currentFaculty.Country + " " + currentFaculty.Zip
    var navigate = useNavigate()
    function handleClick(){

        navigate(`/faculty-schedule`)
      
    }
    useEffect(async () => {
        var temp = []
      await axios.get('https://54.196.9.169:5001/api/users').then(res=>{
          console.log(res.data)
         for(var i = 0; i < res.data.length;i++){
             if(res.data[i].UserType =='Student'){

                 temp.push(res.data[i])
             }
         }
         
          
      })
      
          setStudents(temp.sort())
    }, [])
    console.log('temp', Students)
    function onChangeHandler(e){
    var lastName= e.target.value.split(',')[0]
    var firstName=e.target.value.split(',')[1]
    console.log(lastName,firstName)
    setStudent({firstName:firstName.toString(), lastName:lastName.toString()})
    }
   async function onClick(e){
   
  
  
await axios.patch(`https://54.196.9.169:5001/api/users/${currentFaculty.UserID}`, {Password,Email,UserType}).then(res=>{
    console.log(res.data)
})
    }
  
    function onEmailChange(e){
        setEmail(e.target.value)
    }
    function onUserTypeChange(e){
        setUserType(e.target.value)
    }
    function onPasswordChange(e){
        setPassword(e.target.value)
    }
    const [selectionModel, setSelectionModel] = useState([]);
    async function handleDeleteClick(e, cellValues){
        console.log(cellValues)
        await axios.delete('https://54.196.9.169:5001/api/advisor', {data:{FirstName:cellValues.row.FirstName, LastName: cellValues.row.LastName}})
    }
    useEffect(async () => {
       await axios.get(`https://54.196.9.169:5001/api/advisor/advisees/${JSON.parse(window.sessionStorage.getItem('current-faculty')).UserID}`).then(res=>{
           setAdvisees(res.data)
       })
          }, [])
       
          var rows = advisees
          var columns =  [
            { field: 'FirstName', headerName: 'First Name', width: 200 },
            { field: 'LastName', headerName: 'Last Name', width: 200 },
            {
                field: "",
                renderCell: (cellValues) => {
                  return (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(event) => {
                        handleDeleteClick(event, cellValues);
                      }}
                    >
                     Delete
                    </Button>
                  );
                }
              }
          
          ];
         async function handleAddClick (){
await axios.post(`https://54.196.9.169:5001/api/advisor/${JSON.parse(window.sessionStorage.getItem('current-faculty')).UserID}`, {student, Faculty_ID:JSON.parse(window.sessionStorage.getItem('current-faculty')).UserID})
          }
    return (
    <div className = ' faculty-info'>
        <DrawerMenu/>

    <div className = "faculty-container">
        <h5>
            First Name
        </h5>
        <p>{currentFaculty.FirstName}</p>
        <h5>
            Last Name
        </h5>
        <p>{currentFaculty.LastName}</p>
        <h5>
            ID
        </h5>
        <p>{currentFaculty.UserID}</p>
        <h5>
            Address
        </h5>
        <p>{address}</p>
        <h5>
            User Type
        </h5>
        <Input onChange = {(e)=>onUserTypeChange(e)} defaultValue={currentFaculty.UserType}></Input>
        <h5>
           Email
        </h5>
        <Input onChange = {(e)=>onEmailChange(e)} defaultValue={currentFaculty.Email}></Input>
        <h5>
            Password
        </h5>
        <Input onChange = {(e)=>onPasswordChange(e)} defaultValue={currentFaculty.Password}></Input>

    </div>
    <Button onClick= {onClick}>Save Changes</Button>
        <Button id = 'schedule-btn' onClick={handleClick}>Schedule</Button>
        <div className='advisees'>
            <h5>Advisees</h5>
        <div className = "shadow" style={{marginTop:50, height: "50vh", width: '60vw' }}>
      <DataGrid
      
        rows={rows}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row._id}
        checkboxSelection = {false}
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
          
        }}
        selectionModel={selectionModel}
        
        
      />
      
      
    </div>
    <div className="add">
        <Select  labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={student.firstName}
      label="CourseName"
      onChange={(e)=>onChangeHandler(e)}>

            {Students.map((obj,index)=>{
                return(
                  <MenuItem key ={index} value={obj.LastName + "," + obj.FirstName}>{obj.LastName + ", " + obj.FirstName}</MenuItem>
                )
            })}
        </Select>
        <Button onClick={handleAddClick}>
            Assign Advisee
        </Button>
    </div>
        </div>
    </div>
  )
}

export default FacultyInfo