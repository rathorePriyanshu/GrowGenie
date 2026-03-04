const SibApiV3Sdk = require("sib-api-v3-sdk");

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

async function sendEmail(to, html) {
    const email = {
        sender: {
            name: "GrowGenie",
            email: process.env.EMAIL_FROM,
        },
        to: [{ email: to }],
        subject: "Your Verification Code",
        htmlContent: html,
    };

    const response = await apiInstance.sendTransacEmail(email);
    console.log("BREVO EMAIL RESPONSE:", response);
}

module.exports = sendEmail;