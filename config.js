// Configuration file for Skrubb Landing Page
const CONFIG = {
    // Google Apps Script Web App URL - Replace with your actual URL after deployment
    GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbxK3YfwmbULedxnKPVi4rGkSkAaSQUoGE_Mvah8hj3vswLQ53hZRg5gEnvz_qGjCArZ6g/exec',
    
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
