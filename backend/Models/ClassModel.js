const mongoose = require('mongoose')



const schema = mongoose.Schema( {
    CRN: Number,
  Course_ID: Number,
  Class_Section: Number,
  Room_ID:String ,
  Faculty_ID: Number ,
  Timeslot_ID:String ,
  Semester_Year: String
    })

const model = mongoose.model('Classes', schema);

module.exports = model;