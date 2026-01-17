import { createTempAccess, revokeAccess } from '../driveAccess.js';
import { verifyOrder } from '../paypal.js';
import { isOrderUsed, markOrderAsUsed } from '../orderStore.js';

const EXPECTED_PRICE = '10.00';
const EXPECTED_CURRENCY = 'USD';

export default async function handler(req, res) {
  try {
    const { order } = req.query;
    if (!order) return res.status(403).send("Missing order ID");

    // 🚫 BLOCK REUSE
    if (await isOrderUsed(order)) {
      return res.status(403).send("This order has already been used");
    }

    // 🔐 VERIFY PAYPAL
    const orderData = await verifyOrder(order);
    if (orderData.status !== 'COMPLETED') {
      return res.status(403).send("Payment not completed");
    }

    const purchase = orderData.purchase_units[0].amount;
    if (
      purchase.value !== EXPECTED_PRICE ||
      purchase.currency_code !== EXPECTED_CURRENCY
    ) {
      return res.status(403).send("Invalid payment amount");
    }

    // ✅ MARK AS USED
    await markOrderAsUsed(order);

    // 🎁 ISSUE TEMP DOWNLOAD
    const FILE_ID = process.env.GOOGLE_DRIVE_FILE_ID;
    const { link, permissionId } = await createTempAccess(FILE_ID);

    setTimeout(() => {
      revokeAccess(FILE_ID, permissionId).catch(console.error);
    }, 5 * 60 * 1000);

    return res.redirect(link);

  } catch (err) {
    console.error("DOWNLOAD ERROR:", err);
    return res.status(500).send("Verification failed");
  }
}

