const mongoose = require('mongoose')



const schema = mongoose.Schema( {
     Dept_ID :  String,
     Dept_Name :  String,
     Building_ID : String  ,
     Office_ID :  String,
     Chair :  String ,
     Phone_Number : String,
     Email : String
    })

const model = mongoose.model('Departments', schema);

module.exports = model;