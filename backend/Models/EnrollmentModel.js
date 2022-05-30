const mongoose = require('mongoose')



const schema = mongoose.Schema( {CRN: Number, Grade:String, Semester:String,Year:Number, Student_ID: Number, StartTime :String, Day: String
    })

const model = mongoose.model('enrollments', schema);

module.exports = model;