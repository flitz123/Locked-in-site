import { createTempAccess, revokeAccess } from '../../driveAccess.js';

const FILE_ID = process.env.GOOGLE_DRIVE_FILE_ID;

export default async function handler(req, res) {
  try {
    const { order } = req.query;

    if (!order) {
      return res.status(403).send("Missing order ID");
    }

    // TODO: verify PayPal order here

    const { link, permissionId } = await createTempAccess(FILE_ID);

    // Revoke access after 5 minutes
    setTimeout(() => {
      revokeAccess(FILE_ID, permissionId)
        .catch(err => console.error("Revoke failed", err));
    }, 5 * 60 * 1000);

    return res.redirect(link);

  } catch (err) {
    console.error(err);
    return res.status(500).send("Failed to generate download");
  }
}