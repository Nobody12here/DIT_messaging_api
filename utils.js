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
export function sendMembersipMail(to){
    const membershipTransporter = nodemailer.createTransport({
        service:'smtp',
        
        host:'send.smtp.com',
        port:587,
        auth:{
            user:"prepaidcard@diora.social",
            pass:"DIORA2026!?."
        }
    })
    const mailOptions = {
        from: "uraja01616@gmail.com",
        to: to,
        subject: "💎 Thank You for Your Order — Your Virtual Mastercard Voucher",
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Order Confirmation</title>
            </head>
            <body style="margin: 0; padding: 0; background-color: #f4f7fc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f4f7fc;">
                    <tr>
                        <td style="padding: 40px 20px;">
                            <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
                                <!-- Header -->
                                <tr>
                                    <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
                                            💎 Order Confirmed!
                                        </h1>
                                        <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 16px;">
                                            Your Virtual Mastercard Voucher
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Content -->
                                <tr>
                                    <td style="padding: 40px 30px;">
                                        <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                                            Thank you for your order of a voucher for a <strong>Prepaid Virtual Mastercard</strong>.
                                        </p>
                                        
                                        <div style="background-color: #f8f9ff; border-left: 4px solid #667eea; padding: 20px; margin: 25px 0; border-radius: 4px;">
                                            <p style="margin: 0; color: #555555; font-size: 15px; line-height: 1.6;">
                                                ✅ Your order has been received and is now being processed.
                                            </p>
                                        </div>
                                        
                                        <h2 style="margin: 30px 0 15px 0; color: #333333; font-size: 20px; font-weight: 600;">
                                            What Happens Next?
                                        </h2>
                                        
                                        <table role="presentation" style="width: 100%; margin: 20px 0;">
                                            <tr>
                                                <td style="padding: 15px; background-color: #fafbff; border-radius: 8px; margin-bottom: 10px;">
                                                    <p style="margin: 0; color: #555555; font-size: 15px; line-height: 1.6;">
                                                        <strong style="color: #667eea;">1. Payment Confirmation</strong><br>
                                                        <span style="color: #666666;">We'll verify your payment details</span>
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr><td style="height: 10px;"></td></tr>
                                            <tr>
                                                <td style="padding: 15px; background-color: #fafbff; border-radius: 8px;">
                                                    <p style="margin: 0; color: #555555; font-size: 15px; line-height: 1.6;">
                                                        <strong style="color: #667eea;">2. Voucher PIN Delivery</strong><br>
                                                        <span style="color: #666666;">Your PIN Code will be sent to this email address</span>
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr><td style="height: 10px;"></td></tr>
                                            <tr>
                                                <td style="padding: 15px; background-color: #fafbff; border-radius: 8px;">
                                                    <p style="margin: 0; color: #555555; font-size: 15px; line-height: 1.6;">
                                                        <strong style="color: #667eea;">3. Instant Redemption</strong><br>
                                                        <span style="color: #666666;">Redeem for your Virtual Prepaid Mastercard</span>
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <div style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); padding: 20px; margin: 30px 0; border-radius: 8px; text-align: center;">
                                            <p style="margin: 0; color: #333333; font-size: 15px; line-height: 1.6;">
                                                🌍 <strong>Ready for Worldwide Use</strong><br>
                                                <span style="font-size: 14px; color: #555555;">Use online, in apps, or by phone - anywhere Mastercard is accepted</span>
                                            </p>
                                        </div>
                                        
                                        <p style="margin: 25px 0 0 0; color: #666666; font-size: 15px; line-height: 1.6;">
                                            We'll notify you as soon as your voucher is ready.
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Footer -->
                                <tr>
                                    <td style="background-color: #f8f9ff; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                                        <p style="margin: 0 0 10px 0; color: #333333; font-size: 16px; font-weight: 600;">
                                            Best regards,
                                        </p>
                                        <a href="https://www.diora.social" style="display: inline-block; margin: 10px 0; padding: 12px 30px; background-color: #667eea; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px;">
                                            Visit diora.social
                                        </a>
                                        <p style="margin: 20px 0 0 0; color: #999999; font-size: 13px;">
                                            © 2025 Diora Social. All rights reserved.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Email Footer -->
                            <table role="presentation" style="max-width: 600px; margin: 20px auto 0;">
                                <tr>
                                    <td style="text-align: center; padding: 20px;">
                                        <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.5;">
                                            You received this email because you placed an order for a Virtual Mastercard Voucher.<br>
                                            If you have any questions, please contact our support team.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        `
    }
    membershipTransporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)

        }
        else {
            console.log(info)
        }
    })

}

sendMembersipMail("uraja01212@gmail.com")