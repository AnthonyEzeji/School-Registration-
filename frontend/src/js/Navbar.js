import React from 'react'
import  axios from 'axios'
import '../css/Navbar.css'
import {Button} from '@mui/material'

function Navbar() {
   
    function onClickHandler(e){
        axios.get("3.87.187.44:5001/masterschedule").then(res=>{
        console.log(res.data)
    })

    }
    
  return (
    <div className='navbar'>
        <div className='navbar-top'>
            <img src='i.pinimg.com/736x/99/08/ee/9908ee0aa4bb2245a570782e64341160.jpg' alt=""/>
            <h1>Monsters University</h1>
        </div>
        

           
        
           
    </div>
  )
}

export default Navbar