const express = require('express')
const majorReqModel = require('../Models/MajorReqModel')
const mongoose = require('mongoose')
const session = require('express-session')
const studentMajorModel = require('../Models/Student_Majors')
const coursesModel = require("../Models/CoursesModel")


const router = express.Router()



router.get('/:UserID',async (req,res)=>{
   console.log('here', req.params.UserID)
    var majorId;
    await studentMajorModel.findOne({STUDENT_ID:req.params.UserID}).then(doc=>{
        if(doc){
            return majorId = doc.Major_ID
            
        }
      
        
    })
    console.log(majorId)
    var majorReqs=[]
   await majorReqModel.find({Major_ID:majorId}).then(doc=>{
    console.log(majorId)
    majorReqs = doc
       
    })
    
    arr = [];
    for(var i = 0; i < majorReqs.length;i++ ){
        console.log(majorReqs[i].CRS_ID)
        await coursesModel.findOne({Course_ID:majorReqs[i].CRS_ID}).then(doc=>{
            console.log(doc)
             arr[i] = doc
        })
    }
    console.log(majorReqs)
    res.send(arr)
})
module.exports = router