/**
 * AWS SES Email Utility
 * Sends emails using AWS SES SMTP
 */

import nodemailer from "nodemailer";

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Send an email
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text body
 * @param {string} options.html - HTML body (optional)
 * @returns {Promise} - Nodemailer send result
 */
export async function sendEmail({ to, subject, text, html }) {
  try {
    const info = await transporter.sendMail({
      from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
      to,
      subject,
      text,
      html: html || text, // Use HTML if provided, otherwise use text
    });

    console.log("Email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email send error:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

/**
 * Send a templated email
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.template - Template name
 * @param {Object} options.data - Template data
 * @returns {Promise} - Nodemailer send result
 */
export async function sendTemplatedEmail({ to, template, data }) {
  // You can add your email templates here
  const templates = {
    welcome: {
      subject: "Welcome to SquadLog!",
      html: `
        <h1>Welcome ${data.name}!</h1>
        <p>Thank you for joining SquadLog.</p>
      `,
    },
    resetPassword: {
      subject: "Reset Your Password",
      html: `
        <h1>Password Reset Request</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${data.resetLink}">Reset Password</a>
      `,
    },
    // Add more templates as needed
  };

  const selectedTemplate = templates[template];
  if (!selectedTemplate) {
    throw new Error(`Template "${template}" not found`);
  }

  return sendEmail({
    to,
    subject: selectedTemplate.subject,
    html: selectedTemplate.html,
  });
}

// Verify SMTP connection on startup (optional)
export async function verifyEmailConnection() {
  try {
    await transporter.verify();
    console.log("✅ SMTP server is ready to send emails");
    return true;
  } catch (error) {
    console.error("❌ SMTP connection failed:", error);
    return false;
  }
}
