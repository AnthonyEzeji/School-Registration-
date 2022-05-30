const mongoose = require('mongoose')



const schema = mongoose.Schema( {
    CRN: Number,
  CourseName: String,
  Student_ID:Number,
  RoomNumber:String ,
  ProfessorFirstName:String ,
  ProfessorLastName:String,
  StartTime:String ,
  EndTime:String,
  Day: String,
  Semester: String,
  Year:Number,
    })

const model = mongoose.model('ScheduleClass', schema);

module.exports = model;