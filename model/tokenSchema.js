const mongoose = require('mongoose')
// const Joi = require('joi')



const tokenSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    token:{
        type:String,
        required:true
    },
})

module.exports = mongoose.model('token',tokenSchema)
// const User = mongoose.model('User',userSchema)


// function validate(User){
//     console.log("User ::",User);
//     const schema = Joi.object({
//         name:Joi.string().required(),
//         email:Joi.string().email.required()
//     })
//     return schema.validate(user)
// }

// module.exports = { User,validate}
