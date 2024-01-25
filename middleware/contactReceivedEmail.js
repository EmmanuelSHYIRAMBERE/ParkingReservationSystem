import nodemailer from "nodemailer";

export const contactReceivedEmail = (userEmail, userNames) => {
  let config = {
    service: "gmail",
    auth: {
      user: "aguramarket6@gmail.com",
      pass: "yeka vnvz fxhc rods",
    },
    tls: {
      rejectUnauthorized: false,
    },
  };
  let transporter = nodemailer.createTransport(config);

  let message = {
    from: "aguramarket6@gmail.com",
    to: userEmail,
    subject:
      "Thank you for connect with Smart Parking System - Your request Has Been Received.",
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Smart Parking System</title>
    <style>
      body {
        background-color: hsl(230, 19%, 81%); /* Light Gray */
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
      }
      .header {
        background-color: hsl(210, 100%, 76%); /* Blue */
        display: flex;
        align-items: center;
      }
      .header img {
        max-width: 200px;
        border-radius: 50%;
        height: auto;
        transition: all 0.3s ease-in-out; /* Add a smooth transition effect */
      }
      .header h1 {
        color: hsl(328, 100%, 59%); /* Dark Gray */
        font-size: 28px;
        font-weight: 700;
        margin: 0;
        text-align: center;
      }
      .content {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        margin-top: 20px;
        background-color: hsl(210, 60%, 98%); /* White */
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h2 {
        color: hsl(60, 100%, 25%); /* Dark Gray */
        font-size: 28px;
        margin: 0;
        padding-bottom: 10px;
        text-align: center;
      }
      p {
        color: hsl(0, 0%, 0%); /* Gray */
        font-size: 16px;
        margin: 0;
        text-align: left;
      }
      .button-container {
        text-align: center;
        margin-top: 20px;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: hsl(328, 100%, 59%); /* Blue */
        color: hsl(210, 60%, 98%); /* White */
        font-weight: bold;
        border-radius: 5px;
        text-decoration: none;
      }
      .button:hover {
        background-color: hsl(25, 100%, 50%); /* Darker Blue */
      }
      .footer {
        text-align: left;
        padding: 20px 5%;
        margin-top: 20px;
        font-size: 12px;
        color: hsl(0, 0%, 0%); /* Light Gray */
      }
      .header a {
        margin-left: 20px;
        padding: 10px;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <a href="#">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWtvKgAkMj_gzrRKUkaonxClNNp3evQwwdmPox9nDg&s"
          alt="Smart Parking System logo"
        />
      </a>
      <h1>Smart Parking System</h1>
    </div>
    <div class="content">
      <p>
        Dear ${
          userNames ? userNames.split(" ")[0] : "Valued Customer"
        },<br /><br />
      </p>
      <p>
        Thank you for reaching out to us regarding the Smart Parking System. We
        would like to express our sincere appreciation for your interest and
        feedback.<br />
        <br />
      </p>
      <p>
        Your message has been received, and we are committed to providing you
        with the best parking solutions available. At Smart Parking System, we
        prioritize customer satisfaction and strive to make your parking
        experience seamless and efficient.
      </p>
      <p>
        Please take a moment to explore the features and functionalities of our
        platform.<br /><br />
        If you have any questions or require assistance, feel free to reach out
        to us. We are here to ensure that your parking experience is not only
        efficient but also enjoyable.
      </p>
    </div>
    <div class="footer">
      <p>
        If you have any questions or require assistance, feel free to reach out
        to us. We are here to ensure that your parking experience is not only
        efficient but also enjoyable.<br /><br />
        Thank you for choosing Smart Parking System as your parking solution. We
        look forward to serving you and making your daily commute hassle-free.
      </p>
      <br /><br />
      <p>Best regards,</p>
    </div>
    <div></div>
  </body>
</html>

`,
  };

  transporter.sendMail(message);
};
