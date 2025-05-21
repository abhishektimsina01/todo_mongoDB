import { transporter} from "../mail/nodemailer.js";

const sendMail = (mailOptions) => {
    transporter.sendMail(mailOptions, (err, info)  => {
        if(err){
            console.log(err)
        }
        else{
            console.log("Email sent", info.response)
        }
    })
}

export {sendMail}