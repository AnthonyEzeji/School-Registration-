const express = require('express')

const mongoose = require('mongoose')
const enrollmentModel = require('../Models/EnrollmentModel')
const classModel = require('../Models/ClassModel')
const coursesModel = require('../Models/CoursesModel')
const TimeSlotModel = require('../Models/Timeslots')
const MasterScheduleModel = require('../Models/MasterScheduleModel')
const HoldModel = require('../Models/HoldsModel')

const router = express.Router()

router.post('/',async(req,res)=>{
    var bool = true;
    await HoldModel.find({Student_ID:req.body.session.user.UserID}).then(docs=>{
        if(docs.length>0){
            console.log('holds')
            bool = false
            return res.send({message:"Cannot register for course with hold on account"})
        }
    })
    var studentEnrollments;
    await enrollmentModel.find({Student_ID:req.body.session.user.UserID}).then((docs,err)=>{
        if(err){
            console.log(err)
        }else{
            studentEnrollments = docs
            
        }
    })

    var requestedClass={}
    await MasterScheduleModel.findById(req.body.data[0]).then((doc,err)=>{
        if(err){
            console.log(err)
        }else{
            requestedClass = doc
            
           
        
        }
        
     
    })
   

    
    
  
    if(requestedClass.Year != 2022 && requestedClass.Semester != "FALL"){
        bool = false 
        return res.send({message:"Cannot register for a past or current semester"})
        
    }
    if(studentEnrollments.length>0){
        if(studentEnrollments.length>=4){
            return res.send({message:"Cannot register for more than 16 credits a semester"})
        }
        for(var i = 0 ; i < studentEnrollments.length;i++){
      
           
            
           
            if(studentEnrollments[i].CRN == requestedClass.CRN ){
                
                bool = false
                
                return res.send({message:"Cannot register for a class twice"})
                
            }
            if(studentEnrollments[i].StartTime == requestedClass.StartTime ){
                
                bool = false
                
                return res.send({message:"Cannot register for a class twice"})
                
            }
        }
        console.log(bool)
        if(bool == true){
            await enrollmentModel.create({CRN:requestedClass.CRN, Student_ID:req.body.session.user.UserID,Grade: "IP", StartTime :requestedClass.StartTime, Day : requestedClass.Day, Semester:requestedClass.Semester, Year: requestedClass.Year
            }).then(doc=>{
                console.log('created enrollment',doc)
                res.send(doc)
       
    
        })
       
    
        }
    }else{
        await enrollmentModel.create({CRN:requestedClass.CRN, Student_ID:req.body.session.user.UserID,Grade: "IP", StartTime :requestedClass.StartTime, Day : requestedClass.Day, Semester:requestedClass.Semester, Year: requestedClass.Year
    }).then(doc=>{
        console.log('created enrollment',doc)
        res.send(doc)


})
    }
    
    
})







router.post('/:UserID',  async(req,res)=>{
    var studentEnrollments;
    await enrollmentModel.find({Student_ID:req.params.UserID}).then((docs,err)=>{
        if(err){
            console.log(err)
        }else if(docs){
            studentEnrollments = docs
        }
    })
    var requestedClass={}
    await MasterScheduleModel.findById(req.body.data[0]).then((doc,err)=>{
        if(err){
            console.log(err)
        }else{
            requestedClass = doc
        }
    })
    var bool = true;
    if(requestedClass.Year != 2022 && requestedClass.Semester != "FALL"){
        bool = false 
        return res.send({message:"Cannot register for a past or current semester"})
    }
    if(requestedClass.AvailableSeats <= 0){
        bool = false 
        return res.send({message:"No available seats"})
    }

    if(studentEnrollments.length>0 ){
        console.log(studentEnrollments.length)
        if(studentEnrollments.length>=4){
            return res.send({message:"Cannot register for more than 16 credits a semester"})
        }
        for(var i = 0 ; i < studentEnrollments.length;i++){
            if(studentEnrollments[i].CRN == requestedClass.CRN ){
                bool = false
                return res.send({message:"Cannot register for a class twice"})
            }
            if(studentEnrollments[i].StartTime == requestedClass.StartTime ){
                bool = false
                return res.send({message:"timeslot restriction"})
            }
        }
        console.log(bool)
        if(bool == true){
           
            await enrollmentModel.create({CRN:requestedClass.CRN, Student_ID:req.params.UserID,Grade: "IP", StartTime :requestedClass.StartTime, Day : requestedClass.Day, Semester:requestedClass.Semester, Year: requestedClass.Year
            }).then(doc=>{
                console.log('created enrollment',doc)
                res.send(doc)
        })
        
        }
        if(bool){
            await MasterScheduleModel.findOneAndUpdate({CRN:requestedClass.CRN, Year:2022}, {AvailableSeats:requestedClass.AvaiableSeats-1}).then(doc=>{
                console.log('updated class',doc)
            })
        }
    }else{
        
        await MasterScheduleModel.findOne({CRN:requestedClass.CRN, Year:2022}).then(doc=>{
            console.log('updated class',doc)
        })
        await enrollmentModel.create({CRN:requestedClass.CRN, Student_ID:req.params.UserID,Grade: "IP", StartTime :requestedClass.StartTime, Day : requestedClass.Day, Semester:requestedClass.Semester, Year: requestedClass.Year
    }).then(doc=>{
        console.log('created first enrollment',doc)
        res.send(doc)
})

    }
} )









router.get('/:UserID',async (req,res)=>{
    var enrollments;

    var temp = [];
    await enrollmentModel.find({Student_ID:req.params.UserID}).then(doc=>{
       
        enrollments = doc
    })
  
    for(var i = 0; i < enrollments.length;i++){
        await MasterScheduleModel.findOne({CRN:enrollments[i].CRN}).then(doc=>{
           
            var obj = {_id:enrollments[i]._id,CRN:enrollments[i].CRN,Grade:enrollments[i].Grade,Semester_Year:enrollments[i].Semester_Year,Student_ID:enrollments[i].Student_ID,CourseName:doc.CourseName}
            temp.push(obj)

        })

    }

    return res.send(temp)
})
router.delete('/:UserID',async (req,res)=>{
    enrToDelete = req.body
    var arr=[]
    for(var i = 0 ; i < enrToDelete.length; i++){

        await enrollmentModel.findByIdAndDelete(enrToDelete[i]).then(doc=>{
            console.log(doc)
            arr.push(doc)
         
        })
    }
    res.send(arr)
})

module.exports = router