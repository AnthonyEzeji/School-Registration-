const express = require('express')
const userModel = require('../Models/UserModel')
const mongoose = require('mongoose')
const session = require('express-session')



const router = express.Router()



router.post('/',async (req,res)=>{
 
    try{
        console.log(req.body)
        const userToFind = await userModel.findOne({Email:req.body.Email}).then((doc)=>{
           
            if(doc){
                 
            if(req.body.Password==doc.Password){
              
                
                req.session.isAuth = true
                req.session.userType = doc.UserType
                req.session.user = doc
               return  res.json(req.session)
                
               
              
                
                

                
                
            }
            else{
                res.sendStatus(404)
            }

            }
           

        })

    }catch(err){
        res.sendStatus(404)
        console.log(err)
    }
  
   
   
}
)
module.exports = router
