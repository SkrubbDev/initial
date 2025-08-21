# Security Upgrade: Secure Form Handling

## Problem Identified
The original implementation had a **critical security vulnerability**: the Google Apps Script URL was exposed in the client-side JavaScript code. This meant:

- Anyone could see and call your Google Apps Script endpoint
- No authentication or rate limiting on form submissions
- Potential for abuse and spam attacks
- Risk of hitting Google Apps Script quotas

## Solution Implemented
We've implemented a **secure backend architecture** that protects your Google Apps Script URL:

### 1. Backend Server (`server.js`)
- **Express.js server** that handles form submissions securely
- **Rate limiting**: 10 requests per IP per 15 minutes
- **Input validation**: Server-side validation of all form data
- **Data sanitization**: Cleans and validates input before processing
- **Security headers**: Uses Helmet.js for security best practices

### 2. Secure Configuration
- Google Apps Script URL is now stored **server-side only**
- Environment variables for sensitive configuration
- CORS protection for production deployments

### 3. Updated Frontend
- Forms now submit to `/api/submit-form` instead of Google Apps Script directly
- Better error handling and user feedback
- Maintains all existing functionality

## How It Works Now

```
User Form → Frontend Validation → Backend API → Server Validation → Google Apps Script → Google Sheets
```

1. **User submits form** (client-side validation)
2. **Frontend sends data** to `/api/submit-form`
3. **Backend validates** and sanitizes data
4. **Backend calls** Google Apps Script (URL hidden from client)
5. **Response returned** to user

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp env.example .env
# Edit .env with your actual Google Apps Script URL
```

### 3. Start the Server
```bash
# Development
npm run dev

# Production
npm start
```

### 4. Update Google Apps Script
Make sure your Google Apps Script is still deployed as a web app with "Execute as Me" permissions.

## Security Benefits

✅ **URL Protection**: Google Apps Script URL is never exposed to clients  
✅ **Rate Limiting**: Prevents spam and abuse  
✅ **Input Validation**: Server-side validation prevents malicious data  
✅ **CORS Protection**: Controls which domains can access your API  
✅ **Security Headers**: Helmet.js provides additional security  
✅ **Data Sanitization**: Cleans input before processing  

## Production Deployment

### Environment Variables
```bash
NODE_ENV=production
PORT=3000
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
ALLOWED_ORIGINS=https://yourdomain.com
```

### CORS Configuration
Update the `ALLOWED_ORIGINS` in your `.env` file to include only your production domain.

### HTTPS
Always use HTTPS in production for secure data transmission.

## Monitoring & Logging

The backend logs all form submissions and errors. Consider adding:
- Database logging for audit trails
- Error monitoring (e.g., Sentry)
- Analytics tracking
- IP blocking for repeated violations

## Testing

Test the security by:
1. Trying to access the Google Apps Script URL directly (should fail)
2. Submitting forms with invalid data
3. Testing rate limiting by submitting multiple forms quickly
4. Checking that the URL is not visible in browser dev tools

## Rollback Plan

If you need to revert to the old system:
1. Restore the original `config.js` with the Google Apps Script URL
2. Restore the original `script.js` form submission logic
3. Remove the backend server files

**Note**: This would re-expose the security vulnerability, so only do this temporarily while fixing any issues.
