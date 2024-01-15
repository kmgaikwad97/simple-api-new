const mongoose = require('mongoose')

const spotifyModel = new mongoose.Schema({
    name:{
        type:String
    },
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'artist'
    },
    album:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'album'
    }
    
})

module.exports = mongoose.model('spotify',spotifyModel)