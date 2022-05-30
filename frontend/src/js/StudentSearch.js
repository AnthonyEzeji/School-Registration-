import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../css/Users.css'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import DrawerMenu from './DrawerMenu';
import DrawerMenu3 from './DrawerMenu3';
import '../css/StudentSearch.css'

function StudentSearch() {
    const [selectionModel, setSelectionModel] = useState([]);
  
   
    const columns = [
        { field: 'FirstName', headerName: 'First Name', width: 150 },
        { field: 'LastName', headerName: 'Last Name', width: 150 },
        { field: 'Email', headerName: 'Email', width: 200 },
        {field: 'UserID', headerName: 'UserID', width:200},
        {field: 'UserType', headerName: 'UserType', width:200},
        {
            field: "Edit",
            renderCell: (cellValues) => {
              return (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(event) => {
                    handleClick(event, cellValues);
                  }}
                >
                  <SearchIcon/>
                </Button>
              );
            }
          }
      ];

      const [users, setUsers] = useState([]);

      
      useEffect(async () => {
        
        await axios.get('https://54.196.9.169:5001/api/users').then(res=>{
          var tempArr = [res.data.length]
          for (var i = res.data.length-1; i>=0 ; i-- ){
            tempArr[(res.data.length-1)-i]=res.data[i]
    
          }
          setUsers(tempArr)
    console.log(users)
        })
           console.log(users)
        }, []);
        var rows = users;
        const navigate = useNavigate()
       async function handleClick (e,cellValues){
            await axios.get(`https://54.196.9.169:5001/api/users/${cellValues.id}`).then(res=>{
               
                window.sessionStorage.setItem('current-student', JSON.stringify(res.data))
                
                
            })
            await axios.get(`https://54.196.9.169:5001/api/studentmajors/${JSON.parse(window.sessionStorage.getItem('current-student')).UserID}`).then(res=>{
                window.sessionStorage.setItem('major', JSON.stringify({major:res.data.majorName}))
                navigate(`/student-info/${JSON.parse(window.sessionStorage.getItem('current-student')).UserID.toString()}`)
        })
            
           }

    if(JSON.parse(window.sessionStorage.getItem('session')).userType =="Admin"){
      return (
        <div className = 'student-search'>
            <DrawerMenu/>
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
        </div>
      )
    }else if(JSON.parse(window.sessionStorage.getItem('session')).userType =="Faculty"){
      return (
        <div className = 'student-search2'>
            <DrawerMenu3/>
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
        </div>
      )
    }
    else{
      navigate('/login')
    }
  
}

export default StudentSearch