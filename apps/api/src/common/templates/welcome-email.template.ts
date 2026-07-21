
export const getWelcomeEmailTemplate = (
  employeeName: string,
  email: string,
  loginUrl: string,
  fromEmail: string,
) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to SquadLog</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        .header { background-color: #000000; color: #ffffff; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 1px; }
        .content { padding: 40px 30px; }
        .welcome-message { font-size: 18px; margin-bottom: 20px; color: #1a1a1a; }
        .detail-row { margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
        .detail-label { font-weight: 600; color: #666; font-size: 14px; display: block; margin-bottom: 5px; }
        .detail-value { color: #333; font-size: 16px; font-weight: 500; }
        .cta-button { display: inline-block; background-color: #000000; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 600; margin-top: 20px; text-align: center; }
        .footer { background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #eee; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to SquadLog</h1>
        </div>
        <div class="content">
          <p class="welcome-message">Hello <strong>${employeeName}</strong>,</p>
          <p>We are excited to have you on board! Your account has been successfully created.</p>
          
          <div style="background-color: #f8f9fa; border-left: 4px solid #000; padding: 15px; margin: 25px 0;">
            <p style="margin: 0; font-weight: bold;">Your Login Details:</p>
            <p style="margin: 10px 0 5px 0;">Email: <strong>${email}</strong></p>
            <p style="margin: 0; font-size: 14px; color: #666;">(Please contact your administrator for your initial password)</p>
          </div>

          <p>You can verify your profile details and start managing your tasks by logging into your dashboard.</p>
          
          <div style="text-align: center;">
            <a href="${loginUrl}" class="cta-button" style="color: #ffffff;">Login to Dashboard</a>
          </div>
        </div>
        <div class="footer">
          <p>This is an automated message. Please do not reply to this email.</p>
          <p>&copy; ${new Date().getFullYear()} SquadLog. All rights reserved.</p>
          <p>Sent from: ${fromEmail}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
