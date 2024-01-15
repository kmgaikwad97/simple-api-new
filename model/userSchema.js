const mongoose = require('mongoose')
// const Joi = require('joi')



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
    verified:{
        type:'Boolean',
        default:false
    },
    tc:{type:Boolean},
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
    address:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
    token:{type:'string'},
    orderAddress:{type:'string'},
    recent:[{}]
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

// module.exports = mongoose.model('User',userSchema)
const User = mongoose.model('User',userSchema)


// function validate(User){
//     console.log("User ::",User);
//     const schema = Joi.object({
//         name:Joi.string().required(),
//         email:Joi.string().email.required()
//     })
//     return schema.validate(user)
// }

module.exports =  User 
