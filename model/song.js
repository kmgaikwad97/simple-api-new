const mongoose = require('mongoose')

const songVibe = new mongoose.Schema({
    name:{
        type:String
    },
    song:{
        type:String
    },
    artist:{
        type:String
    },
    photo:{
        type:String
    }
    
})

module.exports = mongoose.model('song',songVibe)