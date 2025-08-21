// Configuration file for Skrubb Landing Page
const CONFIG = {
    // Google Apps Script Web App URL - Replace with your actual URL after deployment
    GOOGLE_SCRIPT_URL: 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE',
    
    // Form submission settings
    SUBMISSION_TIMEOUT: 10000, // 10 seconds
    
    // Notification settings
    NOTIFICATION_DURATION: 5000, // 5 seconds
    
    // API endpoints (for future use)
    API_ENDPOINTS: {
        waitingList: '/api/waiting-list',
        contact: '/api/contact'
    }
};

// Make config available globally
window.CONFIG = CONFIG;
