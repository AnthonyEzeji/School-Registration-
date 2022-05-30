const express = require('express')
const advisorModel = require('../Models/AdvisorModel')
const mongoose = require('mongoose')
const userModel = require('../Models/UserModel')
const router = express.Router()

router.get('/', async (req,res)=>{
      arr = []
     var arr2=[]
    var arr3 = []
    await advisorModel.find().distinct('Faculty_ID').then(doc=>{
       
        return arr = doc
    }
    )
    console.log(arr)
    for(var i = 0; i < arr.length; i++){
arr2[i] = arr[i]
    }
    console.log(arr2)
    for(var i = 0; i < arr2.length; i++){
        console.log(arr2[i])
await userModel.findOne({UserID:arr2[i]}).then(doc=>{
    advisorName ={id:i,LastName:doc.LastName.toString(), FirstName:doc.FirstName.toString()} 
    return arr3[i] = advisorName
  
})
    }
    console.log(arr3)
  return res.send(arr3)
})
router.get('/:UserID', async (req,res)=>{
  var advisorId = ''
   await advisorModel.findOne({Student_ID:req.params.UserID}).then(doc=>{
       console.log(doc)
       if(doc == null){
        return res.send({message:"This Student Does Not Currently Have An Advisor"})
       
       } advisorId = doc.Faculty_ID
       studentId = doc.Student_ID
       return advisorId, studentId
     
        
       
    })
    
    await userModel.findOne({UserID:advisorId}).then(doc=>{
        console.log(doc)
        return res.send(doc)
    })
})
router.get('/advisees/:UserID', async (req,res)=>{
    arr = []
    arr2 = []
   console.log(req.params)
   await advisorModel.find({Faculty_ID:req.params.UserID}).then(doc=>{
      
     return arr = doc
           
   })
   console.log(arr)
   for(var i = 0; i < arr.length; i++){
    await userModel.findOne({UserID:arr[i].Student_ID}).then(doc=>{

        FirstName = doc.FirstName
        LastName=  doc.LastName
        _id = i
        obj = {_id, LastName,FirstName}
        arr2[i] = obj
    })
   }
return res.send(arr2)
  })
  router.post('/:UserID', async (req,res)=>{
console.log(req.body.student.firstName)
student = {} ;
await userModel.findOne({FirstName:req.body.student.firstName, LastName:req.body.student.lastName }).then(doc=>{
   
     return student = doc

})
await advisorModel.findOne({Student_ID:student.UserID}).then(doc=>{
    if(doc!=null){
         advisorModel.findOneAndUpdate({Student_ID:student.UserID}, {Faculty_ID: req.body.Faculty_ID}).then(doc1=>{
            console.log(doc1)
        })
    }else{
         advisorModel.create({Student_ID:student.UserID ,Faculty_ID: req.body.Faculty_ID}).then(doc1=>{
            console.log(doc1)
        })
    }
})

  })


  router.delete('/', async (req,res)=>{
      student = []
      await userModel.findOne({FirstName: req.body.FirstName, LastName:req.body.LastName}).then(doc=>{
          student = doc
      })
  await advisorModel.findOneAndDelete({Student_ID:student.UserID}).then(doc=>{
      console.log(doc, ' was deleted')
  })
  })
module.exports = router