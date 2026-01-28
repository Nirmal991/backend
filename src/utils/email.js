import { createTransport } from "nodemailer";
import {
    NAME,
    SMTP_HOST,
    SMTP_PASS,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
} from '../constants.js';

export const transport = createTransport({
    service: 'gmail',
    host: SMTP_HOST,
    secure: SMTP_SECURE,
    port: SMTP_PORT,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
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