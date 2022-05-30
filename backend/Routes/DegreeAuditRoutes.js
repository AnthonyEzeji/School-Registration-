
const express = require('express')
const enrollmentModel = require('../Models/EnrollmentModel')
const studentHistoryModel = require('../Models/StudentHistoryModel')

const mongoose = require('mongoose')

const router = express.Router()
const  classModel = require('../Models/ClassModel')
const coursesModel = require('../Models/CoursesModel')


const masterScheduleModel = require('../Models/MasterScheduleModel')


router.get('/:UserID', async(req,res)=>{
    

   
     
        var arr = []
        var arr2 = []
       
            await studentHistoryModel.find({Student_ID:req.params.UserID}).then(docs=>{
                return arr = docs
               
              
            })
             var courseId;
             
               for (var i = 0 ; i < arr.length; i++){
                   await masterScheduleModel.findOne({CRN:arr[i].CRN}).then(doc=>{
                       if(doc){
                         courseName = doc.CourseName
                       
                       }else{
                         console.log('no course')
                       }
                      
                   })
                   
                   if(courseName!=null){
                   
                    await coursesModel.findOne({Course_Name:courseName}).then(doc=>{
                      
                      
                      var obj = {Course:arr[i],Course_Name:doc.Course_Name}
                      arr2[i]=obj
                    })

                   }
                  
               } 
               
              

        res.send(arr2)
        
    
   
})

module.exports = router