const mongoose = require('mongoose')



const schema = mongoose.Schema( {CRN: Number,
    Section: Number,
    CourseID: Number,
    CourseName: String,
    DepartmentName: String,
    Day: String,
    StartTime: String,
    EndTime: String,
    Semester : String,
    Year : Number,
    Building: String,
    RoomNumber: String,
    ProfessorFirstName: String,
    ProfessorLastName: String,
    AvailableSeats: Number,
    TotalSeats: Number })

const model = mongoose.model('masterschedule', schema);

module.exports = model;