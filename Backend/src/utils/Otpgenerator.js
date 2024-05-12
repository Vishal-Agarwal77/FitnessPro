import nodemailer from 'nodemailer'

const generatetOtp = () => {
    let otp = ''
    for (let i = 0; i <= 3; i++) {
        const randomVal = Math.round(Math.random() * 9)
        otp += randomVal
    }
    return otp;
}

const mailTransport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.MAIL_TRAP_USERNAME,
        pass: process.env.MAIL_TRAP_PASSWORD
    }
});


export { generatetOtp, mailTransport };