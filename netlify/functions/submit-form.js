const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse the request body
    const data = JSON.parse(event.body);
    
    // Basic validation
    if (!data.email || !data.type) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false, 
          message: 'Email and type are required' 
        })
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false, 
          message: 'Invalid email format' 
        })
      };
    }

    // Get Google Apps Script URL from environment variable
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
    
    if (!GOOGLE_SCRIPT_URL) {
      console.error('GOOGLE_SCRIPT_URL environment variable not set');
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          success: false, 
          message: 'Server configuration error' 
        })
      };
    }

    // Prepare data for Google Apps Script
    // Google Apps Script expects form data in a specific format
    const formData = new URLSearchParams();
    formData.append('email', data.email);
    formData.append('type', data.type);
    formData.append('timestamp', new Date().toISOString());

    console.log('Sending to Google Apps Script:', {
      url: GOOGLE_SCRIPT_URL,
      data: Object.fromEntries(formData.entries())
    });

    // Send to Google Apps Script
    console.log('About to send request to:', GOOGLE_SCRIPT_URL);
    console.log('Request body:', formData.toString());
    
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Apps Script error response:', errorText);
      throw new Error(`Google Apps Script responded with status: ${response.status}: ${errorText}`);
    }

    // Handle different response formats from Google Apps Script
    let result;
    try {
      result = await response.text();
      console.log('Google Apps Script response:', result);
    } catch (parseError) {
      console.log('Response received but could not parse as text');
    }

    console.log('Form submitted successfully:', data.type, '-', data.email);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Form submitted successfully' 
      })
    };

  } catch (error) {
    console.error('Error submitting form:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ 
        success: false, 
        message: 'Internal server error' 
      })
    };
  }
};
