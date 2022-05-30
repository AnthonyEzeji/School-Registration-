const express = require('express')
const TimeslotModel = require('../Models/Timeslots.js')
const mongoose = require('mongoose')

const router = express.Router()

router.post('/',async (req,res)=>{
  
    try{
      
        const newCourse = await ClassModel.create(req.body).then(function(doc){
            console.log(doc)
            res.json(doc)
            res.sendStatus(200)
        })}
    catch(err){
  res.json({message:err})
  res.sendStatus(404)
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