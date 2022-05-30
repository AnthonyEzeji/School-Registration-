const mongoose = require('mongoose')




const schema = mongoose.Schema({UserID : Number,
    
    FirstName:String ,
    LastName: String,
    DOB: Date,
    DateCreated: Date,
    Street: String,
    Zip: Number,
    Country : String,
    State : String,
    City: String,
    UserType: String,
    Email: String,
    Password: String})

const model = mongoose.model('users', schema);


module.exports = model;