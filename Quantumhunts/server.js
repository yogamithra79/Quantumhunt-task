const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Mock SQL Database
const database = [];

// Survey data endpoint
app.post("/save-survey", (req, res) => {
  const surveyData = req.body;
  database.push(surveyData);
  res.status(200).send("Survey data saved successfully.");
});

// Email sending endpoint (Mocked for example)
app.post("/send-email", (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com",
      pass: "your-email-password"
    }
  });

  const mailOptions = {
    from: "your-email@gmail.com",
    to: "recipient-email@example.com",
    subject: "Survey Completion",
    text: "Thank you for completing the survey!"
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error sending email: " + error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  res.status(200).send("Completion email sent successfully.");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
