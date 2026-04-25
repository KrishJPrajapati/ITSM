import nodemailer from "nodemailer";

export const sendTicketOTPEmail = async (toEmail, otp, ticket_id) => {
  try {
    // console.log(process.env.EMAIL_USER);
// console.log(process.env.EMAIL_PASS);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: "Ticket Closing OTP",
      text: `Your OTP for closing Ticket ${ticket_id} is ${otp}. This OTP is valid for 5 minutes.`
    };

    await transporter.sendMail(mailOptions);

    console.log("OTP Email sent successfully");
  } catch (error) {
    console.log("Email Error:", error);
  }
};