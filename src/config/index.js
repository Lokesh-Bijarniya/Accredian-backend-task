import dotenv from 'dotenv';

dotenv.config();

export default {
  db: {
    url: process.env.DATABASE_URL,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    redirectUri: process.env.GOOGLE_REDIRECT_URI,
    user: process.env.GMAIL_USER,
    appPassword: process.env.APP_PASSWORD
  },
  port: process.env.PORT || 3000,
};