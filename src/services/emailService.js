import { google } from 'googleapis';
import config from '../config/index.js';

// Create a reusable OAuth2 client for Gmail API
const createOAuth2Client = () => {
  return new google.auth.OAuth2(
    config.google.clientId,
    config.google.clientSecret,
    config.google.redirectUri
  );
};

// Function to send referral email using Gmail API
export const sendReferralEmail = async (referral) => {
  try {
    // Step 1: Set up OAuth2 client
    const oauth2Client = createOAuth2Client();
    oauth2Client.setCredentials({
      refresh_token: config.google.refreshToken,
    });

    // Step 2: Get access token
    const accessToken = await oauth2Client.getAccessToken();
    if (!accessToken || !accessToken.token) {
      throw new Error('Failed to retrieve access token');
    }

    // Initialize Gmail API
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Step 3: Create email messages
    const referrerEmail = [
      `From: Accredian <${config.google.user}>`,
      `To: ${referral.referrerEmail}`,
      `Subject: Thank You for Your Referral!`,
      `Content-Type: text/html; charset=utf-8`,
      '',
      `
        <h2>Thank you for referring someone to us!</h2>
        <p>Referral Details:</p>
        <ul>
          <li>Referrer: ${referral.referrerName}</li>
          <li>Referee: ${referral.refereeName}</li>
          <li>Course: ${referral.course}</li>
        </ul>
        <p>We appreciate your trust in us. Our team will reach out to ${referral.refereeName} shortly.</p>
      `,
    ].join('\n');

    const refereeEmail = [
      `From: Accredian <${config.google.user}>`,
      `To: ${referral.refereeEmail}`,
      `Subject: You’ve Been Referred to Us!`,
      `Content-Type: text/html; charset=utf-8`,
      '',
      `
        <h2>Hello ${referral.refereeName},</h2>
        <p>${referral.referrerName} has referred you to our platform for the <strong>${referral.course}</strong> course!</p>
        <p>We’re excited to have you join us. A member of our team will contact you soon to guide you through the next steps.</p>
        <p>If you have any questions, feel free to reach out to us!</p>
      `,
    ].join('\n');

    // Encode messages in base64 format
    const referrerMessage = Buffer.from(referrerEmail)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const refereeMessage = Buffer.from(refereeEmail)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    // Step 4: Send emails
    // Send email to the referrer
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: referrerMessage,
      },
    });
    console.log('Email sent to referrer successfully');

    // Send email to the referee
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: refereeMessage,
      },
    });
    console.log('Email sent to referee successfully');

    return true;
  } catch (error) {
    console.error('Failed to send email via Gmail API:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
    });
    throw new Error('Failed to send email notifications');
  }
};

