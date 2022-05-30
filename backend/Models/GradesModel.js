const mongoose = require('mongoose')



const schema = mongoose.Schema( {
    CRN: Number,
    Student_ID:Number,
    Grade:String,

    })

const model = mongoose.model('Grades', schema);

module.exports = model;