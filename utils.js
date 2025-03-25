import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'uraja01616@gmail.com',
        pass: process.env.GMAIL_APP_KEY
    }
})


export function sendMail(from, email) {
    const mailOptions = {
        from: "uraja01313@gmail.com",
        to: "info@diamondinternationalenterprises.com",
        subject: "DIT Preslae Information",
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #0056b3;">New Contact Request</h2>
                <p><strong>From:</strong> ${from}</p>
                <p><strong>Message:</strong></p>
                <p style="background: #f4f4f4; padding: 10px; border-radius: 5px;">${email}</p>
                <hr>
                <p style="font-size: 12px; color: #777;">This email was sent via the contact form.</p>
            </div>
        `
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)

        }
        else {
            console.log(info)
        }
    })
}
sendMail("muhammad.auzair123@gmail.com","This is a test email")