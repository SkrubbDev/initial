const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware with custom CSP for development
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            scriptSrcAttr: ["'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.googleapis.com", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"],
            frameSrc: ["'self'"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: []
        }
    }
}));

app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://yourdomain.com'] // Replace with your actual domain
        : ['http://localhost:3000', 'http://127.0.0.1:3000']
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '1mb' }));
app.use(express.static('.')); // Serve static files

// Load environment variables
require('dotenv').config();

// Google Apps Script URL (stored server-side, not exposed to client)
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

// Form validation functions
function validateName(name) {
    if (!name || name.trim().length < 2 || name.trim().length > 50) {
        return false;
    }
    return /^[a-zA-Z\s\-']+$/.test(name.trim());
}

function validateEmail(email) {
    if (!email || email.trim().length === 0 || email.trim().length > 100) {
        return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

function validatePostalCode(postalCode) {
    if (!postalCode || postalCode.trim().length === 0) {
        return false;
    }
    const postalCodeRegex = /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/;
    return postalCodeRegex.test(postalCode.trim());
}

function validateCleaningDetails(details, type) {
    if (type === 'client') {
        if (!details || details.trim().length < 10 || details.trim().length > 500) {
            return false;
        }
    }
    return true;
}

function validateContractorFields(data) {
    if (data.type === 'contractor') {
        if (!data.canWorkInCanada || data.canWorkInCanada === '') {
            return false;
        }
        if (!data.cleaningExperience || data.cleaningExperience.trim().length < 10 || data.cleaningExperience.trim().length > 500) {
            return false;
        }
    }
    return true;
}

// API endpoint for form submissions
app.post('/api/submit-form', async (req, res) => {
    try {
        const data = req.body;
        
        // Validate request data
        if (!data || !data.type || !['client', 'contractor'].includes(data.type)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid form type' 
            });
        }
        
        // Validate required fields
        if (!validateName(data.name)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid name' 
            });
        }
        
        if (!validateEmail(data.email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid email' 
            });
        }
        
        if (!validatePostalCode(data.postalCode)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid postal code' 
            });
        }
        
        if (!validateCleaningDetails(data.cleaningDetails || data.cleaningExperience, data.type)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid cleaning details/experience' 
            });
        }
        
        if (!validateContractorFields(data)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid contractor fields' 
            });
        }
        
        // Sanitize data
        const sanitizedData = {
            type: data.type,
            name: data.name.trim(),
            email: data.email.trim().toLowerCase(),
            postalCode: data.postalCode.trim().toUpperCase(),
            timestamp: new Date().toISOString(),
            ip: req.ip
        };
        
        // Add type-specific fields
        if (data.type === 'client') {
            sanitizedData.cleaningDetails = data.cleaningDetails.trim();
        } else if (data.type === 'contractor') {
            sanitizedData.canWorkInCanada = data.canWorkInCanada;
            sanitizedData.cleaningExperience = data.cleaningExperience.trim();
        }
        
        // Submit to Google Apps Script
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sanitizedData)
        });
        
        if (!response.ok) {
            throw new Error(`Google Apps Script responded with status: ${response.status}`);
        }
        
        // Log successful submission (you might want to add database logging here)
        console.log(`Form submitted successfully: ${data.type} - ${data.email}`);
        
        res.json({ 
            success: true, 
            message: 'Form submitted successfully' 
        });
        
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error. Please try again later.' 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString() 
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Google Apps Script URL: ${GOOGLE_SCRIPT_URL ? 'Configured' : 'NOT CONFIGURED'}`);
});

module.exports = app;
