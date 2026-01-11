const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
  keyFile: 'service-account.json',
  scopes: ['https://www.googleapis.com/auth/drive.readonly']
});

const drive = google.drive({ version: 'v3', auth });

async function streamFile(fileId, res) {
  const file = await drive.files.get(
    { fileId, alt: 'media' },
    { responseType: 'stream' }
  );

  file.data.pipe(res);
}

module.exports = { streamFile };
