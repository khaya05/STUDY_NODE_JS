// eslint-disable-next-line import/no-extraneous-dependencies
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1. create a transporter
  const { EMAIL_HOST, EMAIL_PORT, EMAIL_USERNAME, EMAIL_PASSWORD } =
    process.env;

  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD,
    },
  });

  // 2. define email options
  const { email, subject, message } = options;
  const mailOptions = {
    from: 'Khaya Mnyandu <khaya@email.com>',
    to: email,
    subject,
    text:message,
  };

  // 3. send email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
