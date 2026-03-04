const nodemailer = require("nodemailer");


const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
<<<<<<< HEAD
        pass: process.env.EMAIL_PASS
    }
=======
        pass: process.env.EMAIL_PASS,
    },
    family: 4
>>>>>>> 4d56e9a9a721f6e279fb563d5eeaddb9ecee0e1f
});

module.exports.transport = transport;