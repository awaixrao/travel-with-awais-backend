const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',  // Or any other service you use
    auth: {
        user: "tarvelwithawais@gmail.com",  
        pass: "gudj csfj hnxw ztvl" ,  
    },
});

const sendEmail = async (to, subject, text, html) => {
    const mailOptions = {
        from: "tarvelwithawais@gmail.com", 
        to,
        subject,
        text,
        html,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = {
    sendEmail,
};
