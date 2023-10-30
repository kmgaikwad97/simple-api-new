const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type:'string'
    },
    password:{
        type:'string'
    },
    name:{
        type:'string'
    },
    tc:{type:Boolean},
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }]
    // password_confirmation:{type:String,required:true,trim:true},
    // phone:{  
    //     type:'string'
    // },
    // age:{
    //     type:'string'
    // },
    // profile:{
    //     type:'string'
    // },
    // address:{
    //     type:'string'
    // }
})

module.exports = mongoose.model('User',userSchema)