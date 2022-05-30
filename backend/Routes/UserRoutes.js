const express = require('express')
const userModel = require('../Models/UserModel.js')
const mongoose = require('mongoose')
const math= Math

const router = express.Router()

router.delete('/',async (req,res)=>{
   console.log(req.body.selectionModel)
   const usersToDelete = req.body.selectionModel
    try{
      for(var i = 0; i < usersToDelete.length; i++){
const deletedUser = await userModel.findByIdAndDelete(usersToDelete[i]).then(doc=>{
    console.log(doc)
})

      }
      
    }
    catch(err){
        
    }
}
)



router.get('/:ID', async(req,res)=>{
    if(req.params){
        console.log('request for user:'+ req.params.ID)
        try{
            
            const userToFind = await userModel.findById(req.params.ID).then(doc=>{
                console.log(req.boy)
               return res.json(doc)
               
               
            
            })
    
        }catch(err){
           return  res.send({message:err})
        

    }
   }
  
    
    
})
router.get('/userpage/:UserID', async(req,res)=>{
    await userModel.findOne({UserID:req.params.UserID}).then(doc=>{
        console.log(doc)
        return res.send(doc)
    })

  
    
    
})



router.get('/', async(req,res)=>{
    console.log('request for all users')
    try{
       const users = await userModel.find({}).then(doc=>{
           res.json(doc)
           
           
       })
    }catch(err){
        res.send({message:err})
        console.log(err)
    }
})
router.post('/', async(req,res)=>{
    console.log('request to create new user')
    console.log(req.body)
    try{
       
            
                const newUser = userModel.create({UserID : "7000"+ (Math.floor(Math.random() * 90000) + 10000).toString() ,
    
                    FirstName:req.body.newUser.FirstName ,
                    LastName: req.body.newUser.LastName,
                    DOB: null,
                    DateCreated: Date.now(),
                    Street: '',
                    Zip: 123,
                    Country : '',
                    State : '',
                    City: '' ,
                    UserType: req.body.newUser.UserType,
                    Email: req.body.newUser.FirstName[0]+req.body.newUser.LastName+'@mu.edu',
                    Password: ''}).then(doc =>{
                    console.log(doc)
                })
               res.send(newUser)
     
        
    }catch(err){
        console.log(err)
        
    }
})
router.patch('/:UserID', async(req,res)=>{
    console.log(req.body)
    
    await userModel.findOneAndUpdate({UserID:req.params.UserID},{Password:req.body.Password, Email:req.body.Email,UserType:req.body.UserType}).then(doc=>{
        console.log(doc)
        return res.send(doc)
    })

  
    
    
})


module.exports = router