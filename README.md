# Skrubb Landing Page

A modern, responsive landing page for Skrubb cleaning services with waiting list functionality.

## Features

- 🎨 Modern, responsive design with Tailwind CSS
- 📱 Mobile-first approach
- 📝 Interactive forms for clients and contractors
- 🔄 Real-time form validation
- 📊 Google Sheets integration for data collection
- 🎯 Beautiful UI with smooth animations

## Local Development Setup

### Option 1: Using Node.js (Recommended)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   The page will automatically open at `http://localhost:3000`

### Option 2: Using Python

If you prefer Python or don't have Node.js installed:

1. **Start Python server:**
   ```bash
   # For Python 3
   npm run serve
   
   # For Python 2
   npm run serve-python
   ```

2. **Open your browser:**
   Navigate to `http://localhost:3000`

### Option 3: Manual Server

You can also use any local server of your choice:
- VS Code Live Server extension
- Browser-sync
- Any other local development server

## Project Structure

```
skrubb-landing-page/
├── index.html          # Main HTML file
├── script.js           # JavaScript functionality
├── config.js           # Configuration settings
├── images/             # Logo and image assets
├── package.json        # Dependencies and scripts
└── README.md           # This file
```

## Development Commands

- `npm run dev` - Start development server with live reload
- `npm start` - Same as dev command
- `npm run serve` - Start Python 3 server
- `npm run serve-python` - Start Python 2 server

## Configuration

Edit `config.js` to modify:
- Google Apps Script URL
- Form submission settings
- Notification durations
- API endpoints

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- The development server runs on port 3000 by default
- Live reload is enabled for automatic browser refresh on file changes
- All form submissions go to Google Sheets via Google Apps Script
- The page is fully responsive and works on all device sizes

## Troubleshooting

If you encounter issues:

1. **Port already in use:** Change the port in package.json scripts
2. **Node.js not found:** Install Node.js from [nodejs.org](https://nodejs.org/)
3. **Python not found:** Install Python from [python.org](https://python.org/)

For more help, check the console for error messages or refer to the browser's developer tools.
