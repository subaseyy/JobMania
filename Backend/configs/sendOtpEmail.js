const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
   host: 'nova.mysecurecloudserver.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendOtpEmail = async (email, otp) => {
  await transporter.sendMail({
    from: `"JobMania" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify your JobMania account',
    html: `<p>Your OTP is: <strong>${otp}</strong>. It expires in 10 minutes.</p>`,
  });


};
