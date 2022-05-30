import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../css/DegreeAudit.css'
import DrawerMenu from './DrawerMenu';
import DrawerMenu2 from './DrawerMenu2';
import DrawerMenu3 from './DrawerMenu3';
function DegreeAudit() {
  const [GPA, setGPA] = useState(Number);
  const [studentHistory, setStudentHistory] = useState([]);
  const [studentEnrollments,setStudentEnrollments] = useState([])
  const [studentMajor,setStudentMajor] = useState('')
  const [studentMajorReq,setStudentMajorReq] = useState([])
  
useEffect(() => {
  if(JSON.parse(window.sessionStorage.getItem("session")).user.UserType=="Student"){
    axios.get(`https://54.196.9.169:5001/api/enrollment/${JSON.parse(window.sessionStorage.getItem("session")).user.UserID}`).then(res=>{

      setStudentEnrollments(res.data)
    })
  }else{
    axios.get(`https://54.196.9.169:5001/api/enrollment/${JSON.parse(window.sessionStorage.getItem("current-student")).UserID}`).then(res=>{

  setStudentEnrollments(res.data)
})
  }

}, [])
useEffect(async () => {if(JSON.parse(window.sessionStorage.getItem("session")).user.UserType=="Student"){
  await axios.get(`https://54.196.9.169:5001/api/majorrequirements/${JSON.parse(window.sessionStorage.getItem("session")).user.UserID}`).then(res=>{
    console.log(res.data)
    setStudentMajorReq(res.data)
  })
}else{
 await axios.get(`https://54.196.9.169:5001/api/majorrequirements/${JSON.parse(window.sessionStorage.getItem("current-student")).UserID}`).then(res=>{
    console.log(res.data)
    setStudentMajorReq(res.data)
  })
}
 
  }, [])

  useEffect(async () => {
    if(JSON.parse(window.sessionStorage.getItem("session")).user.UserType=="Student"){
      await  axios.get(`https://54.196.9.169:5001/api/degree-audit/${JSON.parse(window.sessionStorage.getItem("session")).user.UserID}`).then(res=>{
        var sum = 0;
        for(var i = 0 ; i < studentHistory.length;i++){
          console.log(studentHistory[i].Course.Grade)
          if(studentHistory[i].Course.Grade == "A+"){
            sum = sum+4
          }else if(studentHistory[i].Course.Grade == "A"){
      sum = sum + 3.87
          }else if(studentHistory[i].Course.Grade == "A-"){
            sum = sum + 3.6
          }else if(studentHistory[i].Course.Grade == "B+"){
            sum = sum + 3.3
          }else if(studentHistory[i].Course.Grade == "B"){
            sum = sum + 3
          }else if(studentHistory[i].Course.Grade == "B-"){
            sum = sum + 2.7
          }else if(studentHistory[i].Course.Grade == "C+"){
            sum = sum + 2.5
          }else if(studentHistory[i].Course.Grade == "C"){
            sum = sum + 2.3
          }else if(studentHistory[i].Course.Grade == "C-"){
            sum = sum + 2
          }else if(studentHistory[i].Course.Grade == "D+"){
            sum = sum + 1.7
          }
      
          }
         
        
        setGPA((sum/4).toFixed(2))
        
         setStudentHistory(res.data)
         
       })
    }else{
      await  axios.get(`https://54.196.9.169:5001/api/degree-audit/${JSON.parse(window.sessionStorage.getItem("current-student")).UserID}`).then(res=>{
        var sum = 0;
        for(var i = 0 ; i < studentHistory.length;i++){
          console.log(studentHistory[i].Course.Grade)
          if(studentHistory[i].Course.Grade == "A+"){
            sum = sum+4
          }else if(studentHistory[i].Course.Grade == "A"){
      sum = sum + 3.87
          }else if(studentHistory[i].Course.Grade == "A-"){
            sum = sum + 3.6
          }else if(studentHistory[i].Course.Grade == "B+"){
            sum = sum + 3.3
          }else if(studentHistory[i].Course.Grade == "B"){
            sum = sum + 3
          }else if(studentHistory[i].Course.Grade == "B-"){
            sum = sum + 2.7
          }else if(studentHistory[i].Course.Grade == "C+"){
            sum = sum + 2.5
          }else if(studentHistory[i].Course.Grade == "C"){
            sum = sum + 2.3
          }else if(studentHistory[i].Course.Grade == "C-"){
            sum = sum + 2
          }else if(studentHistory[i].Course.Grade == "D+"){
            sum = sum + 1.7
          }
      
          }
         
        
        setGPA((sum/4).toFixed(2))
        
         setStudentHistory(res.data)
         
       })

    }
 


  }, []);
    useEffect(async() => {
 await axios.get(`https://54.196.9.169:5001/api/studentmajors/${JSON.parse(window.sessionStorage.getItem("session")).user.UserID}`).then(res=>{
   
   setStudentMajor(res.data)
   
 })
 

  }, []);

  console.log(studentHistory)
  var User = JSON.parse(window.sessionStorage.getItem('session')).user
  console.log(User)

  function getGPA(){
  
  }
  if(JSON.parse(window.sessionStorage.getItem('session')).user.UserType == "Admin"){
    return (
      <div className='degree-audit'>
<DrawerMenu/>
        <div className="header">
          <h1>Degree Audit</h1>
        </div>
          <div className="completion">
            <div className="completion-top">
             <h1>Degree Audit: {User.UserType == 'Student'?User.FirstName:JSON.parse(window.sessionStorage.getItem('current-student')).FirstName}</h1>
            </div>
            <div className="completion-body">
              <div className="completion-option">
                <h3>
                  Credits: 16
                </h3>
              </div>
              <div className="completion-option">
              <h3>
                  Major: {studentMajor.majorName}
              </h3>
              </div>
              <div className="completion-option">
              <h3>
                  Minor: Pre Health Professions
              </h3>
              </div>
              <div className="completion-option">
              <h3>
                  GPA: {GPA}
              </h3>
              </div>
            </div>
            <div className="completion-bottom">
            <h5>
                  Completion: 4%
                </h5>
            </div>
          </div>
          <div className="history">
            <div className="history-top">
              <h1>Student History</h1>
  
            </div>
            {studentHistory.map((obj, index)=>(
              <div key = {index}className = "history-option"> 
              
            <p>
              {obj.Course_Name}
              </p>
              <p>
              Credits: 4
              </p>
              <p>
              {obj.Course.Grade}
              </p>
              <p>
              {obj.Course.Semester_Year}
              </p>
  
            </div>
            ))}
            
              
            
      
            </div>
          <div className="progress">
            <div className="progress-top">
              <h1> Enrollments</h1>
             
  
            </div>
            {studentEnrollments.map((obj,index)=>(
              <div className="progress-option">
              <p>
                <h5 id = "crn">CRN</h5>
              {obj.CRN}
              </p>
              
              <p>
              <h5 id = "semester">Semester</h5>
              {obj.Semester_Year}
              </p>
              <p>
              <h5 id = "course">Course</h5>
              {obj.CourseName}
              </p>
              
            </div>
  
            ))}
            
  
          </div>
          <div className="requirements">
            <div className="requirements-top">
              <h1>Degree Requirements</h1>
            </div>{
              studentMajorReq.map((obj,index)=>(
                <div key = {index} className="requirements-option">
                <p>
                {obj.Course_Name}
                </p>
                <p>
                Credits: 4
                </p>
              </div>
                
    
              ))
            }
           
  
          </div>
          <div className="space">
             
          </div>
      </div>
    )
  }else if(JSON.parse(window.sessionStorage.getItem('session')).user.UserType == "Student"){
    return (
      <div className='degree-audit2'>
        <DrawerMenu2/>
        <div className="header">
          <h1>Degree Audit</h1>
        </div>
          <div className="completion">
            <div className="completion-top">
             <h1>Degree Audit: {User.FirstName}</h1>
            </div>
            <div className="completion-body">
              <div className="completion-option">
                <h3>
                  Credits: 16
                </h3>
              </div>
              <div className="completion-option">
              <h3>
                  Major: {studentMajor.majorName}
              </h3>
              </div>
              <div className="completion-option">
              <h3>
                  Minor: Pre Health Professions
              </h3>
              </div>
              <div className="completion-option">
              <h3>
                  GPA: {GPA}
              </h3>
              </div>
            </div>
            <div className="completion-bottom">
            <h5>
                  Completion: 4%
                </h5>
            </div>
          </div>
          <div className="history">
            <div className="history-top">
              <h1>Student History</h1>
  
            </div>
            {studentHistory.map((obj, index)=>(
              <div key = {index}className = "history-option"> 
              
            <p>
              {obj.Course_Name}
              </p>
              <p>
              Credits: 4
              </p>
              <p>
              {obj.Course.Grade}
              </p>
              <p>
              {obj.Course.Semester_Year}
              </p>
  
            </div>
            ))}
            
              
            
      
            </div>
          <div className="progress">
            <div className="progress-top">
              <h1> Enrollments</h1>
             
  
            </div>
            {studentEnrollments.map((obj,index)=>(
              <div className="progress-option">
              <p>
                <h5 id = "crn">CRN</h5>
              {obj.CRN}
              </p>
              
              <p>
              <h5 id = "semester">Semester</h5>
              {obj.Semester_Year}
              </p>
              <p>
              <h5 id = "course">Course</h5>
              {obj.CourseName}
              </p>
              
            </div>
  
            ))}
            
  
          </div>
          <div className="requirements">
            <div className="requirements-top">
              <h1>Degree Requirements</h1>
            </div>{
              studentMajorReq.map((obj,index)=>(
                <div key = {index} className="requirements-option">
                <p>
                {obj.Course_Name}
                </p>
                <p>
                Credits: 4
                </p>
              </div>
                
    
              ))
            }
           
  
          </div>
          <div className="space">
             
          </div>
      </div>
    )
  }else{
    return (
      <div className='degree-audit3'>
        <DrawerMenu3/>
        <div className="header">
          <h1>Degree Audit</h1>
        </div>
          <div className="completion">
            <div className="completion-top">
             <h1>Degree Audit: {User.FirstName}</h1>
            </div>
            <div className="completion-body">
              <div className="completion-option">
                <h3>
                  Credits: 16
                </h3>
              </div>
              <div className="completion-option">
              <h3>
                  Major: {studentMajor.majorName}
              </h3>
              </div>
              <div className="completion-option">
              <h3>
                  Minor: Pre Health Professions
              </h3>
              </div>
              <div className="completion-option">
              <h3>
                  GPA: {GPA}
              </h3>
              </div>
            </div>
            <div className="completion-bottom">
            <h5>
                  Completion: 4%
                </h5>
            </div>
          </div>
          <div className="history">
            <div className="history-top">
              <h1>Student History</h1>
  
            </div>
            {studentHistory.map((obj, index)=>(
              <div key = {index}className = "history-option"> 
              
            <p>
              {obj.Course_Name}
              </p>
              <p>
              Credits: 4
              </p>
              <p>
              {obj.Course.Grade}
              </p>
              <p>
              {obj.Course.Semester_Year}
              </p>
  
            </div>
            ))}
            
              
            
      
            </div>
          <div className="progress">
            <div className="progress-top">
              <h1> Enrollments</h1>
             
  
            </div>
            {studentEnrollments.map((obj,index)=>(
              <div className="progress-option">
              <p>
                <h5 id = "crn">CRN</h5>
              {obj.CRN}
              </p>
              
              <p>
              <h5 id = "semester">Semester</h5>
              {obj.Semester_Year}
              </p>
              <p>
              <h5 id = "course">Course</h5>
              {obj.CourseName}
              </p>
              
            </div>
  
            ))}
            
  
          </div>
          <div className="requirements">
            <div className="requirements-top">
              <h1>Degree Requirements</h1>
            </div>{
              studentMajorReq.map((obj,index)=>(
                <div key = {index} className="requirements-option">
                <p>
                {obj.Course_Name}
                </p>
                <p>
                Credits: 4
                </p>
              </div>
                
    
              ))
            }
           
  
          </div>
          <div className="space">
             
          </div>
      </div>
    )
  }
  
}

export default DegreeAudit