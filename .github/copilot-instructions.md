# AI Coding Agent Instructions for Locked-in Site

## Architecture Overview

This is a Node.js Express application for selling downloadable software with PayPal payment integration and Google Drive file hosting.

**Key Components:**

- `server.js`: Express server handling payment verification and secure downloads
- `drive.js`: Google Drive API integration for file streaming
- Frontend: Static HTML pages (`index.html`, `success.html`, `download.html`) with PayPal SDK

**Data Flow:**

1. User pays via PayPal on `index.html`
2. Redirects to `success.html` with order ID
3. User clicks download link → `/verify?order={orderID}` → payment verification
4. If verified, redirect to `download.html` → user clicks `/download?order={orderID}` → file stream from Google Drive

## Critical Setup Requirements

- **Environment Variables** (`.env`): `PAYPAL_CLIENT_ID`, `PAYPAL_SECRET`
- **Google Service Account**: `service-account.json` in root directory
- **Google Drive File ID**: Update `FILE_ID` constant in `server.js`
- **Run Command**: `npm start` (starts server on port 3000)

## Project-Specific Patterns

- **Payment Verification**: Use PayPal API v2 for order status checks (see `verifyPayment()` in `server.js`)
- **File Streaming**: Google Drive API with readonly scope for secure downloads (see `streamFile()` in `drive.js`)
- **Access Control**: Mock database with 1-hour expiration (replace `isAccessValid()` with real DB)
- **Error Handling**: Return 403 status for invalid payments/expired links
- **Frontend Integration**: PayPal SDK loaded in `index.html`, buttons rendered in `paypal.js`

## Common Development Tasks

- **Testing Payments**: Use PayPal sandbox API (`https://api-m.sandbox.paypal.com`)
- **File Upload**: Update Google Drive file ID after uploading new version
- **Security**: Never commit `service-account.json` or `.env` files
- **Deployment**: Ensure environment variables are set in production

## Code Style Notes

- Use CommonJS modules (`require/module.exports`)
- Async/await for API calls
- Express middleware for JSON parsing
- Inline HTML with minimal JS for frontend</content>
  <parameter name="filePath">c:\Users\PEACE\Desktop\Locked-in site\.github\copilot-instructions.md
