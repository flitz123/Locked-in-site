# Locked-in Site

A Node.js Express application for selling downloadable software with PayPal payment integration and Google Drive file hosting.

## Features

- PayPal payment processing
- Secure file downloads from Google Drive
- Static file serving
- Environment-based configuration

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see Environment Variables section)
4. Run locally: `npm start`

## Environment Variables

Create a `.env` file in the root directory with:

```env
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_SECRET=your_paypal_secret
GOOGLE_CLIENT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_private_key\n-----END PRIVATE KEY-----"
GOOGLE_PRIVATE_KEY_ID=your_private_key_id
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_PROJECT_ID=your_project_id
```

## Deployment

### Heroku

1. Push your code to GitHub
2. Connect Heroku to your GitHub repo
3. Set environment variables in Heroku dashboard
4. Deploy

### Railway

1. Connect your GitHub repo to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically

### Render

1. Connect your GitHub repo to Render
2. Set environment variables in Render dashboard
3. Deploy

### Vercel (Serverless)

1. Push your code to GitHub
2. Connect Vercel to your GitHub repo
3. Set environment variables in Vercel dashboard
4. Deploy (static files served automatically, API routes in `/api` run serverlessly)
2. Set environment variables in Render dashboard
3. Deploy

### DigitalOcean App Platform

1. Connect your GitHub repo
2. Set environment variables
3. Deploy

## Google Drive Setup

1. Create a Google Cloud Project
2. Enable Google Drive API
3. Create a Service Account
4. Download the JSON key file
5. Share your file with the service account email
6. Copy the file ID from the shareable link

## Security

- Never commit `.env` files or `service-account.json` to version control
- Use environment variables for all sensitive data
- The `.gitignore` file excludes sensitive files