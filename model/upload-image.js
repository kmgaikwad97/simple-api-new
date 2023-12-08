const mongoose = require('mongoose')

const uploadImg = new mongoose.Schema({
    name:{
        type:String
    },
    image:{
        type:String
    }
    
})

module.exports = mongoose.model('uploadImage',uploadImg)