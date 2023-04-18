const mongoose = require('mongoose');

const SearchSchema = new mongoose.Schema({
    fromDate:{
        type:Date,
        required:false
    },
    toDate:{
        type:Date,
        required:false
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    }
},
{ timestamps: true })

module.exports = mongoose.model('Search', SearchSchema)