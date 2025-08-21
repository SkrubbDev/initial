# 🧹 Skrubb Landing Page

A modern, secure landing page for Skrubb cleaning service with waiting list functionality.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev:full

# Build for production
npm run build
```

## 📱 Live Demo

Visit: [https://skrubb-waitinglist.netlify.app/](https://skrubb-waitinglist.netlify.app/)

## ✨ Features

- **Secure Form Handling** - Backend API with rate limiting
- **Modern Design** - Tailwind CSS with custom brand colors
- **Responsive Layout** - Mobile-first design approach
- **Google Sheets Integration** - Automatic data collection
- **Security First** - CORS protection, input validation, CSP headers

## 🏗️ Architecture

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Tailwind CSS with custom components
- **Backend**: Netlify serverless functions
- **Data Storage**: Google Sheets via Apps Script
- **Deployment**: Netlify with automatic builds

## 📚 Documentation

All detailed documentation is organized in the [`docs/`](./docs/) folder:

- [**README.md**](./docs/README.md) - Original project overview
- [**GOOGLE_SHEETS_SETUP.md**](./docs/GOOGLE_SHEETS_SETUP.md) - Google Sheets configuration
- [**SECURITY_UPGRADE.md**](./docs/SECURITY_UPGRADE.md) - Security implementation details
- [**TAILWIND_SETUP.md**](./docs/TAILWIND_SETUP.md) - Tailwind CSS configuration
- [**NETLIFY_DEPLOYMENT.md**](./docs/NETLIFY_DEPLOYMENT.md) - Deployment guide

## 🛠️ Development

```bash
# Development scripts
npm run dev          # Backend server only
npm run dev:css      # CSS watching only
npm run dev:full     # Both server and CSS (recommended)
npm run build        # Production CSS build
npm run build:watch  # CSS watching for development
```

## 🔒 Security Features

- Rate limiting (10 requests per IP per 15 minutes)
- Input validation and sanitization
- Content Security Policy (CSP) headers
- CORS protection
- Environment variable protection

## 🎨 Customization

- **Colors**: Edit `src/input.css` for brand colors
- **Fonts**: Google Fonts integration (Lexend Exa)
- **Components**: Custom Tailwind component classes
- **Forms**: Modular form generation system

## 📦 Project Structure

```
├── docs/                    # 📚 Documentation
├── images/                  # 🖼️ Brand assets
├── netlify/                 # ☁️ Netlify configuration
│   └── functions/          # ⚡ Serverless functions
├── src/                     # 🎨 CSS source
│   └── input.css           # Tailwind input file
├── dist/                    # 🚀 Compiled CSS
├── index.html              # 🏠 Main landing page
├── script.js               # ⚙️ Frontend logic
├── config.js               # ⚙️ Configuration
├── package.json            # 📦 Dependencies
├── tailwind.config.js      # 🎨 Tailwind config
└── netlify.toml           # ☁️ Netlify settings
```

## 🚀 Deployment

This project is configured for automatic deployment on Netlify:

1. **Git Integration**: Push to main branch triggers auto-deploy
2. **Environment Variables**: Set `GOOGLE_SCRIPT_URL` in Netlify dashboard
3. **Functions**: Serverless functions handle form submissions
4. **Build Process**: Automatic CSS compilation and optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

---

**Built with ❤️ for Skrubb cleaning service**
