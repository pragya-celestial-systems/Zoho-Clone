import nodemailer from 'nodemailer';
import { config } from 'dotenv';
config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
    },
    debug: true
});

export async function sendMail(receiver_mail: string, name: string) {
    try {
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: receiver_mail,
            subject: "Account created successfully.",
            text: `Hello ${name},\n Welcome to Zoho! Your registration is successful.\n \n Warm Regards, \n Team Zoho`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error("Error sending email:", err);
            }
            
            console.log("Email sent successfully:", info.response);
        });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }