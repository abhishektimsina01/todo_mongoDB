import { sendMail } from "../helper/sendMail.js"
import { mailOptions } from "./nodemailer.js"
const LogInWelcomeMail = (name, email) =>{
    mailOptions.to = email
    mailOptions.subject = "Logged In "
    mailOptions.text = "Welcome to my APP"
    mailOptions.html = `<h1>Logged In</h1><h1><b>${name}</b></h1><h1>Thank you for logging in.</h1>`
    sendMail(mailOptions)
}

export {LogInWelcomeMail}