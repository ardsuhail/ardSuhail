// lib/emailService.js
import nodemailer from "nodemailer";
import { emailTemplates } from "./emailTemplates";

// Create transporter once
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const emailService = {
    // Send email helper
    send: async (to, subject, html) => {
        try {
            await transporter.sendMail({
                from: `"Suhail Portfolio" <${process.env.EMAIL_USER}>`,
                to,
                subject,
                html
            });
            return { success: true };
        } catch (error) {
            console.error("Email error:", error);
            return { success: false, error: error.message };
        }
    },

    // Send user confirmation
    sendUserConfirmation: async (name, email, message) => {
        const template = emailTemplates.userConfirmation(name, message);
        return await emailService.send(email, template.subject, template.html);
    },

    // Send admin notification
    sendAdminNotification: async (name, email, message) => {
        const template = emailTemplates.adminNotification(name, email, message);
        return await emailService.send(process.env.ADMIN_EMAIL, template.subject, template.html);
    },

    // Send reply to user
    sendUserReply: async (userName, userEmail, replyMessage, originalMessage, replySubject = "Reply to your query", repliedBy = "Admin") => {
        const template = emailTemplates.userReply(userName, replyMessage, originalMessage, replySubject, repliedBy);
        return await emailService.send(userEmail, template.subject, template.html);
    }
};