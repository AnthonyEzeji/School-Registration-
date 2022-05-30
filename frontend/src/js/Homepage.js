import "../css/Homepage.css"
import React from "react"
import { Link } from "react-router-dom"
import { Button } from "@mui/material"






function Homepage(){
    return(
        
        <div className="homepage">
            <div className="homepage-navbar"> 
            <div className="navbar-option">
              <Link  style={{paddingLeft: 13, textDecoration: 'none'}} to="/login" ><Button   style={{
        
        backgroundColor: "white",
        width:"16vw",
        padding: "18px 36px",
        fontSize: "18px"
    }}>Login</Button></Link>
                
            </div>
            <div className="navbar-option">
            <Link  style={{paddingLeft: 13, textDecoration: 'none'}} to="/master-schedule" ><Button   style={{
        
        backgroundColor: "white",
        width:"16vw",
        padding: "18px 36px",
        fontSize: "18px"
    }}>Master Schedule</Button></Link>
           
           
               
            </div>
           
            <div className="navbar-option">
            <Link  style={{paddingLeft: 13, textDecoration: 'none'}} to="/courses" ><Button   style={{
        
        backgroundColor: "white",
        width:"16vw",
        padding: "18px 36px",
        fontSize: "18px"
    }}>Course Catalog</Button></Link>
            </div>
            
            <div className="navbar-option">
            <Link  style={{paddingLeft: 13, textDecoration: 'none'}} to="/academic-calendar" ><Button   style={{
      
        backgroundColor: "white",
        width:"16vw",
        padding: "18px 36px",
        fontSize: "18px"
    }}>Academic Calender</Button></Link>
            </div>
            <div className="navbar-option">
            <Link  style={{paddingLeft: 13, textDecoration: 'none'}} to="/contact" ><Button   style={{
      
        backgroundColor: "white",
        width:"16vw",
        padding: "18px 36px",
        fontSize: "18px"
    }}>Contact US</Button></Link>
            </div>
            </div>
        <div className="homepage-container">
            <div className="signup">
                <h1>Monsters University</h1>
                <p>we monsters anyway!</p>
                <button>Sign up</button>

            </div>

        </div>
        </div>


)
}
export default Homepage