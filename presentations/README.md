# Cashscript Workshop Presentations

This directory contains all the presentation materials for the Cashscript Workshop, built with RevealJS for an interactive learning experience.

## Quick Start

1. **Start the presentation server:**
   ```bash
   npm run present
   ```

2. **Open your browser to:**
   ```
   http://localhost:8080
   ```

3. **Navigate through the workshop:**
   - Start with `index.html` for the main workshop overview
   - Follow the day-by-day structure
   - Use the navigation links between sessions

## Presentation Structure

### Main Entry Point
- `index.html` - Workshop overview and navigation hub

### Day 1: Foundations
- **Morning Sessions** (`day1/morning/`)
  - `01-blockchain-basics.html` - Blockchain fundamentals
  - `02-cryptography.html` - Cryptography basics
  - `03-bitcoin-cash.html` - Bitcoin Cash overview
  - `04-utxo-model.html` - UTXO model explanation
  - `05-smart-contracts-intro.html` - Smart contracts introduction

- **Afternoon Sessions** (`day1/afternoon/`)
  - `01-cashscript-language.html` - Cashscript language basics
  - `02-contract-structure.html` - Contract structure and patterns
  - `03-practical-examples.html` - Hands-on examples
  - `04-testing-deployment.html` - Testing and deployment

### Day 2: Integration
- **Morning Sessions** (`day2/morning/`)
  - `01-quasar-overview.html` - Quasar Framework overview
  - `02-cashscript-integration.html` - Integrating Cashscript with Quasar
  - `03-frontend-development.html` - Frontend development practices
  - `04-state-management.html` - State management with Pinia

- **Afternoon Sessions** (`day2/afternoon/`)
  - `01-project-guidelines.html` - Group project guidelines
  - `02-available-templates.html` - Available project templates
  - `03-group-work-instructions.html` - Group work instructions

## Features

- **Interactive Elements** - Live demos and exercises
- **Responsive Design** - Works on all devices
- **Navigation** - Easy movement between sessions
- **Code Examples** - Syntax-highlighted code blocks
- **Progress Tracking** - Visual progress indicators
- **Keyboard Shortcuts** - Full keyboard navigation support

## Keyboard Controls

- **Space** or **→** - Next slide
- **←** - Previous slide
- **↑** - Previous slide
- **↓** - Next slide
- **F** - Fullscreen
- **S** - Speaker notes
- **O** - Overview mode
- **ESC** - Overview mode

## Customization

### CSS Files
- `css/theme.css` - Main workshop theme and layout
- `css/custom.css` - Additional custom styles and components

### JavaScript
- `js/reveal-config.js` - RevealJS configuration and plugins

### Adding New Presentations
1. Create your HTML file following the existing structure
2. Include the necessary CSS and JavaScript files
3. Add navigation links to and from your presentation
4. Update the main navigation in `index.html`

## Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## Troubleshooting

### Presentation won't load
- Check that the server is running (`npm run present`)
- Verify all file paths are correct
- Check browser console for JavaScript errors

### Styles not loading
- Ensure CSS files are in the correct location
- Check that file paths in HTML are correct
- Verify CSS syntax is valid

### Interactive elements not working
- Check that JavaScript is enabled
- Verify all required scripts are loaded
- Check browser console for errors

## Development

### Live Reload
For development with automatic reloading:
```bash
npm run dev
```

### Adding New Features
1. Modify CSS files for styling changes
2. Update JavaScript files for functionality
3. Test across different browsers and devices
4. Ensure accessibility standards are met

## Resources

- [RevealJS Documentation](https://revealjs.com/)
- [Font Awesome Icons](https://fontawesome.com/)
- [Cashscript Documentation](https://cashscript.org/)
- [Quasar Framework](https://quasar.dev/)

## Support

If you encounter issues with the presentations:
1. Check the troubleshooting section above
2. Review browser console for error messages
3. Verify all dependencies are installed
4. Contact the workshop organizers

---

**Happy learning! 🚀** 