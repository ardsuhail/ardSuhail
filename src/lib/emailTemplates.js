// lib/emailTemplates.js
export const emailTemplates = {
    // User ko confirmation email
    userConfirmation: (name, message) => ({
        subject: "✅ We've received your message!",
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
                    .content { padding: 30px; background: #f9fafb; }
                    .message-box { background: white; padding: 20px; border-radius: 10px; border-left: 4px solid #667eea; margin: 20px 0; }
                    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
                    button { background: #667eea; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>✨ Thank You ${name}!</h1>
                        <p>We've received your message</p>
                    </div>
                    <div class="content">
                        <p>Dear ${name},</p>
                        <p>Thank you for reaching out to us. We've received your query and our team will get back to you within 24-48 hours.</p>
                        <div class="message-box">
                            <strong>📝 Your Message:</strong>
                            <p style="margin-top: 10px; color: #4b5563;">${message}</p>
                        </div>
                        <p>In the meantime, feel free to explore our work or check out our latest projects!</p>
                    </div>
                    <div class="footer">
                        <p>Best regards,<br/><strong>Suhail's Portfolio Team</strong></p>
                        <small>This is an automated response, please do not reply directly to this email.</small>
                    </div>
                </div>
            </body>
            </html>
        `
    }),

    // Admin ko notification
    adminNotification: (name, email, message) => ({
        subject: "📬 New Query Received!",
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
                    .header { background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); color: white; padding: 30px; text-align: center; }
                    .content { padding: 30px; background: #f9fafb; }
                    .info-box { background: white; padding: 15px; border-radius: 10px; margin: 15px 0; }
                    .label { font-weight: bold; color: #374151; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🔔 New Query Alert!</h1>
                        <p>A new message has been received</p>
                    </div>
                    <div class="content">
                        <div class="info-box">
                            <p><span class="label">👤 Name:</span> ${name}</p>
                            <p><span class="label">📧 Email:</span> ${email}</p>
                            <p><span class="label">💬 Message:</span></p>
                            <p style="background: #f3f4f6; padding: 10px; border-radius: 5px;">${message}</p>
                        </div>
                        <a href="${process.env.NEXTAUTH_URL}/admin/queries" style="display: inline-block; background: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View in Dashboard →</a>
                    </div>
                </div>
            </body>
            </html>
        `
    }),

    // Reply to user
    userReply: (userName, replyMessage, originalMessage, replySubject = "Reply to your query", repliedBy = "Admin") => ({
        subject: `💬 ${replySubject}`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
                    .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; }
                    .content { padding: 30px; background: #f9fafb; }
                    .reply-box { background: #ecfdf5; padding: 20px; border-radius: 10px; border-left: 4px solid #10b981; margin: 20px 0; }
                    .original-box { background: white; padding: 15px; border-radius: 8px; margin: 15px 0; border: 1px solid #e5e7eb; }
                    .meta-info { background: #f3f4f6; padding: 10px; border-radius: 6px; margin: 15px 0; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>💬 You've got a reply!</h1>
                        <p style="margin: 10px 0 0 0; font-size: 16px;">Subject: ${replySubject}</p>
                    </div>
                    <div class="content">
                        <p>Dear ${userName},</p>
                        
                        <div class="meta-info">
                            <strong>📋 Reply Details:</strong><br/>
                            • Subject: ${replySubject}<br/>
                            • Replied by: ${repliedBy}<br/>
                            • Date: ${new Date().toLocaleDateString()}
                        </div>
                        
                        <div class="reply-box">
                            <strong>📢 Response:</strong>
                            <p style="margin-top: 10px; color: #065f46;">${replyMessage}</p>
                        </div>
                        
                        <div class="original-box">
                            <strong>📝 Your Original Message:</strong>
                            <p style="margin-top: 8px; color: #6b7280;">${originalMessage}</p>
                        </div>
                        
                        <p>If you have any further questions, feel free to reach out again!</p>
                    </div>
                    <div class="footer">
                        <p>Best regards,<br/><strong>${repliedBy}</strong><br/>ArdSuhail's Portfolio Team</p>
                    </div>
                </div>
            </body>
            </html>
        `
    })
};