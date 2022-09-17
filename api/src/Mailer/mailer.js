const nodemailer = require("nodemailer");
require("dotenv").config();
const { MAIL, PASSMAIL } = process.env;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: MAIL,
        pass: PASSMAIL
    },
});

module.exports = transporter;