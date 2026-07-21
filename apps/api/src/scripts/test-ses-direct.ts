
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import * as dotenv from 'dotenv';

// Load env vars
dotenv.config();

async function sendTestEmail() {
  const region = "ap-south-1"; // Explicitly match CLI config
  const from = process.env.SMTP_FROM || "support@squadlog.studio"; // Fallback if env missing
  const to = "mdsamsuddohasajeeb@yahoo.com";

  console.log(`Configuring SESv2 Client for region: ${region}`);
  console.log(`Using Default Credential Provider Chain (AWS CLI config)`);
  console.log(`From: ${from}, To: ${to}`);

  // No explicit credentials - SDK will find them in ~/.aws/credentials
  const client = new SESv2Client({
    region,
  });

  const command = new SendEmailCommand({
    FromEmailAddress: from,
    Destination: {
      ToAddresses: [to],
    },
    Content: {
      Simple: {
        Subject: {
          Data: "Test Email from AWS SDK v2 (CLI Credentials)",
          Charset: "UTF-8",
        },
        Body: {
          Text: {
            Data: "This is a test email sent using your AWS CLI credentials. Your .env credentials appear to be invalid, but your CLI access is working.",
            Charset: "UTF-8",
          },
        },
      },
    },
  });

  try {
    console.log("Sending email...");
    const response = await client.send(command);
    console.log("Email sent successfully!");
    console.log("Message ID:", response.MessageId);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}

sendTestEmail();
