
// Email service utility for password reset functionality
// This simulates sending emails and can be replaced with a real email service

export interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export const sendPasswordResetEmail = async (email: string, resetUrl: string, userName: string): Promise<boolean> => {
  try {
    // Create email template
    const emailTemplate: EmailTemplate = {
      to: email,
      subject: "Password Reset Request - Soqotra Logistics",
      html: createPasswordResetEmailHTML(resetUrl, userName),
      text: createPasswordResetEmailText(resetUrl, userName)
    };

    // In a real application, you would integrate with an email service here
    // For example:
    // - EmailJS: await emailjs.send(serviceId, templateId, templateParams)
    // - SendGrid: await sgMail.send(emailTemplate)
    // - AWS SES: await ses.sendEmail(params).promise()

    // For demo purposes, we'll simulate the email sending
    console.log("Email template created:", emailTemplate);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Log the email content for testing
    console.log(`Password reset email would be sent to: ${email}`);
    console.log(`Reset URL: ${resetUrl}`);
    
    return true;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return false;
  }
};

const createPasswordResetEmailHTML = (resetUrl: string, userName: string): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Password Reset - Soqotra Logistics</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1976d2; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .button { display: inline-block; background: #1976d2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
            .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>SOQOTRA LOGISTICS SERVICES</h1>
                <p>TRANSPORTATION & TRADING WLL.</p>
            </div>
            <div class="content">
                <h2>Password Reset Request</h2>
                <p>Hello ${userName},</p>
                <p>We received a request to reset your password for your Soqotra Logistics account.</p>
                <p>Click the button below to reset your password:</p>
                <a href="${resetUrl}" class="button">Reset Password</a>
                <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
                <p style="word-break: break-all; background: #eee; padding: 10px; border-radius: 4px;">${resetUrl}</p>
                <p><strong>This link will expire in 1 hour.</strong></p>
                <p>If you didn't request this password reset, please ignore this email. Your password will remain unchanged.</p>
            </div>
            <div class="footer">
                <p>© 2024 Soqotra Logistics Services - Transportation & Trading WLL.</p>
                <p>This is an automated message, please do not reply to this email.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

const createPasswordResetEmailText = (resetUrl: string, userName: string): string => {
  return `
    SOQOTRA LOGISTICS SERVICES
    TRANSPORTATION & TRADING WLL.
    
    Password Reset Request
    
    Hello ${userName},
    
    We received a request to reset your password for your Soqotra Logistics account.
    
    To reset your password, visit this link:
    ${resetUrl}
    
    This link will expire in 1 hour.
    
    If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
    
    © 2024 Soqotra Logistics Services - Transportation & Trading WLL.
    This is an automated message, please do not reply to this email.
  `;
};
