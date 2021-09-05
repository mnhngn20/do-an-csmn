const dotenv = require("dotenv");
dotenv.config();
const mailer = require('nodemailer');

module.exports.sendEmail = async (email, subject, text) => {
    try {
        const transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: subject,
            text: text,
        });

    } catch (err) {
        console.log(err)
    }
    

} 