const { streamFile } = require('../drive');

const FILE_ID = "1Hzw0_1Th_qcGjF7N1xxtCkL8vt5iTjwE";

// Mock DB check (replace with real DB)
function isAccessValid(orderId) {
  // Example logic
  const record = {
    expiresAt: new Date(Date.now() + 60 * 60 * 1000) // 1 hour
  };

  return new Date() < new Date(record.expiresAt);
}

module.exports = async (req, res) => {
  const { order } = req.query;

  if (!order) {
    return res.status(400).json({ error: "Missing order ID" });
  }

  if (!isAccessValid(order)) {
    return res.status(403).json({ error: "Download link expired" });
  }

  res.setHeader(
    "Content-Disposition",
    "attachment; filename=FocusApp.exe"
  );

  try {
    await streamFile(FILE_ID, res);
  } catch (error) {
    res.status(500).json({ error: "Download failed" });
  }
};