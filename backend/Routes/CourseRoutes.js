const express = require('express')
const CoursesModel = require('../Models/CoursesModel')
const mongoose = require('mongoose')
const masterScheduleModel = require('../Models/MasterScheduleModel')
const departmentModel = require('../Models/DepartmentModel')

const router = express.Router()

router.post('/',async (req,res)=>{
  console.log(req.body)
    try{
      await departmentModel.findOne({Department_Name:req.body.department}).then(doc=>{
          dept_id = doc.Dept_ID
      })
        const newCourse = await CoursesModel.create({Course_Name:req.body.courseName, Course_ID:req.body.courseID, Course_Credit:req.body.credit, Major:req.body.major, Department_Name:req.body.department,Dept_ID: dept_id }).then(function(doc){
            console.log(doc)
           return res.json(doc)
            
        })}
    catch(err){
  return res.json({message:err})

    }
}
)





router.get('/', async(req,res)=>{
 if(req.body.hasOwnProperty("courseToGet")){
     console.log('request for one course')
     try{
        const courseToFind = await CoursesModel.findOne({Course_ID:req.body.courseToGet}).then(doc=>{
           return res.json(doc)
            
            console.log(doc)
        }) 

     }catch(err){
         return res.json({message:err})
         
        console.log(err)
     }

 }
 else{
     try{
         const coursesToFind = await CoursesModel.find({}).then(docs=>{
            return  res.json(docs)
            
         })
     }
     catch(err){
        return  res.json({message:err})
         
         console.log(err)
     }
 }    
})




router.delete( '/',async (req,res)=>{
    var arr = []
    console.log(req.body)
    for(var i = 0; i < req.body.length; i++){
        try{
            const courseToDelete = await CoursesModel.findByIdAndDelete(req.body[i]).then(doc=>{
                arr.push(doc.Course_Name)
                
               
            })
        }catch(err){
          return   res.send(err)
         
            console.log(err)
        }

    }
    return res.json(arr)
})

module.exports = router