const mongoose = require('mongoose')



const schema = mongoose.Schema( {
     Faculty_ID : Number,
     Student_ID : Number,
     Date_Assigned: Date
    })

const model = mongoose.model('Advisor', schema);

module.exports = model;