import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASS || ''
    },
    tls: {
        ciphers: 'SSLv3'
    }
});

export const sendEmail = async (subject: string, text: string) => {
    const mailOptions = {
        from: process.env.EMAIL_USER || '',
        to: process.env.EMAIL_USER || '',
        subject: subject,
        text: text
    };

    try {
        await transporter.sendMail(mailOptions);
        console.info('>>> The email has been sent successfully.');
    } catch (error) {
        console.error('>>> Error sending the email: ', error);
    }
};
