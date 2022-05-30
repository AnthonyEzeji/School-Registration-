import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import DrawerMenu from './DrawerMenu';

function AllAdvisors() {

    const [advisors, setAdvisors] = useState([])
    const [selectionModel, setSelectionModel] = useState([]);
    useEffect(async () => {
     await axios.get('https://54.196.9.169:5001/api/advisor').then(res=>{
         
         setAdvisors(res.data)
     })
    }, []);
   
    console.log(advisors)
    var rows = advisors
    const columns =  [
        { field: 'LastName', headerName: 'Last Name', width: 150 },
        { field: 'FirstName', headerName: 'First Name', width: 150 }
      ];


  return (
    <div className = 'student-search'>
    <DrawerMenu/>
   <div className = "shadow" style={{marginTop:50, height: "50vh", width: '40vw' }}>
<DataGrid

rows={rows}
columns={columns}
pageSize={100}
rowsPerPageOptions={[5]}
getRowId={(row) => row.id}
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

export default AllAdvisors