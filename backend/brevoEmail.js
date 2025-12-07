import Brevo from "@getbrevo/brevo";
import dotenv from "dotenv";
dotenv.config();

// Initialize instance but configure inside function to ensure env vars are ready
const apiInstance = new Brevo.TransactionalEmailsApi();

export const sendEmail = async (toEmails, subject, textContent, htmlContent = null) => {
    // Configure API key just before sending to ensure ENV is loaded
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
        console.error("❌ Brevo Error: No API Key found in env!");
        return false;
    }
    apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);

    if (!toEmails || toEmails.length === 0) {
        console.warn("⚠️ Brevo: No recipients provided.");
        return false;
    }

    const sender = {
        name: "ISKCON Srisailam",
        email: process.env.FROM_EMAIL || "noreply@iskconsrisailam.com"
    };

    console.log(`📧 Preparing to send email to ${Array.isArray(toEmails) ? toEmails.length : 1} recipients...`);
    console.log(`   From: ${sender.email}`);

    try {
        const recipients = Array.isArray(toEmails) ? toEmails : [toEmails];

        const emailPromises = recipients.map(email => {
            // Use plain object to ensure axios serializes it correctly
            const emailPayload = {
                sender,
                to: [{ email }],
                subject,
                textContent,
                htmlContent: htmlContent || textContent
            };
            return apiInstance.sendTransacEmail(emailPayload);
        });

        const results = await Promise.allSettled(emailPromises);

        const successCount = results.filter(r => r.status === "fulfilled").length;
        const failCount = results.filter(r => r.status === "rejected").length;

        console.log(`✅ Brevo: Sent ${successCount} emails successfully.`);

        if (failCount > 0) {
            console.warn(`⚠️ Brevo: ${failCount} emails failed to send.`);
            results.forEach((r, idx) => {
                if (r.status === "rejected") {
                    console.error(`   ❌ Failed for ${recipients[idx]}:`, r.reason.message || r.reason);
                }
            });
        }

        return successCount > 0;
    } catch (error) {
        // This catch handles unexpected sync errors or setup errors
        console.error("❌ Brevo Email System Error:", error);
        return false;
    }
};
