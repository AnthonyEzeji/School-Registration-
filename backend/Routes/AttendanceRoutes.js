const express = require('express')
const attendanceModel = require('../Models/AttendanceModel')
const mongoose = require('mongoose')


const router = express.Router()

router.post('/',async (req,res)=>{
    console.log(req.body.Attendance)
await attendanceModel.findOne({CRN:req.body.CRN, Student_ID:req.body.Student_ID}).then(doc=>{
    if(doc){
        attendanceModel.findOneAndUpdate({CRN:req.body.CRN, Student_ID:req.body.Student_ID}, {Present:req.body.Attendance.Present, Absent:req.body.Attendance.Absent}).then(doc=>{
            console.log(doc)
        })
    }else{
        attendanceModel.create({CRN:req.body.CRN, Student_ID:req.body.Student_ID, Present:req.body.Attendance.Present, Absent:req.body.Attendance.Absent}).then(doc=>{
            console.log(doc)
        })
    }
})
}
)

router.get('/',async (req,res)=>{
await attendanceModel.findOne({CRN:req.body.CRN, Student_ID:req.body.Student_ID}).then(doc=>{
    console.log(doc)
    return res.send(doc)
})
}
)

module.exports = router