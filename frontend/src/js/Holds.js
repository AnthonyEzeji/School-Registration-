import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../css/Holds.css'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DrawerMenu from './DrawerMenu';
function Holds() {
    const [hold, setHold] = useState('')
    const [selectionModel, setSelectionModel] = useState([]);
    const navigate = useNavigate()
    
    function handleUpdateClick(e, cellValues){
      console.log(cellValues.row.Student_ID)
        navigate(`/users/${cellValues.row.Student_ID}`)
    }
    const columns = [
        { field: 'Student_ID', headerName: 'STUDENT_ID', width: 120 },
        { field: 'HOLD_ID', headerName: 'HOLD_ID', width: 5001 },
        { field: 'HOLD_TYPE', headerName: 'HOLD_TYPE', width: 600 },
   
          {
            field: "update",
            renderCell: (cellValues) => {
              return (
                <Button
                  variant="contained"
                  color="info"
                  onClick={(event) => {
                    handleUpdateClick(event, cellValues);
                  }}
                >
                  Update
                </Button>
              );
            }
          }
      
      ];
    const [holds, setHolds] = useState([]);
    useEffect(() => {
   axios.get('https://54.196.9.169:5001/api/holds').then(res=>{
       
       setHolds(res.data)
       
   })
    }, [])
    
    function handleHoldChange(e){
        setHold(e.target.value)
    }
    function handleClick(e){
        return
    }
  return (
    <div className='holds'>
      <DrawerMenu/>
      <h1>Holds</h1>
        <div style={{marginTop:50, height: "50vh", width: '90vw' }}>
         <DataGrid
  
  rows={holds}
  columns={columns}
  pageSize={100}
  rowsPerPageOptions={[5]}
  getRowId={(row) => row._id}
  checkboxSelection = {false}

    

  
  
/>
        
        </div>
        <div className="create-hold">
        


  
</div>
        
    </div>
  )
}

export default Holds