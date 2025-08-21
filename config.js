// Configuration file for Skrubb Landing Page
const CONFIG = {
    // Backend API endpoint for secure form submission
    API_ENDPOINT: '/api/submit-form',
    
    // Form submission settings
    SUBMISSION_TIMEOUT: 10000, // 10 seconds
    
    // Notification settings
    NOTIFICATION_DURATION: 5000, // 5 seconds
    
    // API endpoints (for future use)
    API_ENDPOINTS: {
        waitingList: '/api/submit-form',
        contact: '/api/contact',
        health: '/api/health'
    }
};

// Make config available globally
window.CONFIG = CONFIG;
