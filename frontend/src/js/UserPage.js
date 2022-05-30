import React, { useEffect, useState } from 'react'
import '../css/UserPage.css'
import {Navigate, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { Box } from '@mui/system'
import DrawerMenu from './DrawerMenu'
function UserPage() {
    const navigate = useNavigate()
    const {UserID} = useParams()
    const [user, setUser] = useState({});
    const [holdSelected, setHoldSelected] = useState('')
    const [userHolds, setUserHolds] = useState([])
    const [email, setEmail] = useState("")

        useEffect(() => {
     axios.get(`https://54.196.9.169:5001/api/users/userpage/${UserID}`).then(res=>{
         setUser(res.data)
         console.log(res.data)
         
     })
     
     
    }, [UserID])
    useEffect(() => {
        axios.get(`https://54.196.9.169:5001/api/holds/${UserID}`).then(res=>{
            console.log(res.data)
            setUserHolds(res.data)
        })
    }, [])
    
    function handleHoldChange(e){
        setHoldSelected(e.target.value)
    }
    function handleRemoveClick(event){
        const data = {UserID,HOLD_ID:userHolds[0].HOLD_ID}
        axios.delete('https://54.196.9.169:5001/api/holds',{data}).then(res=>{
            console.log(res.data)
        })
       
      
 
    }
    const win = window.sessionStorage;
    const address = user.Street + ", " + user.City+", " + user.State
    function handleAddHoldClick(event){
      axios.post('https://54.196.9.169:5001/api/holds', {UserID,holdSelected})
    }
   
  return (
   
    <div className='user-page'>
       <DrawerMenu/>
     <div className="container">
     
         <div className="container-top">
             <div className="row"><p><h4>ID#</h4>  {user.UserID}</p>
            <p><h4>Name</h4>{user.LastName+", " +user.FirstName}</p></div>
            <div className="row"><p><h4>Email</h4>{user.Email}</p><p><h4>Date of Birth</h4>{user.DOB}</p></div>
          
            <div className="row" id='lastrow'><p><h4>Address</h4>{address}</p></div>
            
         </div>
         <div className="holdList">
             <h2>Holds</h2>
            
             {userHolds.map((hold,index)=>{
                 return(
                 <div className='hold-item'>
                   
                   <div className="hold-item-field">
                   <h5>Hold Type</h5>
                      <p>{hold.HOLD_TYPE}</p>
                   </div>
                   <div className="hold-item-field">
                     <h5>Hold ID</h5>
                      <p>{hold.HOLD_ID}</p>
                   </div>
                     
                     <Button onClick={handleRemoveClick}>Remove Hold</Button>
                 </div>
               

                 )

             })}
             
            
         </div>
         <div className="container-bottom">
             <h3>Add Hold</h3>
         <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Hold Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={holdSelected}
          label="Major"
          onChange={handleHoldChange} 
          required = {true}
        >
          <MenuItem value={"Academic Probation."}>Academic Probation
</MenuItem>
          <MenuItem value={"Non-payment of parking obligations and fines."}>Non-payment of parking obligations and fines
</MenuItem>
          <MenuItem value={"Financial Aid Application incomplete."}>Financial Aid Application incomplete
</MenuItem>
<MenuItem value={"Non-payment of tuition and fees."}>Non-payment of tuition and fees.</MenuItem>
<MenuItem value={"Registration Hold."}>Registration Hold.</MenuItem>
<MenuItem value={"Not satisfying the measles, mumps, rubella immunization requirement."}>Not satisfying the measles, mumps, rubella immunization requirement

</MenuItem>
<MenuItem value={"Not returning library books, physical education and other college equipment."}>Not returning library books, physical education and other college equipment.</MenuItem>
<MenuItem value={"COVID Vaccination: COVID Vaccination - Mandate not met."}>COVID Vaccination: COVID Vaccination - Mandate not met.</MenuItem>
<MenuItem value={"Admissions, Incomplete"}>Admissions, Incomplete</MenuItem>


        </Select>
      </FormControl>
    </Box>
    <Button onClick={handleAddHoldClick}>Click</Button>
         </div>
         
     </div>
        </div>
  )
}

export default UserPage