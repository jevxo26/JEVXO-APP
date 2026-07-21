import { Injectable, Logger } from '@nestjs/common';
import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';
import { getServiceRequestConfirmationTemplate } from '../templates/service-request-confirmation.template';
import { getScheduleAssignmentTemplate } from '../templates/schedule-assignment.template';
import { getTaskAssignmentTemplate } from '../templates/task-assignment.template';
import { getOrderConfirmationTemplate } from '../templates/order-confirmation.template';
import { getLeaveApprovalTemplate } from '../templates/leave-approval.template';
import { getLeaveRejectionTemplate } from '../templates/leave-rejection.template';
import { getDocumentEmailTemplate } from '../templates/document-email.template';
import { getMeetingInvitationTemplate } from '../templates/meeting-invitation.template';
import { getWelcomeEmailTemplate } from '../templates/welcome-email.template';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private sesClient: SESv2Client | null = null;
  private readonly emailConfig = {
    accessKeyId: process.env.SMTP_USER || '',
    secretAccessKey: process.env.SMTP_PASS || '',
    region: process.env.AWS_REGION || 'ap-south-1',
    from: process.env.SMTP_FROM || '',
  };

  constructor() {
    const hasCredentials = this.emailConfig.accessKeyId && this.emailConfig.secretAccessKey;
    
    if (!hasCredentials) {
      this.logger.warn(
        'AWS SES credentials not configured. Email service will be disabled. ' +
        'Set SMTP_USER and SMTP_PASS environment variables to enable email functionality.'
      );
      return;
    }

    // Use AWS SES API (HTTPS) instead of SMTP to bypass Railway port restrictions
    this.sesClient = new SESv2Client({
      region: this.emailConfig.region,
      credentials: {
        accessKeyId: this.emailConfig.accessKeyId,
        secretAccessKey: this.emailConfig.secretAccessKey,
      },
    });
    
    this.logger.log('Email service initialized with AWS SES API');
  }

  private async sendEmail(to: string, subject: string, html: string): Promise<void> {
    if (!this.sesClient) {
      this.logger.warn(`Email would be sent to ${to}: ${subject}`);
      return;
    }

    try {
      const command = new SendEmailCommand({
        FromEmailAddress: this.emailConfig.from,
        Destination: {
          ToAddresses: [to],
        },
        Content: {
          Simple: {
            Subject: {
              Data: subject,
              Charset: 'UTF-8',
            },
            Body: {
              Html: {
                Data: html,
                Charset: 'UTF-8',
              },
            },
          },
        },
      });

      await this.sesClient.send(command);
      this.logger.log(`Email sent successfully to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}:`, error.message);
      throw error;
    }
  }

  async sendServiceRequestConfirmation(
    to: string,
    clientName: string,
    serviceType: string,
  ): Promise<void> {
    const subject = 'Service Request Received - We Will Contact You Soon';
    const fromEmail = this.emailConfig.from;
    const html = getServiceRequestConfirmationTemplate(clientName, serviceType, fromEmail);

    try {
      await this.sendEmail(to, subject, html);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}:`, error);
      throw error;
    }
  }

  async sendScheduleAssignment(
    to: string,
    teamMemberName: string,
    shifts: Array<{ time?: string; label?: string; type?: string } | null>,
    weekStartDate?: string,
    weekEndDate?: string,
  ): Promise<void> {
    const subject = 'New Schedule Assignment - SquadLog';
    const fromEmail = this.emailConfig.from;
    const html = getScheduleAssignmentTemplate(
      teamMemberName,
      shifts,
      fromEmail,
      weekStartDate,
      weekEndDate,
    );

    try {
      await this.sendEmail(to, subject, html);
    } catch (error) {
      this.logger.error(`Failed to send schedule assignment email to ${to}:`, error);
      throw error;
    }
  }

  async sendTaskAssignment(
    to: string,
    teamMemberName: string,
    taskTitle: string,
    taskDescription: string,
    projectName: string,
    priority: string,
    dueDate: string | null,
    taskUrl?: string,
  ): Promise<void> {
    const subject = `New Task Assignment: ${taskTitle}`;
    const fromEmail = this.emailConfig.from;
    const html = getTaskAssignmentTemplate(
      teamMemberName,
      taskTitle,
      taskDescription,
      projectName,
      priority,
      dueDate,
      fromEmail,
      taskUrl,
    );

    try {
      await this.sendEmail(to, subject, html);
    } catch (error) {
      this.logger.error(`Failed to send task assignment email to ${to}:`, error);
      throw error;
    }
  }

  async sendOrderConfirmation(
    to: string,
    clientName: string,
    orderId: string,
    service: string,
    amount: number,
    orderDate: string,
    orderUrl?: string,
  ): Promise<void> {
    const subject = `Order Confirmation - ${orderId}`;
    const fromEmail = this.emailConfig.from;
    const html = getOrderConfirmationTemplate(
      clientName,
      orderId,
      service,
      amount,
      orderDate,
      fromEmail,
      orderUrl,
    );

    try {
      await this.sendEmail(to, subject, html);
    } catch (error) {
      this.logger.error(`Failed to send order confirmation email to ${to}:`, error);
      throw error;
    }
  }

  async sendLeaveApproval(
    to: string,
    employeeName: string,
    leaveType: string,
    startDate: string,
    endDate: string,
    days: number,
    reason: string | null,
  ): Promise<void> {
    const subject = 'Leave Request Approved - SquadLog';
    const fromEmail = this.emailConfig.from;
    const html = getLeaveApprovalTemplate(
      employeeName,
      leaveType,
      startDate,
      endDate,
      days,
      reason,
      fromEmail,
    );

    try {
      await this.sendEmail(to, subject, html);
    } catch (error) {
      this.logger.error(`Failed to send leave approval email to ${to}:`, error);
      throw error;
    }
  }

  async sendLeaveRejection(
    to: string,
    employeeName: string,
    leaveType: string,
    startDate: string,
    endDate: string,
    days: number,
    reason: string | null,
    rejectionReason?: string,
  ): Promise<void> {
    const subject = 'Leave Request Rejected - SquadLog';
    const fromEmail = this.emailConfig.from;
    const html = getLeaveRejectionTemplate(
      employeeName,
      leaveType,
      startDate,
      endDate,
      days,
      reason,
      fromEmail,
      rejectionReason,
    );

    try {
      await this.sendEmail(to, subject, html);
    } catch (error) {
      this.logger.error(`Failed to send leave rejection email to ${to}:`, error);
      throw error;
    }
  }

  async sendDocumentEmail(
    to: string,
    clientName: string,
    subject: string,
    message: string,
    pdfHtml: string,
    documentType: string,
    documentNumber: string,
  ): Promise<void> {
    const fromEmail = this.emailConfig.from;
    const html = getDocumentEmailTemplate(
      clientName,
      subject,
      message,
      documentType,
      documentNumber,
      fromEmail,
    );

    try {
      // For now, we'll embed the PDF HTML in the email
      // In production, you might want to generate an actual PDF file and attach it
      const emailHtml = html + `
        <div style="margin-top: 30px; padding: 20px; background-color: #f9f9f9; border-radius: 5px;">
          <h3 style="margin-top: 0;">Document Preview:</h3>
          <div style="border: 1px solid #ddd; padding: 20px; background-color: white;">
            ${pdfHtml}
          </div>
        </div>
      `;

      await this.sendEmail(to, subject, emailHtml);
    } catch (error) {
      this.logger.error(`Failed to send document email to ${to}:`, error);
      throw error;
    }
  }

  async sendGenericEmail(
    to: string | string[],
    subject: string,
    htmlBody: string,
  ): Promise<void> {
    const fromEmail = this.emailConfig.from;
    const recipients = Array.isArray(to) ? to : [to];

    try {
      // Send to first recipient (or single recipient)
      const recipient = Array.isArray(to) ? to[0] : to;
      await this.sendEmail(recipient, subject, htmlBody);
    } catch (error) {
      this.logger.error(`Failed to send generic email to ${recipients.join(', ')}:`, error);
      throw error;
    }
  }

  async sendMeetingInvitations(params: {
    to: string[];
    attendees: Array<{ email: string; name: string }>;
    topic: string;
    description?: string | null;
    dateTimeIso: string;
    durationMinutes: number;
    meetingLink: string;
    organizerName?: string | null;
  }): Promise<void> {
    const subject = `Meeting Invitation: ${params.topic}`;
    const fromEmail = this.emailConfig.from;

    // Send individually so each recipient sees their own name.
    for (const attendee of params.attendees) {
      const html = getMeetingInvitationTemplate({
        attendeeName: attendee.name,
        topic: params.topic,
        description: params.description,
        dateTimeIso: params.dateTimeIso,
        durationMinutes: params.durationMinutes,
        meetingLink: params.meetingLink,
        organizerName: params.organizerName,
        contactEmail: fromEmail,
      });

      try {
        await this.sendEmail(attendee.email, subject, html);
      } catch (error) {
        this.logger.error(`Failed to send meeting invitation email to ${attendee.email}:`, error);
        // Don't throw: meeting can still be created even if one email fails.
      }
    }
  }

  async sendOtpEmail(to: string, otp: string): Promise<void> {
    const subject = 'Your Verification Code - SquadLog';
    const fromEmail = this.emailConfig.from;
    
    // Simple HTML template for OTP
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #333; text-align: center;">Verification Code</h2>
        <p style="color: #555; font-size: 16px;">Hello,</p>
        <p style="color: #555; font-size: 16px;">Please use the following One-Time Password (OTP) to verify your email address. This code is valid for 5 minutes.</p>
        <div style="background-color: #f4f4f4; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
          <h1 style="color: #000; letter-spacing: 5px; margin: 0;">${otp}</h1>
        </div>
        <p style="color: #555; font-size: 14px;">If you did not request this code, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #999; font-size: 12px; text-align: center;">&copy; ${new Date().getFullYear()} SquadLog. All rights reserved.</p>
      </div>
    `;

    try {
      await this.sendEmail(to, subject, html);
    } catch (error) {
      this.logger.error(`Failed to send OTP email to ${to}:`, error);
      throw error;
    }
  }

  async sendWelcomeEmail(to: string, employeeName: string): Promise<void> {
    const subject = 'Welcome to SquadLog - Your Account is Ready';
    const fromEmail = this.emailConfig.from;
    // Hardcoded for now or env var
    const loginUrl = process.env.FRONTEND_URL || 'https://console.squadlog.studio/login';
    
    const html = getWelcomeEmailTemplate(
      employeeName,
      to,
      loginUrl,
      fromEmail,
    );

    try {
      await this.sendEmail(to, subject, html);
    } catch (error) {
      this.logger.error(`Failed to send welcome email to ${to}:`, error);
      // Don't throw to avoid blocking user creation if email fails
    }
  }
}
