# 🚀 Netlify Deployment Guide

## Overview
This guide explains how to deploy your Skrubb Landing Page to Netlify with secure form handling using serverless functions.

## 📁 New Files Added
- `netlify/functions/submit-form.js` - Serverless function for form handling
- `netlify.toml` - Netlify configuration
- `netlify/functions/package.json` - Function dependencies

## 🔧 Setup Steps

### 1. Install Netlify CLI (Optional)
```bash
npm install -g netlify-cli
```

### 2. Set Environment Variables in Netlify
Go to your Netlify dashboard → Site settings → Environment variables and add:

```
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec
```

**⚠️ IMPORTANT:** Replace `YOUR_ACTUAL_SCRIPT_ID` with your real Google Apps Script ID!

### 3. Deploy to Netlify

#### Option A: Drag & Drop (Simple)
1. Build your CSS: `npm run build`
2. Drag the entire project folder to Netlify
3. Wait for deployment

#### Option B: Git Integration (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.`
4. Deploy automatically on push

### 4. Install Function Dependencies
After deployment, Netlify will automatically install the `node-fetch` dependency for your functions.

## 🔒 Security Features
- ✅ Form validation and sanitization
- ✅ Rate limiting (handled by Netlify)
- ✅ CORS protection
- ✅ Security headers
- ✅ Environment variable protection

## 🧪 Testing
1. Deploy to Netlify
2. Test form submission
3. Check Netlify function logs for any errors
4. Verify data reaches Google Sheets

## 📊 Monitoring
- **Function Logs:** Netlify dashboard → Functions → View logs
- **Form Submissions:** Check your Google Sheets
- **Performance:** Netlify analytics dashboard

## 🚨 Troubleshooting

### Common Issues:
1. **404 Error:** Function not deployed - check `netlify.toml`
2. **500 Error:** Check environment variables and function logs
3. **CORS Error:** Verify redirects in `netlify.toml`

### Debug Steps:
1. Check Netlify function logs
2. Verify environment variables
3. Test function locally with `netlify dev`
4. Check browser console for errors

## 🔄 Local Development
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Start local development
netlify dev

# This will run both your static site and functions locally
```

## 📝 Notes
- Functions are serverless and scale automatically
- Cold starts may cause slight delays on first request
- Environment variables are encrypted and secure
- Functions have a 10-second timeout limit

## 🎯 Next Steps
1. Deploy to Netlify
2. Set environment variables
3. Test form submission
4. Monitor function performance
5. Set up custom domain (optional)
