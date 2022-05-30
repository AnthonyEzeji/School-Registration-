
const express = require('express')

const mongoose = require('mongoose')
const masterScheduleModel = require('../Models/MasterScheduleModel')
const userModel = require('../Models/UserModel')
const scheduleClassModel = require('../Models/ScheduleClassModel')

const router = express.Router()

router.get('/:UserID',async (req,res)=>{
    console.log(req.params.UserID)
    var faculty;
    await userModel.findOne({UserID:req.params.UserID}).then(doc=>{
        
        faculty = doc
    })
    await masterScheduleModel.find({ProfessorFirstName:faculty.FirstName, Year:2022, Semester:"SPRING"}).then(doc=>{
     
        res.send(doc)
    })
})
router.get('/faculty-schedule/:CRN',async (req,res)=>{

var students = []
await scheduleClassModel.find({CRN:req.params.CRN, Year:2022}).then(doc=>{
console.log('request for students')
  students = doc
})

var arr = []
for(var i = 0 ; i < students.length;i++){
    console.log(students[i].Student_ID)
    await userModel.findOne({UserID:students[i].Student_ID}).then(doc=>{
        
        arr.push(doc)
    })
}
return res.send(arr)
})
router.get('/update-grade/:_id',async (req,res)=>{
    console.log(req.params._id)
    userModel.findById(req.params._id).then(doc=>{return res.send(doc)})
})
module.exports = router