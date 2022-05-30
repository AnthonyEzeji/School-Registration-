const mongoose = require('mongoose')


const date = Date.UTC()
const schema = mongoose.Schema( {
    Student_ID:Number,

    HOLD_TYPE:String,
    HOLD_ID:String,
    
  
    })

const model = mongoose.model('Holds', schema);

module.exports = model;