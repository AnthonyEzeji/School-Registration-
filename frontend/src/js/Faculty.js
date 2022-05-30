import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';

import DrawerMenu from './DrawerMenu'
import { useNavigate } from 'react-router-dom';

function Faculty() {
    const [users, setUsers] = useState([]);
    const [selectionModel, setSelectionModel] = useState([]);
    var navigate = useNavigate()
    async function handleClick (e,cellValues){
        await axios.get(`https://54.196.9.169:5001/api/users/${cellValues.id}`).then(res=>{
           
            window.sessionStorage.setItem('current-faculty', JSON.stringify(res.data))
            console.log(JSON.parse(window.sessionStorage.getItem('current-faculty')))
          
            
        })
        navigate(`/faculty-info/${JSON.parse(window.sessionStorage.getItem('current-faculty')).UserID}`)
    }
    const columns = [
   
        { field: 'FirstName', headerName: 'First Name', width: 150 },
        { field: 'LastName', headerName: 'Last Name', width: 150 },
        { field: 'Email', headerName: 'Email', width: 200 },
        {field: 'UserID', headerName: 'UserID', width:200},
        {field: 'UserType', headerName: 'UserType', width:200},
        {
            field: "See More",
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
            },
            width:200
          }
    
      ];
    
      var rows = users;
      useEffect(async () => {
        
        await axios.get('https://54.196.9.169:5001/api/users').then(res=>{
          var tempArr = [res.data.length]
          var tempArr2 = []
          for (var i = res.data.length-1; i>=0 ; i-- ){
              
                tempArr[(res.data.length-1)-i]=res.data[i]
              
      
    
          }
          for(var i = 0; i < tempArr.length;i++){
              if(tempArr[i].UserType == "Faculty"){
                  tempArr2.push(tempArr[i])
              }
          }
          setUsers(tempArr2)
          console.log(tempArr)
    console.log(users)
        })
           
        }, []);
  return (
    <div>
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
      console.log(selectionModel)
    }}
    selectionModel={selectionModel}
    
    
  />
  
  
</div>
    </div>
  )
}

export default Faculty