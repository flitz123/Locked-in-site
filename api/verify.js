const axios = require('axios');

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

module.exports = async (req, res) => {
  const { order } = req.query;

  try {
    const paid = await verifyPayment(order);

    if (!paid) {
      return res.status(403).json({ error: "Payment not verified" });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Verification failed" });
  }
};