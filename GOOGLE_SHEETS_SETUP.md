# Google Sheets Integration Setup Guide

This guide will walk you through setting up Google Sheets integration for your Skrubb landing page forms.

## Prerequisites
- A Google account
- Access to Google Sheets
- Basic knowledge of copying/pasting URLs

## Step 1: Create the Google Sheets

### **Client Sheet**
1. **Create a new Google Sheet** named "Skrubb Client Waiting List"
2. **Set up the columns** in the first row:
   ```
   A1: Timestamp
   B1: Name
   C1: Email
   D1: Postal Code
   E1: Cleaning Details
   F1: IP Address
   ```

### **Contractor Sheet**
1. **Create another Google Sheet** named "Skrubb Contractor Waiting List"
2. **Set up the columns** in the first row:
   ```
   A1: Timestamp
   B1: Name
   C1: Email
   D1: Postal Code
   E1: Can Work in Canada
   F1: Cleaning Experience
   G1: IP Address
   ```

3. **Format both header rows** (make them bold, add colors, etc.)
4. **Note the Sheet IDs** from the URLs (you'll need these for the script)

## Step 2: Get Your Sheet IDs

### **How to Find Sheet IDs:**
1. **Open each Google Sheet**
2. **Look at the URL** - it will look like:
   ```
   https://docs.google.com/spreadsheets/d/1ABC123...XYZ/edit#gid=0
   ```
3. **Copy the long string** between `/d/` and `/edit`:
   - **Client Sheet ID**: `1ABC123...XYZ` (example)
   - **Contractor Sheet ID**: `1DEF456...ABC` (example)

### **Important Notes:**
- **Each sheet needs to be shared** with the Google account running the Apps Script
- **Set permissions** to "Can edit" for the Apps Script account
- **Keep the IDs secure** - they give access to your sheets

## Step 3: Set up Google Apps Script

1. **In your Google Sheet**, go to **Extensions > Apps Script**
2. **Delete the default code** and replace it with this:

```javascript
// Configuration
const CONFIG = {
  MAX_SUBMISSIONS_PER_HOUR: 5,
  MAX_SUBMISSIONS_PER_DAY: 20,
  BLOCKED_IPS: [], // Add IPs to block here
  ENABLE_RECAPTCHA: true,
  RECAPTCHA_SECRET_KEY: 'YOUR_RECAPTCHA_SECRET_KEY_HERE',
  
  // Google Sheets IDs - Replace with your actual sheet IDs
  CLIENT_SHEET_ID: 'YOUR_CLIENT_SHEET_ID_HERE',
  CONTRACTOR_SHEET_ID: 'YOUR_CONTRACTOR_SHEET_ID_HERE'
};

function doPost(e) {
  try {
    // Get request data
    const data = JSON.parse(e.postData.contents);
    const ip = e.parameter.ip || 'unknown';
    
    // Security checks
    if (!passesSecurityChecks(data, ip, e)) {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          status: 'error', 
          message: 'Security check failed' 
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Validate and sanitize input
    const sanitizedData = validateAndSanitizeInput(data);
    if (!sanitizedData.isValid) {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          status: 'error', 
          message: sanitizedData.error 
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Add to appropriate sheet based on type
    const timestamp = new Date();
    
    if (sanitizedData.type === 'client') {
      // Add to client sheet
      const clientSheet = SpreadsheetApp.openById(CONFIG.CLIENT_SHEET_ID).getActiveSheet();
      const clientRowData = [
        timestamp,
        sanitizedData.name,
        sanitizedData.email,
        sanitizedData.postalCode,
        sanitizedData.cleaningDetails,
        ip
      ];
      clientSheet.appendRow(clientRowData);
    } else if (sanitizedData.type === 'contractor') {
      // Add to contractor sheet
      const contractorSheet = SpreadsheetApp.openById(CONFIG.CONTRACTOR_SHEET_ID).getActiveSheet();
      const contractorRowData = [
        timestamp,
        sanitizedData.name,
        sanitizedData.email,
        sanitizedData.postalCode,
        sanitizedData.canWorkInCanada,
        sanitizedData.cleaningExperience,
        ip
      ];
      contractorSheet.appendRow(contractorRowData);
    }
    
    // Log successful submission
    logSubmission(ip, 'success');
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'success', 
        message: 'Data added successfully' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log errors
    logSubmission(e.parameter.ip || 'unknown', 'error: ' + error.toString());
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'error', 
        message: 'Server error occurred' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function passesSecurityChecks(data, ip, e) {
  // Check if IP is blocked
  if (CONFIG.BLOCKED_IPS.includes(ip)) {
    logSecurityEvent(ip, 'blocked_ip_attempt');
    return false;
  }
  
  // Check rate limiting
  if (!checkRateLimit(ip)) {
    logSecurityEvent(ip, 'rate_limit_exceeded');
    return false;
  }
  
  // Verify reCAPTCHA if enabled
  if (CONFIG.ENABLE_RECAPTCHA && !verifyRecaptcha(data.recaptchaToken, e)) {
    logSecurityEvent(ip, 'recaptcha_failed');
    return false;
  }
  
  return true;
}

function checkRateLimit(ip) {
  const cache = CacheService.getScriptCache();
  const now = new Date();
  const hourKey = `hour_${ip}_${now.getHours()}_${now.getDate()}`;
  const dayKey = `day_${ip}_${now.getDate()}_${now.getMonth()}`;
  
  // Check hourly limit
  const hourlyCount = parseInt(cache.get(hourKey) || '0');
  if (hourlyCount >= CONFIG.MAX_SUBMISSIONS_PER_HOUR) {
    return false;
  }
  
  // Check daily limit
  const dailyCount = parseInt(cache.get(dayKey) || '0');
  if (dailyCount >= CONFIG.MAX_SUBMISSIONS_PER_DAY) {
    return false;
  }
  
  // Increment counters
  cache.put(hourKey, (hourlyCount + 1).toString(), 3600); // 1 hour
  cache.put(dayKey, (dailyCount + 1).toString(), 86400); // 1 day
  
  return true;
}

function verifyRecaptcha(token, e) {
  if (!token) return false;
  
  try {
    const response = UrlFetchApp.fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      payload: {
        secret: CONFIG.RECAPTCHA_SECRET_KEY,
        response: token
      }
    });
    
    const result = JSON.parse(response.getContentText());
    return result.success;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

function validateAndSanitizeInput(data) {
  // Required fields
  if (!data.type || !data.name || !data.email || !data.postalCode) {
    return { isValid: false, error: 'Missing required fields' };
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { isValid: false, error: 'Invalid email format' };
  }
  
  // Validate postal code format
  const postalCodeRegex = /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/;
  if (!postalCodeRegex.test(data.postalCode)) {
    return { isValid: false, error: 'Invalid postal code format' };
  }
  
  // Sanitize inputs
  const sanitized = {
    type: sanitizeString(data.type),
    name: sanitizeString(data.name),
    email: sanitizeString(data.email),
    postalCode: sanitizeString(data.postalCode),
    cleaningDetails: data.cleaningDetails ? sanitizeString(data.cleaningDetails) : '',
    canWorkInCanada: data.canWorkInCanada ? sanitizeString(data.canWorkInCanada) : '',
    cleaningExperience: data.cleaningExperience ? sanitizeString(data.cleaningExperience) : ''
  };
  
  // Length validation
  if (sanitized.name.length < 2 || sanitized.name.length > 50) {
    return { isValid: false, error: 'Name must be 2-50 characters' };
  }
  
  if (sanitized.email.length > 100) {
    return { isValid: false, error: 'Email too long' };
  }
  
  if (sanitized.cleaningDetails && sanitized.cleaningDetails.length > 500) {
    return { isValid: false, error: 'Cleaning details too long' };
  }
  
  if (sanitized.cleaningExperience && sanitized.cleaningExperience.length > 500) {
    return { isValid: false, error: 'Experience description too long' };
  }
  
  return { isValid: true, ...sanitized };
}

function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  
  return str
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .substring(0, 1000); // Limit length
}

function logSubmission(ip, status) {
  const logSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('SubmissionLog') || 
                   SpreadsheetApp.getActiveSpreadsheet().insertSheet('SubmissionLog');
  
  if (logSheet.getRange(1, 1).getValue() === '') {
    // Initialize log sheet headers
    logSheet.getRange(1, 1, 1, 4).setValues([['Timestamp', 'IP Address', 'Status', 'Details']]);
  }
  
  logSheet.appendRow([new Date(), ip, status, '']);
}

function logSecurityEvent(ip, eventType) {
  const logSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('SecurityLog') || 
                   SpreadsheetApp.getActiveSpreadsheet().insertSheet('SecurityLog');
  
  if (logSheet.getRange(1, 1).getValue() === '') {
    // Initialize security log sheet headers
    logSheet.getRange(1, 1, 1, 4).setValues([['Timestamp', 'IP Address', 'Event Type', 'Details']]);
  }
  
  logSheet.appendRow([new Date(), ip, eventType, '']);
}

function doGet() {
  return ContentService.createTextOutput('Form submission endpoint is working!');
}
```

function doGet() {
  return ContentService.createTextOutput('Form submission endpoint is working!');
}
```

3. **Save the script** (Ctrl+S or Cmd+S)
4. **Name it** something like "Skrubb Form Handler"

## Step 3: Set up reCAPTCHA (Recommended)

1. **Go to [Google reCAPTCHA](https://www.google.com/recaptcha/admin)**
2. **Click "+" to create a new site**
3. **Choose "reCAPTCHA v2"** with "I'm not a robot" checkbox
4. **Add your domain** (or use localhost for testing)
5. **Copy the Site Key and Secret Key**
6. **Update the CONFIG object** in your Apps Script with your Secret Key

## Step 4: Set Up Sheet Permissions

### **Share Both Sheets with Apps Script:**
1. **Open each Google Sheet**
2. **Click "Share"** (top right)
3. **Add your Google account** (the one running the Apps Script)
4. **Set permission** to "Editor"
5. **Click "Done"**

### **Why This is Important:**
- **Apps Script needs access** to both sheets
- **Without proper permissions**, the script will fail
- **Editor access** allows the script to add new rows

## Step 5: Deploy the Script

1. **Click "Deploy"** in the Apps Script editor
2. **Choose "New deployment"**
3. **Set the following options:**
   - **Type**: Web app
   - **Execute as**: Me
   - **Who has access**: Anyone
4. **Click "Deploy"**
5. **Authorize the app** when prompted (click "Continue" and allow permissions)
6. **Copy the Web app URL** that appears after deployment

## Step 4: Update Your Configuration

1. **Open `config.js`** in your project
2. **Replace** `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` with the actual URL you copied
3. **Save the file**

Example:
```javascript
GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbz.../exec',
```

## Step 5: Test the Integration

1. **Open your landing page** in a browser
2. **Fill out and submit** one of the waiting list forms
3. **Check your Google Sheet** - you should see a new row with the submitted data
4. **Check the browser console** for any error messages

## Benefits of Separate Sheets

### **Better Organization**
- **Client data** is completely separate from contractor data
- **Easier to manage** different types of submissions
- **Cleaner data structure** - no mixed field types

### **Business Advantages**
- **Targeted marketing** - send different campaigns to each group
- **Separate analytics** - track conversion rates for each audience
- **Different workflows** - handle clients vs contractors differently
- **Easier reporting** - generate specific reports for each group

### **Data Management**
- **No data mixing** - clients won't see contractor fields
- **Easier filtering** - each sheet has relevant columns only
- **Better scalability** - can add different fields for each group later

## Security Features

### **Rate Limiting**
- **Hourly limit**: 5 submissions per IP address per hour
- **Daily limit**: 20 submissions per IP address per day
- **Automatic blocking**: IPs exceeding limits are temporarily blocked

### **Input Validation & Sanitization**
- **Required field validation** - All required fields must be present
- **Format validation** - Email and postal code formats are verified
- **Length limits** - Prevents extremely long submissions
- **XSS protection** - Removes potentially dangerous HTML/JavaScript

### **reCAPTCHA Integration**
- **Bot protection** - Prevents automated form submissions
- **Human verification** - Ensures real users are submitting forms
- **Configurable** - Can be enabled/disabled in CONFIG

### **Security Logging**
- **Submission logs** - Tracks all form submissions with IP addresses
- **Security events** - Logs blocked IPs, rate limit violations, etc.
- **Audit trail** - Complete history for security monitoring

### **IP Address Tracking**
- **Submission logging** - All submissions include IP addresses
- **Blocked IP management** - Easy to add/remove blocked IPs
- **Security monitoring** - Track suspicious activity patterns

## Troubleshooting

### **Common Issues:**

1. **"401 Unauthorized" error**
   - **Re-deploy the script** as a Web App
   - **Check permissions** - script must be authorized
   - **Verify sheet sharing** - both sheets must be shared with your Google account
   - **Re-authorize** the script if needed

2. **"Script not found" error**
   - Make sure you copied the entire Web app URL
   - Ensure the script is deployed and accessible to "Anyone"

3. **Form submits but no data appears**
   - Check the Apps Script execution log in the Apps Script editor
   - Verify the sheet name matches exactly
   - **Check sheet IDs** are correct in the CONFIG

4. **CORS errors in console**
   - This is normal with Google Apps Script - the form will still work
   - The `no-cors` mode handles this automatically

5. **Permission denied errors**
   - Make sure you set "Who has access" to "Anyone"
   - Re-deploy the script if needed

### **Quick Fix for 401 Error:**

1. **Go to Google Apps Script editor**
2. **Click "Deploy" → "Manage deployments"**
3. **Delete the current deployment**
4. **Create new deployment** with same settings:
   - **Type**: Web app
   - **Execute as**: Me
   - **Who has access**: Anyone
5. **Copy the new Web app URL**
6. **Update your config.js** with the new URL
7. **Test the form** again

### **Testing the Script:**

1. **In Apps Script editor**, click the "Test" button
2. **Choose "doGet"** function and click "Test"
3. **You should see** "Form submission endpoint is working!"

## Security Considerations

- **Anyone with the Web app URL** can submit data to your sheet
- **Consider adding validation** in the Apps Script if needed
- **Monitor your sheet** for spam submissions
- **You can revoke access** by deleting the deployment

## Configuration Options

### **Security Settings**
```javascript
const CONFIG = {
  MAX_SUBMISSIONS_PER_HOUR: 5,        // Adjust hourly limit
  MAX_SUBMISSIONS_PER_DAY: 20,        // Adjust daily limit
  BLOCKED_IPS: ['192.168.1.1'],       // Add IPs to block
  ENABLE_RECAPTCHA: true,             // Enable/disable reCAPTCHA
  RECAPTCHA_SECRET_KEY: 'your_key',   // Your reCAPTCHA secret key
  
  // Google Sheets IDs - Replace with your actual sheet IDs
  CLIENT_SHEET_ID: '1ABC123...XYZ',   // Client sheet ID
  CONTRACTOR_SHEET_ID: '1DEF456...ABC' // Contractor sheet ID
};
```

### **Customize Rate Limits**
- **Hourly limit**: Change `MAX_SUBMISSIONS_PER_HOUR` value
- **Daily limit**: Change `MAX_SUBMISSIONS_PER_DAY` value
- **Block IPs**: Add IP addresses to `BLOCKED_IPS` array

### **Enable/Disable Features**
- **reCAPTCHA**: Set `ENABLE_RECAPTCHA` to `false` to disable
- **Logging**: Modify logging functions to change what gets logged
- **Validation**: Adjust validation rules in `validateAndSanitizeInput`

## Advanced Features

### **Custom Validation Rules**
```javascript
// Add this to validateAndSanitizeInput function
if (data.name.toLowerCase().includes('spam')) {
  return { isValid: false, error: 'Invalid name detected' };
}
```

### Add Rate Limiting:
```javascript
// Add this to prevent spam
const lastSubmission = sheet.getRange(sheet.getLastRow(), 1).getValue();
const timeDiff = new Date() - lastSubmission;
if (timeDiff < 60000) { // 1 minute
  throw new Error('Please wait before submitting again');
}
```

### Send Email Notifications:
```javascript
// Add this after sheet.appendRow(rowData)
if (data.type === 'contractor') {
  MailApp.sendEmail({
    to: 'your-email@example.com',
    subject: 'New Contractor Application',
    body: `Name: ${data.name}\nEmail: ${data.email}\nServices: ${data.services}`
  });
}
```

## Support

If you encounter issues:
1. Check the Apps Script execution logs
2. Verify the Web app URL is correct
3. Ensure the Google Sheet has the correct column structure
4. Test with a simple form submission first

The integration should work seamlessly once properly configured!
