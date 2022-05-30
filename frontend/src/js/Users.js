import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../css/Users.css'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link, NavLink } from 'react-router-dom';
import Profile from './Profile';
import DrawerMenu from './DrawerMenu';
import Navbar from './Navbar';


function Users() {
 
  const [users, setUsers] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [UserType, setUserType] = React.useState('');
  const [newUser, setNewUser] = React.useState({UserType :"",
FirstName:'',
LastName:''});
 function onClick(e){
console.log(UserType)

 }
 useEffect(() => {
  console.log(newUser)
 }, [newUser])


 useEffect(() => {
  setNewUser({...newUser, UserType:UserType})
 }, [UserType])


  const handleUserTypeChange = (event) => {

    console.log(event.target.value)
    setUserType(event.target.value)
    
  };
  
  useEffect(() => {
    console.log(selectionModel)
   }, [selectionModel])
   
    
function handleFirstNameChange(e){

  setNewUser({...newUser,FirstName:e.target.value})
}
function handleDeleteUserClick(e){

  axios.delete('https://54.196.9.169:5001/api/users',  {data:{selectionModel}}).then(doc=>{
console.log(doc)
  })
}
function handleLastNameChange(e){

  setNewUser({...newUser,LastName:e.target.value})
}
  const handleClick = (event, cellValues) => {
    setNewUser({...newUser,UserType:UserType})
    console.log(newUser);
    axios.post('https://54.196.9.169:5001/api/users',{newUser}).then(res=>
      console.log(res)
    )
    
  };
  

  
  const columns = [
   
    { field: 'FirstName', headerName: 'First Name', width: 150 },
    { field: 'LastName', headerName: 'Last Name', width: 150 },
    { field: 'Email', headerName: 'Email', width: 200 },
    {field: 'UserID', headerName: 'UserID', width:200},
    {field: 'UserType', headerName: 'UserType', width:200}

  ];

  var rows = users;

  
   
    useEffect(async () => {
        
    await axios.get('https://54.196.9.169:5001/api/users').then(res=>{
      var tempArr = [res.data.length]
      for (var i = res.data.length-1; i>=0 ; i-- ){
        tempArr[(res.data.length-1)-i]=res.data[i]

      }
      setUsers(tempArr)
console.log(users)
    })
       
    }, []);
    
  return (
    <div className= ' users'>
      
      <DrawerMenu/>
      <h1>Users</h1>
<div className = "shadow" style={{marginTop:50, height: "50vh", width: '50vw' }}>
  <DataGrid
  
    rows={rows}
    columns={columns}
    pageSize={100}
    rowsPerPageOptions={[5]}
    getRowId={(row) => row._id}
    checkboxSelection = {false}
    onSelectionModelChange={(newSelectionModel) => {
      setSelectionModel(newSelectionModel);
      console.log(selectionModel)
    }}
    selectionModel={selectionModel}
    
    
  />
  
  
</div>
<Button id= "delete-btn" onClick={handleDeleteUserClick}><h3>DELETE</h3></Button>
<div className='user-create'>
  
<input defaultValue="Enter First Name" onChange={handleFirstNameChange} type="text" placeholder='First name'/>
<input  defaultValue="Enter Last Name" onChange={handleLastNameChange} type="text" placeholder='Last name'/>
<Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">User Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={UserType}
          label="user Type"
          onChange={handleUserTypeChange} 
          required = {true}
        >
          <MenuItem value={"Student"}>Student
</MenuItem>
          <MenuItem value={"Admin"}>Admin
</MenuItem>
          <MenuItem value={"Faculty"}>Faculty
</MenuItem>
<MenuItem value={"Researcher"}>Researcher

</MenuItem>


        </Select>
      </FormControl>
    </Box>

  <Button onClick = {handleClick}>Submit </Button>
</div>

    </div>
  )
}

export default Users