// const nodemailer = require('nodemailer')

// const sendEmail = async(email,subject,test)=>{
//     try{
//         const transporter = nodemailer.createTransport({
//             host:process.env.HOST,
//             service:process.env.SERVICE,
//             port:587,
//             secure:true,
//             auth:{
//                 user:process.env.USER,
//                 user:process.env.PASS,
//             }
//         })

//         await transporter.sendEmail({
//             from:process.env.USER,
//             to:email,
//             subject:subject,
//             text:text
//         })
//         console.log("Email Sent Successfully.");

//     }catch(err){
//         console.log("Err in Email.");
//     }
// }