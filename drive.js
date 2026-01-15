const { google } = require('googleapis');

// For production deployment, use environment variables
let auth;
if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
  // Use service account credentials from environment variables
  const serviceAccount = {
    type: "service_account",
    project_id: process.env.GOOGLE_PROJECT_ID || "engaged-mariner-461313-r3",
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.GOOGLE_CLIENT_EMAIL.replace('@', '%40')}`,
    universe_domain: "googleapis.com"
  };

  auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: ['https://www.googleapis.com/auth/drive.readonly']
  });
} else {
  // Fallback for local development
  auth = new google.auth.GoogleAuth({
    keyFile: 'service-account.json',
    scopes: ['https://www.googleapis.com/auth/drive.readonly']
  });
}

const drive = google.drive({ version: 'v3', auth });

async function streamFile(fileId, res) {
  const file = await drive.files.get(
    { fileId, alt: 'media' },
    { responseType: 'stream' }
  );

  file.data.pipe(res);
}

const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);

module.exports = { streamFile };
