import { google } from 'googleapis';

const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
serviceAccount.private_key =
  serviceAccount.private_key.replace(/\\n/g, '\n');

const auth = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: ['https://www.googleapis.com/auth/drive']
});

const drive = google.drive({ version: 'v3', auth });
export default drive;

