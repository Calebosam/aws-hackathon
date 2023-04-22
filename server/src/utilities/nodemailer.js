const nodemailer = require('nodemailer');
const { EMAIL_SMTP, SMTP_PORT, CLIENT_PORT, EMAIL_ADDRESS, EMAIL_PASSWORD } = require('../constants');

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
    await transport.sendMail({
        from: `Lizo File Server <${EMAIL_ADDRESS}>`,
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a target="_blank" href=http://localhost:8000/api/verify-email/${confirmationCode}> Click here</a>
        </div>`,
    }).catch(err => console.log(err));
}

exports.sendFileUtility = async (name, email, attachment, fileTitle) => {
    await transport.sendMail({
        from: `Lizo File Server <${EMAIL_ADDRESS}>`,
        to: email,
        subject: fileTitle,
        html: `<h1>${name} shared this file with you.</h1>
        <h2>Hi there,</h2>
        <p>You have received a file from <a target="_blank" href="http://localhost:${CLIENT_PORT}">Lizo File Server</a>. </p>
        </div>`,
        attachments: [attachment]
    }).catch(err => console.log(err));
}