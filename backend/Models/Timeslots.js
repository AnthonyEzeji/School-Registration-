const mongoose = require('mongoose')




const schema = mongoose.Schema({
    Timeslot_ID: String,
    Day_ID: String,
    Period_ID: String
})

const model = mongoose.model('timeslots', schema);


module.exports = model;