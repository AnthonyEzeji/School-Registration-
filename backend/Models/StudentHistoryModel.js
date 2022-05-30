const mongoose = require('mongoose')




const schema = mongoose.Schema({UserID : Number,
    Student_ID: Number,
  CRN: Number,
  Grade: String,
  Semester_Year: String
})

const model = mongoose.model('Student History', schema);


module.exports = model;