# Tailwind CSS CLI Setup

## What We've Accomplished

✅ **Replaced CDN with Tailwind CLI** - Better performance and control  
✅ **Custom CSS compilation** - Only includes used utilities  
✅ **Development workflow** - Automatic CSS rebuilding  
✅ **Production builds** - Minified CSS output  
✅ **Custom color system** - Maintains your brand colors  

## File Structure

```
src/
├── input.css          # Tailwind directives + custom styles
dist/
├── output.css         # Compiled CSS (24KB vs 3MB+ CDN)
```

## Available Scripts

### Development
```bash
# Start backend server only
npm run dev

# Start CSS watch process only  
npm run dev:css

# Start both server + CSS watch (recommended)
npm run dev:full
# or
./dev.sh
```

### Production
```bash
# Build minified CSS
npm run build

# Build CSS and watch for changes
npm run build:watch
```

## Custom Colors

Your brand colors are now defined in CSS variables:

```css
:root {
  --color-primary: #16c5bb;      /* Teal */
  --color-primary-dark: #0fa39b; /* Darker teal */
  --color-secondary: #02152b;    /* Dark blue */
  --color-accent: #333333;       /* Dark gray */
}
```

## Benefits of CLI vs CDN

| Feature | CDN | CLI |
|---------|-----|------|
| **File Size** | 3MB+ | 24KB |
| **Performance** | Slower | Faster |
| **Customization** | Limited | Full control |
| **Offline** | No | Yes |
| **Version Control** | No | Yes |

## Development Workflow

1. **Edit CSS** in `src/input.css`
2. **CSS auto-rebuilds** when you save
3. **Refresh browser** to see changes
4. **Server auto-restarts** when you edit JavaScript

## Production Deployment

1. **Build CSS**: `npm run build`
2. **Deploy files**: `index.html`, `dist/output.css`, `script.js`, `server.js`
3. **Set environment**: Production `.env` file
4. **Start server**: `npm start`

## Troubleshooting

### CSS not updating?
- Check if `npm run build:watch` is running
- Verify file paths in `tailwind.config.js`
- Clear browser cache

### Server not starting?
- Check if port 3000 is available
- Verify `.env` file exists
- Check Node.js version (requires 16+)

### Colors not working?
- Rebuild CSS after color changes
- Check CSS variable definitions
- Verify class names in HTML
