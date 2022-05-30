const express = require('express')
const MasterScheduleModel = require('../Models/MasterScheduleModel')
const mongoose = require('mongoose')
const userModel = require('../Models/UserModel')
const scheduleClassModel = require('../Models/ScheduleClassModel')

const router = express.Router()
router.get('/:UserID',async(req,res)=>[
    await scheduleClassModel.find({Student_ID:req.params.UserID}).then(doc=>{
        return res.send(doc)
        console.log(doc)
    })
])

router.post('/',async(req,res)=>{
    var arr = []
    var arr2=[]
await MasterScheduleModel.find({Semester:"SPRING", Year:"2022"}).then(doc=>{
    arr = doc
    console.log(doc.length)

})
await userModel.find({UserType:"Student"}).then(doc=>{
    arr2 = doc
    
})
console.log(arr[1])
for(var i = 0; i < arr2.length; i++){
var startTimes= []
    for(var j = 0 ; j <4; j++){
        var count = Math.floor(Math.random() * (arr.length - 1 ) ) + 1
        
        console.log(count)
        
        for(var x = 0; x < startTimes.length; x++){
            while(j!=0&&startTimes[x]==`${arr[count].StartTime}/${arr[count].Day}`){
                count = Math.floor(Math.random() * (arr.length - 1) ) + 1
                console.log('new count', count)
            }
            
        }
        console.log(count)
        startTimes.push(`${arr[count].StartTime}/${arr[count].Day}`)
        await scheduleClassModel.create({
            Student_ID: arr2[i].UserID,
            CRN:arr[count].CRN ,
            CourseName:arr[count].CourseName ,
            
            RoomNumber:arr[count].RoomNumber ,
            ProfessorFirstName:arr[count].ProfessorFirstName ,
            ProfessorLastName:arr[count].ProfessorLastName,
            StartTime:arr[count].StartTime ,
            EndTime:arr[count].EndTime,
            Day: arr[count].Day,
            Semester: arr[count].Semester,
            Year:arr[count].Year,
              }).then(doc=>{
                  console.log(doc)
              })
        }
    }

})
module.exports = router