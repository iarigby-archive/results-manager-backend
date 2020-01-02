const nodemailer = require('nodemailer')
require('dotenv').config()

const email = process.env.GMAIL_ID
const pass = process.env.GMAIL_PASS

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: pass
    }
});

module.exports.sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: email,
        to: to,
        subject: subject,
        text: text
    };
    console.log(mailOptions)
        // transporter.sendMail(mailOptions, function(error, info) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log('Email sent: ' + info.response);
        //     }
        // });

}