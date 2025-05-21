import nodemailer from "nodemailer"

// Create a transporter
let transporter = nodemailer.createTransport({
    secure : true,
    port : 465,
    host : "smtp.gmail.com",
  service: 'gmail',
  auth: {
    user: 'timsinaabhishek1@gmail.com', 
    pass: 'sfjmshdygdceomgj' // Use App Password if 2FA is enabled
  }
});

// Email options
let mailOptions = {
  from: 'timsinaabhishek1@gmail.com',
  to: "",
  subject: 'Hello',
  text: 'This is a email for you~',
  html: '<h1>This is a email</h1><p>from <h1><b>Abhishek</b></h1></p>'
};

export {transporter, mailOptions}