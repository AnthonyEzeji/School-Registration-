
const express = require('express')
const HoldsModel = require('../Models/HoldsModel')
const mongoose = require('mongoose')
const HoldObjModel = require('../Models/HoldObjModel')

const router = express.Router()

router.post('/',async (req,res)=>{
    console.log('request to add hold')
    console.log(req.body)
    var hold2 = {}
    await HoldObjModel.find({HOLD_NAME:req.body.holdSelected}).then(doc=>{
        hold2 = doc
        console.log(doc)
    })
    const newHold = await HoldsModel.create({Student_ID:req.body.UserID, HOLD_TYPE:req.body.holdSelected,HOLD_ID:hold2[0].HOLD_ID})
    try{
        
        const savedHold = await newHold.save().then(data=>{
            
            
            console.log(1,data)
        })
      
    }
    catch(err){
  res.send({message:err})
    }
}
)



router.get('/', async(req,res)=>{
    console.log('requst for holds')
    const data = await HoldsModel.find({})
    console.log(data)
    res.send(data)
    
})
router.get('/:UserID', async(req,res)=>{
    
    console.log('requst for hold'+ req.params.UserID)
     await HoldsModel.find({Student_ID:req.params.UserID}).then(doc=>{
        const data = doc
        console.log(data)
        res.send(data)
    })
   
  
})
router.delete('/', async(req,res)=>{
    console.log('requst to delete hold' + Date.now())
    console.log(req.body)

    const data = await HoldsModel.findOneAndDelete({Student_ID:req.body.UserID,HOLD_ID:req.body.HOLD_ID}).then(doc=>{
        console.log(doc)
        
    })
    
})

module.exports = router