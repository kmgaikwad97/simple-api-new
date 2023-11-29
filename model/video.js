const mongoose = require('mongoose')

const videoMax = new mongoose.Schema({
    name:{
        type:String
    },
    video:{
        type:String
    },
    subtitle:{
        type:String
    }
    
})

module.exports = mongoose.model('video',videoMax)