const nodemailer = require('nodemailer');
const { EMAIL_SMTP, SMTP_PORT, EMAIL_ADDRESS, EMAIL_PASSWORD } = require('../constants');

const transport = nodemailer.createTransport({
    pool: true,
    host: EMAIL_SMTP,
    port: SMTP_PORT,
    secure: true, // use TLS
    auth: {
        user: EMAIL_ADDRESS,
        pass: EMAIL_PASSWORD,
    },
})

exports.sendEmailConfirmation = async (name, email, confirmationCode) => {
    console.log("Check");
    await transport.sendMail({
        from: `Lizo File Server <${EMAIL_ADDRESS}>`,
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:8000/verify-email/${confirmationCode}> Click here</a>
        </div>`,
    }).catch(err => console.log(err));
}