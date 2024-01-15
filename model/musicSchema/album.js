const mongoose = require('mongoose')

const artistModel = new mongoose.Schema({
    name:{
        type:String
    },
    song:[{
        type:mongoose.Schema.Types.ObjectId,
        reference:'spotify'
    }],
    
    // album:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     reference:'album'
    // }
    
})

module.exports = mongoose.model('artist',artistModel)