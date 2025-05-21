import { sendMail } from "../helper/sendMail.js"
import { token } from "../utils/token.js"
import { mailOptions } from "./nodemailer.js"
const verificationMail = (email) =>{
    mailOptions.to = email,
    mailOptions.subject = "VERIFICATION CODE"
    mailOptions.text = "This is the verification code for tyou email"
    mailOptions.html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Verification Code</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
    <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); overflow: hidden; border: 1px solid #e0e0e0;">
      <!-- Header -->
      <div style="background: linear-gradient(90deg, #6366f1, #4f46e5); color: #ffffff; padding: 25px 40px; text-align: center;">
        <h1 style="margin: 0; font-size: 26px;">Email Verification</h1>
        <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.9;">Secure your account with the code below</p>
      </div>

      <!-- Body -->
      <div style="padding: 30px 40px; text-align: center;">
        <p style="font-size: 16px; color: #333333; margin-bottom: 24px;">
          Hello 👋, thank you for joining us! Please enter the verification code below to complete your sign-up.
        </p>

        <!-- Verification Code Box -->
        <div style="display: inline-block; background-color: #eef2ff; color: #4f46e5; padding: 15px 30px; font-size: 28px; font-weight: bold; border-radius: 8px; letter-spacing: 4px; border: 1px solid #c7d2fe;">
          ${token}
        </div>

        <!-- Note -->
        <p style="font-size: 14px; color: #666666; margin-top: 30px;">
          This code is valid for <strong>30 minutes</strong>. If you did not request this, you can safely ignore this message.
        </p>
      </div>
    </div>
  </body>
</html>

`
    sendMail(mailOptions)
}

export {verificationMail}