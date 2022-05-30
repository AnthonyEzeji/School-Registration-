const mongoose = require('mongoose')



const schema = mongoose.Schema( {
    HOLD_ID: String ,
    HOLD_NAME: String 
    })

const model = mongoose.model('HoldObj', schema);

module.exports = model;