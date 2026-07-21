import { sendEmail } from '@/lib/email';

/**
 * Example API Route: Send Email
 * POST /api/send-email
 * 
 * Body:
 * {
 *   "to": "recipient@example.com",
 *   "subject": "Test Email",
 *   "text": "This is a test email",
 *   "html": "<h1>This is a test email</h1>" // optional
 * }
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { to, subject, text, html } = body;

    // Validate required fields
    if (!to || !subject || !text) {
      return Response.json(
        { error: 'Missing required fields: to, subject, text' },
        { status: 400 }
      );
    }

    // Send email
    const result = await sendEmail({ to, subject, text, html });

    return Response.json({
      success: true,
      message: 'Email sent successfully',
      messageId: result.messageId,
    });
  } catch (error) {
    console.error('Email API error:', error);
    return Response.json(
      { error: error.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}
