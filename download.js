const drive = require('./googleAuth');

async function streamFile(fileId, res) {
  const response = await drive.files.get(
    { fileId, alt: 'media' },
    { responseType: 'stream' }
  );

  response.data.pipe(res);
}

module.exports = { streamFile };
