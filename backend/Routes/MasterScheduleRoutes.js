
const express = require('express')
const MasterScheduleModel = require('../Models/MasterScheduleModel')
const mongoose = require('mongoose')

const departmentModel = require('../Models/DepartmentModel')

const router = express.Router()

router.post('/',async (req,res)=>{
console.log(req.body)
  
    arr = []
    MasterScheduleModel.find({ProfessorFirstName:req.body.ProfessorFirstName}).then(docs=>{
    
        arr = docs
    })
    departmentModel.findOne({Department_Name:req.body.DepartmentName}).then(doc=>{
        department = doc.DepartmentName
        
    })
    for(var i = 0; i<arr.length; i++){
        console.log(req.body.StartTime,arr[i].StartTime)
        if(req.body.StartTime == arr[i].StartTime){
            
            return res.send({message:"timeslot confliction"})
        }
    }
    
    try{
        var obj = {...req.body,Year:2022, DepartmentName:department }
       const newClass = MasterScheduleModel.create(obj).then((doc,err)=>{
           if(err){
               console.log(err)
           }
        })
        
        
    }
    catch(err){
  res.send({message:err})
    }
}
)
router.delete('/', async(req,res)=>{
    
   var temp ;
    var arr = req.body.selectionModel
 
    
        try{
            for(var i = 0; i < arr.length; i++){
            await MasterScheduleModel.findByIdAndDelete(arr[i]).then(doc=>{
               
                temp = doc
               
            })
        }
        }catch(e){
            if(e){
                console.log(e)
                
            }
        }
    
        return res.send({message:"hello"})
})


router.get('/', async(req,res)=>{
    console.log('requst for data')
    const data = await MasterScheduleModel.find({})
  
    res.json(data)
    
})
router.get('/:id', async(req,res)=>{
    console.log('requst for one class')
    var data;
 await MasterScheduleModel.findById(req.params.id).then(doc=>{
        data = doc
    })
   
    return res.json(data)
    
})

module.exports = router