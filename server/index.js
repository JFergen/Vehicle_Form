require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

// Setup email credentials based on environment
// Local/QA = create email
// Prod - Certified autoplex email?

const emailUser = process.env.EMAIL_USER
const emailPassword = process.env.EMAIL_PASSWORD

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: emailUser,
    pass: emailPassword,
  },
});

app.post('/send-email', (req, res) => {
  const { ownerName, carModel, carYear, email } = req.body;

  const mailOptions = {
    from: emailUser,
    to: email,
    subject: 'Car Information',
    text: `Owner Name: ${ownerName}\nCar Model: ${carModel}\nCar Year: ${carYear}\nVIN/License Plate: ${identifier}\nEmail: ${email}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
