const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    country:{
        type:'string'
    },
    fullname:{
        type:'string'
    },
    mobile:{
        type:'string'
    },
    pincode:{
        type:'string'
    },
    flat:{
        type:'string'
    },
    area:{
        type:'string'
    },
    landmark:{
        type:'string'
    },
    city:{
        type:'string'
    },
    state:{
        type:'string'
    },
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
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

module.exports = mongoose.model('Address',userSchema)

