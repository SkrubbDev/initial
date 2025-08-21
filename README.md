# Skrubb Landing Page

A modern, responsive landing page for Skrubb cleaning services with integrated Google Sheets functionality.

## File Structure

```
├── index.html          # Main landing page
├── script.js           # JavaScript functionality, forms, and validation
├── config.js           # Configuration settings
├── GOOGLE_SHEETS_SETUP.md  # Google Sheets integration guide
└── images/             # Logo and image assets
    ├── skrubb-on-dark.svg
    └── skrubb-on-light.svg
```

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dynamic Forms**: Client and contractor waiting list forms
- **Form Validation**: Comprehensive client-side validation
- **Google Sheets Integration**: Automatic data collection
- **Modern UI**: Clean, professional design with smooth animations

## Form Types

### Client Form
- Full Name
- Email Address
- Postal Code (Canadian format)
- Cleaning Details

### Contractor Form
- Full Name
- Email Address
- Postal Code (Canadian format)
- Work Authorization in Canada
- Cleaning Experience

## Setup

1. **Configure Google Sheets**: Follow the guide in `GOOGLE_SHEETS_SETUP.md`
2. **Update Configuration**: Set your Google Apps Script URL in `config.js`
3. **Deploy**: Upload all files to your web server

## How It Works

1. **Main Page**: `index.html` loads the landing page content
2. **Form Generation**: `script.js` generates forms dynamically when the page loads
3. **Form Validation**: Real-time validation with immediate user feedback
4. **Data Submission**: Forms send data to Google Sheets via Google Apps Script
5. **Seamless Experience**: No loading delays or external file dependencies

## Browser Support

- Modern browsers with ES6+ support
- Requires JavaScript enabled
- Responsive design works on all device sizes

## Customization

- **Colors**: Modify Tailwind config in `index.html`
- **Form Fields**: Edit the `generateForms()` function in `script.js`
- **Validation**: Update validation rules in `script.js`
- **Styling**: Use Tailwind utility classes for consistent design

## Troubleshooting

- **Forms not working**: Check browser console for JavaScript errors
- **Validation issues**: Ensure all required fields are completed
- **Google Sheets**: Verify Apps Script deployment and permissions
- **Styling**: Confirm Tailwind CSS is loading properly
