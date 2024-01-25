import nodemailer from "nodemailer";

export const sendEmail = async (option) => {
  //Create a transporter

  const transporter = nodemailer.createTransport({
    host: process.env.Email_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  //Define email options

  const emailOptions = {
    from: "HolidayPlanner-support <support@holidayplanners.com>",
    to: option.email,
    subject: option.subject,
    text: option.message,
  };

  await transporter.sendMail(emailOptions);
};
