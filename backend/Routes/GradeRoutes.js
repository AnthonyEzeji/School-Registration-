
const express = require('express')

const mongoose = require('mongoose')
const GradesModel = require('../Models/GradesModel')

const router = express.Router()

router.post('/',async (req,res)=>{
    console.log(req.body)
   await GradesModel.findOneAndUpdate({CRN:req.body.CRN ,Student_ID:req.body.Student_ID},{Grade:req.body.Grade}).then(doc=>{
       if(!doc){
       GradesModel.create({CRN:req.body.CRN ,Student_ID:req.body.Student_ID,Grade:req.body.Grade}).then(doc=>{
           console.log('here')
            console.log(doc)
            return res.send(doc)
        })

       }else{
        console.log(doc)
        return res.send(doc)
       }
      
   })
}
)



router.get('/:CRN/:UserID', async(req,res)=>{
    
    await GradesModel.findOne({Student_ID:req.params.UserID}).then((doc,err)=>{

        if(err){
            console.log(err)
        }
        else if (doc){
            return res.send(doc.Grade)
        }
        
    })
    
})



module.exports = router