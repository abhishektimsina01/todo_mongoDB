import { sendMail } from "../helper/sendMail.js";
import { mailOptions } from "./nodemailer.js";
const DueTimeMail = (mail,name, title, dueTime, AdminMail = "timsinaabhishek1@gmail.com") =>{
    mailOptions.to = mail
    mailOptions.subject = `⏰ Upcoming Deadline: ${title} Due Soon`
    mailOptions.html = `<body style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 30px;">
    <h2 style="color: #1a73e8;">⏰ Task Reminder</h2>
    <p>Hi <strong>${name}</strong>,</p>
    <p>This is a quick reminder that your task <strong>\"${title}\"</strong> is approaching its due time.</p>
    <p style="font-size: 16px; background-color: #f1f8ff; padding: 10px 15px; border-left: 4px solid #1a73e8; border-radius: 5px;">
      📅 <strong>Due Time:</strong> ${dueTime}
    </p>
    <p>Please make sure to complete it on time. If you need more time, you can reschedule or update the task accordingly.</p>
    <p style="margin-top: 30px;">Stay on track and keep crushing your goals! 🚀</p>
    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
    <p style="font-size: 14px; color: #777;">
      Best regards,<br />
      <strong>Abhishek Timsina</strong><br />
      <a href="mailto:${AdminMail}" style="color: #1a73e8;">${AdminMail}</a>
    </p>
  </div>
</body>`
    sendMail(mailOptions)
}

export {DueTimeMail}

