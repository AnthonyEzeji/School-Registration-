const mongoose = require('mongoose')



const schema = mongoose.Schema( {
     CRN : Number,
     Student_ID : Number,
     Present:Number,
     Absent:Number,
     Date_Assigned: Date
    })

const model = mongoose.model('Attendance', schema);

module.exports = model;