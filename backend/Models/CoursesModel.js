const mongoose = require('mongoose')



const schema = mongoose.Schema( {
    Course_ID: Number,
    Course_Name: String,
    Course_Credit: Number,
    Major: String,
    Department_Name: String,
    Dept_ID: String})

const model = mongoose.model('Courses', schema);

module.exports = model;