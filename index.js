










const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors')

const app = express();
const PORT = 8080;

const recipientEmail = 'zubair8767844@gmail.com'; 
const mailHost = 'smtp.gmail.com'; 
const mailPort = 587; 
const mailUser = 'omair@chopdawg.com'; 
const mailPass = 'gawsecfqqbukkjqa'; 

const transporter = nodemailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false,
    auth: {
        user: mailUser,
        pass: mailPass,
    },
});

// middlewares
app.use(bodyParser.json());
app.use(cors())


app.post('/contact-us', (req, res) => {
    const { name, subject, email, message } = req.body;

    if(!name || !subject || !email || !message) {
        return res.status(400).send('Please provide all required fields: name, subject, email, and message.');
    }

    const mailOptions = {
        from: `"Contact Form" <${mailUser}>`,
        to: recipientEmail, 
        subject: `Contact Form Submission: ${subject}`, 
        text: `You have received a new message from the contact form.\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
            return res.status(500).send('Failed to send email.');
        }
        console.log('Message sent: %s', info.messageId);
        res.send('Application submitted successfully.');
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
