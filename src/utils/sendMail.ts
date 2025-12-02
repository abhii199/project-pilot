import Mailgen from "mailgen"
import nodemailer from "nodemailer"
import { MailGenContent } from "../types/mail"

const sendMail = async (email: string, subject: string, mailGenContent: MailGenContent) => {
    const mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Project Manager',
            link: 'https://mailgen.js/'
        }
    })

    const emailText = mailGenerator.generatePlaintext(mailGenContent)
    const emailBody = mailGenerator.generate(mailGenContent)

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: Number(process.env.MAILTRAP_SMTP_PORT),
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS,
        }, 
    });

    const mailOptions = {
        from: '"Project Manager" <projectmanage.@example.com>', // sender address
        to: email,
        subject: subject,
        text: emailText, // plain‑text body
        html: emailBody, // HTML body
    }

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log("Email failed",error)
    }
}

const emailVerificationMailGenContent = (username: string, verifiactionUrl: string):MailGenContent => {
    return {
        body: {
            name: username,
            intro: 'Welcome to Project Manager! We\'re very excited to have you on board.',
            action: {
                instructions: 'To get started with our app, please click here:',
                button: {
                    color: '#22BC66',
                    text: 'Verify your account',
                    link: verifiactionUrl
                },
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
}

const forgotPasswordMailGenContent = (username: string, passwordResetUrl: string):MailGenContent => {
    return {
        body: {
            name: username,
            intro: 'We have recieved your request for Reset Password.',
            action: {
                instructions: 'To change you Password, please click here:',
                button: {
                    color: '#DC4D2F',
                    text: 'Reset your password',
                    link: passwordResetUrl
                },
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
}
