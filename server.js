require('dotenv').config();
const express = require('express');
const { streamFile } = require('./drive');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname));

const PAYPAL_API = "https://api-m.sandbox.paypal.com"; // use sandbox for testing

// Verify PayPal order
async function verifyPayment(orderID) {
  const auth = Buffer.from(
    process.env.PAYPAL_CLIENT_ID + ":" + process.env.PAYPAL_SECRET
  ).toString("base64");

  const tokenRes = await axios.post(
    `${PAYPAL_API}/v1/oauth2/token`,
    "grant_type=client_credentials",
    { headers: { Authorization: `Basic ${auth}` } }
  );

  const orderRes = await axios.get(
    `${PAYPAL_API}/v2/checkout/orders/${orderID}`,
    { headers: { Authorization: `Bearer ${tokenRes.data.access_token}` } }
  );

  return orderRes.data.status === "COMPLETED";
}

// Success endpoint
app.get('/verify', async (req, res) => {
  const { order } = req.query;

  const paid = await verifyPayment(order);

  if (!paid) {
    return res.status(403).send("Payment not verified");
  }

  // ✅ PAYMENT CONFIRMED
  res.redirect('/download.html?order=' + order);
});

const FILE_ID = "1Hzw0_1Th_qcGjF7N1xxtCkL8vt5iTjwE";

// Mock DB check (replace with real DB)
function isAccessValid(orderId) {
  // Example logic
  const record = {
    expiresAt: new Date(Date.now() + 60 * 60 * 1000) // 1 hour
  };

  return new Date() < new Date(record.expiresAt);
}

app.get('/download', async (req, res) => {
  const { order } = req.query;

  if (!order) {
    return res.status(403).send("Missing order ID");
  }

  if (!isAccessValid(order)) {
    return res.status(403).send("Download link expired");
  }

  res.setHeader(
    "Content-Disposition",
    "attachment; filename=FocusApp.exe"
  );

  await streamFile(FILE_ID, res);
});

app.listen(3000, () => console.log("Secure download server running"));
