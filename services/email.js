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


module.exports.sendEmail = (to, subject, text, callback) => {
    const mailOptions = {
        from: email,
        to: to,
        subject: subject,
        text: text
    };
    console.log('sending email to ', to, subject)
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            if (info.response.Error) {
                console.log('error while sending email to', to, info.response)
            }
            else {
                console.log('Email sent to: ' + to + '\n' + info.response);
                callback()
            }
        }
    })

}