import { createTransport } from "nodemailer";


export const transport = createTransport({
    service: 'gmail',
    host: process.env.SMTP_HOST,
    secure: process.env.SMTP_SECURE,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
})

export const sendmail = async (to, subject, html) => {
    try {
        await transport.sendMail({
            to,
            html,
            subject: `${subject} - ${NAME}`,
        })
    } catch (error) {
        console.error('Email Lib Send:-', error)
        throw error
    }
}