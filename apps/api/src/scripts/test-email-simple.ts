import { EmailService } from '../common/services/email.service';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv'; // We might need to install this or fallback to manual parsing if not present

// Simple env parser using fs if dotenv is missing
function loadEnv() {
  const envPath = path.resolve(__dirname, '../../.env');
  if (fs.existsSync(envPath)) {
    console.log('Loading .env from', envPath);
    const envConfig = fs.readFileSync(envPath, 'utf-8');
    envConfig.split('\n').forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        process.env[key.trim()] = value.trim();
      }
    });
  } else {
    console.warn('.env file not found at', envPath);
  }
}

async function testEmail() {
  loadEnv();
  
  // Verify critical env vars
  console.log('SMTP_HOST:', process.env.SMTP_HOST);
  console.log('SMTP_USER:', process.env.SMTP_USER);

  const emailService = new EmailService();
  const targetEmail = 'mdsamsuddohasajeeb@yahoo.com';
  const testOtp = '123456';

  console.log(`Sending test OTP email to ${targetEmail}...`);
  
  try {
    await emailService.sendOtpEmail(targetEmail, testOtp);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}

testEmail();
