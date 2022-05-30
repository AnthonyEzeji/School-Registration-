const mongoose = require('mongoose')


const date = Date.UTC()
const schema = mongoose.Schema( {
    Major_ID:String,
    Dept_ID: String,
    Dept_Name: String,
    Major_Name: String,
    Min_Grade_Required: String,
    Credits_Required: Number
  
    })

const model = mongoose.model('majors', schema);

module.exports = model;