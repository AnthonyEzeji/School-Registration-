const mongoose = require('mongoose')




const schema = mongoose.Schema({
    Major_ID:String ,
    STUDENT_ID:Number ,
    Date_Declared:String 
})

const model = mongoose.model('student majors', schema);


module.exports = model;