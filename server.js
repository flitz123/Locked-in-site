require('dotenv').config();
const express = require('express');
const { streamFile } = require('./downloadService.js');

const app = express();
const FILE_ID = "1PPu0v14klUJU8SxQ95yKCDcf3BOxFyyM";

app.get('/download', async (req, res) => {
  const { order } = req.query;

  if (!order) {
    return res.status(403).send("Missing order ID");
  }

  // TODO: verify PayPal order + expiry
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=FocusApp.exe"
  );

  await streamFile(FILE_ID, res);
});

app.listen(3000, () =>
  console.log("Secure download running on port 3000")
);