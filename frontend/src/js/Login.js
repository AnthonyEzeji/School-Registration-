import { Button, Input } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../css/Login.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    Link,
    NavLink,
    Redirect,
    useNavigate
  } from "react-router-dom";
  import AuthReducer from '../redux/AuthSlice'
  import { useSelector, useDispatch } from 'react-redux'
  import { logoutDrawer, loginDrawer, authDrawer, selectAuth } from '../redux/AuthSlice'
import Profile from './Profile';
 
function Login() {
  useEffect(async () => {
    if(window.sessionStorage.hasOwnProperty('session')){
      if( window.sessionStorage.getItem('session')!=null){
        await axios.post('https://54.196.9.169:5001/api/login', {Email : JSON.parse(window.sessionStorage.getItem('session')).user.Email, Password:JSON.parse(window.sessionStorage.getItem('session')).user.Password}).then(res=>{
          console.log(res.data)
          if(res.data.isAuth){
            
  window.sessionStorage.setItem('session', JSON.stringify(res.data));
  
            
            console.log(res.data)
            navigate('/profile')
            dispatch(loginDrawer(res.data))
             
           
          }
  
        })
      }
    }
   
  }, [])
  
  const [credentials, setCredentials] = useState({email:"",password:""});

 
  
  useEffect(() => {
    console.log(credentials)
    return () => {
      
    };
  }, [credentials]);

    
    function onChangeEmail(e){
     
      setCredentials({email:e.target.value, password:credentials.password})
      
    }
    function onChangePassword(e){
      setCredentials({email:credentials.email, password:e.target.value})
      
    }
    

    
    let navigate = useNavigate(); 
    

    const getAuth = useSelector((state)=>state.auth.isAuthorized)
    
    const dispatch = useDispatch()
    
    async function  onClickHandler(e){
      const win = window.sessionStorage;
     
        axios.post('https://54.196.9.169:5001/api/login/', {Email : credentials.email, Password:credentials.password}).then(res=>{
          console.log(res.data)
          if(res.data.isAuth){
            
  win.setItem('session', JSON.stringify(res.data));
  win.setItem('current-student', JSON.stringify(res.data.user));
  win.setItem('current-faculty', JSON.stringify(res.data.user));
            
            console.log(res.data)
            navigate('/profile')
            dispatch(loginDrawer(res.data))
             
           
          }
  
        })
    
      
    }
    console.log(getAuth)
    function handleStudent(){
      setCredentials({email:'MAttenbarrow@mu.edu',password:"vdPoEyzt"
      })
      console.log(credentials)
      onClickHandler()
    }
    function handleAdmin(){
      setCredentials({email:'AWalshe@mu.edu',password:"BwZlR90b"
      })
      
      console.log(credentials)
      onClickHandler()
    }
    function handleFaculty(){
      setCredentials({email:'MSendley@mu.edu',password:"liDB3azp"
      })
      
      console.log(credentials)
      onClickHandler()
    }
    
    
  
      return (
        <div className='login'>
            <div className="form-container">
            <Input onChange = {onChangeEmail} id="input" placeholder=' enter username' />
            <Input onChange = {onChangePassword} id="input" placeholder ='enter password' ></Input>
            <Button id= "button" onClick = {onClickHandler} >Login</Button>
            </div>
            <div className="autofill">
              <h5>Double Click</h5>
              <div className="btns">
              <Button onClick = {handleStudent}> Auto Login : Student</Button>
              <Button onClick = {handleAdmin}> Auto Login : Admin</Button>
              <Button onClick = {handleFaculty}> Auto Login : Faculty</Button>
              </div>
    
            </div>
            
        </div>
      )
    }
  


export default Login
