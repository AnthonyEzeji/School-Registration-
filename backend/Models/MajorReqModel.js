const mongoose = require('mongoose')


const date = Date.UTC()
const schema = mongoose.Schema( {
    Major_ID: String,
    CRS_ID: String
  
    })

const model = mongoose.model('majors requirements', schema);

module.exports = model;