import nodemailer from 'nodemailer';

/**
 * Send email using nodemailer
 * @param {Object} options - Email options
 * @param {String} options.to - Recipient email
 * @param {String} options.subject - Email subject
 * @param {String} options.text - Plain text email content
 * @param {String} options.html - HTML email content
 */
export const sendEmail = async (options) => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'mail.spacemail.com',
    port: process.env.EMAIL_PORT || 465,
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  
  // Define email options
  const mailOptions = {
    from: `Elavat Rehabilitation Center <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html
  };
  
  // Send email
  await transporter.sendMail(mailOptions);
};