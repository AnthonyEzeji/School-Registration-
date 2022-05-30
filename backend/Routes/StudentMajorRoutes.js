const express = require('express')
const StudentMajorModel = require('../Models/Student_Majors.js')
const mongoose = require('mongoose')
const MajorModel = require('../Models/MajorModel')

const router = express.Router()
router.patch('/',(req,res)=>{

})
router.get('/:UserID',async (req,res)=>{
    console.log(req.params)
  var majorId = ""
    try{
      await StudentMajorModel.findOne({STUDENT_ID:req.params.UserID
      }).then(doc=>{
            majorId = doc.Major_ID
            
      })
      var majorName = ""
  await MajorModel.findOne({Major_ID:majorId}).then(doc=>{
majorName = doc.Major_Name

  })
  var obj = {majorId:majorId, majorName:majorName}
  return res.json(obj)
    }
    catch(err){
  return res.json({message:err})

    }
}
)





router.get('/', async(req,res)=>{
 if(req.body.hasOwnProperty("classToGet")){
     console.log('request for one course')
     try{
        const courseToFind = await ClassModel.findOne({CRN:req.body.classToGet}).then(doc=>{
            res.json(doc)
            res.sendStatus(200)
            console.log(doc)
        }) 

     }catch(err){
         res.json({message:err})
         res.sendStatus(404)
        console.log(err)
     }

 }
 else{
     try{
         const classToToFind = await ClassModel.find({}).then(docs=>{
             res.json(docs)
             res.sendStatus(200)
         })
     }
     catch(err){
         res.json({message:err})
         res.sendStatus(404)
         console.log(err)
     }
 }    
})




router.delete( '/',async (req,res)=>{
    console.log(req.body)
    try{
        const courseToDelete = await ClassModel.findByIdAndDelete(req.body.courseToDelete).then(doc=>{
            console.log(doc)
            res.json(doc)
            res.sendStatus(200)
        })
    }catch(err){
        res.send(err)
        res.sendStatus(404)
        console.log(err)
    }
})

module.exports = router