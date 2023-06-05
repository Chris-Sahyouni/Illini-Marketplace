import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    auth: {
        user: "no-reply@illinimarketplace.com",
        pass: process.env.EMAIL_PASS
    }
});


