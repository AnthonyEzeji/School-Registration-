import { Button, Switch } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import DrawerMenu3 from './DrawerMenu3';
import '../css/Profile.css'
import DrawerMenu from './DrawerMenu';
import DrawerMenu2 from './DrawerMenu2'

function Profile() {
  const userObj = useSelector((state)=>state.auth)
  const navigate = useNavigate()
  
   

    
    useEffect(() => {
        
        return   axios.get(`https://54.196.9.169:5001/api/users/${userObj.UserID}`).then(doc=>{
               
                
                
            })
        ;
    }, []);
   const address = JSON.parse(window.sessionStorage.getItem('session')).user.Street + ", " + JSON.parse(window.sessionStorage.getItem('session')).user.City+", " + JSON.parse(window.sessionStorage.getItem('session')).user.State
   
   const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const [checked, setChecked] = useState(false)
 
  function handleSwitch(){
    
    setChecked(!checked)
    
  }
  useEffect(() => {
    var x = document.getElementById("address");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  }, [checked])
const win = window.sessionStorage;

const [session, setSession] = useState(  {items: {}})
var obj = "";
useEffect(async () => {
    obj =   JSON.parse(window.sessionStorage.getItem('session'))
  
   setSession(obj)


}, [])
console.log(session)
if(JSON.parse(window.sessionStorage.getItem('session')).user.UserType == "Admin"){
  return (
    <div className= {JSON.parse(window.sessionStorage.getItem('session')).user.UserType == "Admin"?"profile":'profile2'} >
      {JSON.parse(window.sessionStorage.getItem('session')).user.UserType == "Admin"?<DrawerMenu/>:<DrawerMenu2/>}
        <div className = "profile-card">
          <div className="top">
          <h3>{JSON.parse(window.sessionStorage.getItem('session')).user.UserType.toString().toUpperCase()}</h3>
          </div>
          
          <div className="card-option"><h3>Name</h3><p>{JSON.parse(window.sessionStorage.getItem('session')).user.LastName+", " +JSON.parse(window.sessionStorage.getItem('session')).user.FirstName}</p></div>
         
          <div className="card-option"><h3>Email</h3> <p>{JSON.parse(window.sessionStorage.getItem('session')).user.Email}</p></div>
          <div className="card-option"><h3>Address</h3><Switch onClick={handleSwitch} {...label} defaultChecked = {false} /><p id = 'address'>{address}</p>
          </div>
          <div className="card-option"></div>
            
           
            
            
            
            </div>
    </div>
  )
}else if(JSON.parse(window.sessionStorage.getItem('session')).user.UserType == "Student"){
  return (
    <div className= 'profile2' >
      <DrawerMenu2/>
        <div className = "profile-card">
          <div className="top">
          <h3>{JSON.parse(window.sessionStorage.getItem('session')).user.UserType.toString().toUpperCase()}</h3>
          </div>
          
          <div className="card-option"><h3>Name</h3><p>{JSON.parse(window.sessionStorage.getItem('session')).user.LastName+", " +JSON.parse(window.sessionStorage.getItem('session')).user.FirstName}</p></div>
         
          <div className="card-option"><h3>Email</h3> <p>{JSON.parse(window.sessionStorage.getItem('session')).user.Email}</p></div>
          <div className="card-option"><h3>Address</h3><Switch onClick={handleSwitch} {...label} defaultChecked = {false} /><p id = 'address'>{address}</p>
          </div>
          <div className="card-option"></div>
            
           
            
            
            
            </div>
    </div>
  )
}else{
  return (
    <div className= 'profile3' >
      <DrawerMenu3/>
        <div className = "profile-card">
          <div className="top">
          <h3>{JSON.parse(window.sessionStorage.getItem('session')).user.UserType.toString().toUpperCase()}</h3>
          </div>
          
          <div className="card-option"><h3>Name</h3><p>{JSON.parse(window.sessionStorage.getItem('session')).user.LastName+", " +JSON.parse(window.sessionStorage.getItem('session')).user.FirstName}</p></div>
         
          <div className="card-option"><h3>Email</h3> <p>{JSON.parse(window.sessionStorage.getItem('session')).user.Email}</p></div>
          <div className="card-option"><h3>Address</h3><Switch onClick={handleSwitch} {...label} defaultChecked = {false} /><p id = 'address'>{address}</p>
          </div>
          <div className="card-option"></div>
            
           
            
            
            
            </div>
    </div>
  )
}
    

   
   
 
}

export default Profile