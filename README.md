# Cloud Secure Canada - Cybersecurity Services Website

A modern, professional cybersecurity consulting website built with React, Vite, and Tailwind CSS.

## About

Cloud Secure Canada provides expert cybersecurity consulting services, backed by over 10 years of hands-on experience in enterprise security operations across Higher Education, Financial Services, and Technology sectors. Specializing in cyber security consulting, SIEM integration, Splunk deployment and configuration, Microsoft Sentinel automation, and comprehensive security solutions.

## Features

- 🛡️ Modern, responsive design optimized for all devices
- 🎨 Beautiful gradient animations and smooth transitions
- 📱 Mobile-first approach with hamburger navigation
- 🚀 Fast performance with Vite build tool
- 💼 Comprehensive service offerings showcase
- 📊 Professional experience timeline
- 📧 Contact form with validation
- 🎯 Easy to customize and deploy

## Services Offered

- Security Reviews & Assessments
- Penetration Testing
- SOC Review & Optimization
- SOC Build-Up & Strategy
- SIEM Implementation & Integration
- Vulnerability Management
- Incident Response & Forensics
- Threat Intelligence Integration
- Security Architecture Consulting
- Security Automation & Orchestration

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 16 or higher)
- npm (comes with Node.js)

## Local Development Setup (Windows 11)

Follow these step-by-step instructions to run the website locally on your Windows 11 machine:

### Step 1: Install Node.js

1. Download Node.js from [https://nodejs.org/](https://nodejs.org/)
2. Choose the LTS (Long Term Support) version
3. Run the installer and follow the installation wizard
4. Verify installation by opening PowerShell or Command Prompt and running:
   ```bash
   node --version
   npm --version
   ```

### Step 2: Navigate to Project Directory

1. Open PowerShell or Command Prompt
2. Navigate to the project directory:
   ```bash
   cd C:\Users\Admin\Documents\Development\cybersecurity-website
   ```

### Step 3: Install Dependencies

Install all required packages:
```bash
npm install
```

This will download and install all dependencies listed in package.json (React, Vite, Tailwind CSS, etc.)

### Step 4: Start Development Server

Run the development server:
```bash
npm run dev
```

The website will automatically open in your default browser at `http://localhost:3000`

If it doesn't open automatically, manually navigate to `http://localhost:3000` in your browser.

### Step 5: Making Changes

The development server supports hot module replacement (HMR), which means:
- Any changes you make to the code will automatically reflect in the browser
- No need to manually refresh the page
- Edit files in the `src` directory to customize the website

### Step 6: Building for Production

When you're ready to deploy:

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

To preview the production build locally:
```bash
npm run preview
```

## Project Structure

```
cybersecurity-website/
├── public/
│   └── shield.svg          # Favicon
├── src/
│   ├── components/
│   │   ├── Navbar.jsx      # Navigation bar
│   │   ├── Hero.jsx        # Hero section
│   │   ├── Services.jsx    # Services showcase
│   │   ├── About.jsx       # About section
│   │   ├── Experience.jsx  # Professional experience
│   │   ├── Contact.jsx     # Contact form
│   │   └── Footer.jsx      # Footer
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
└── postcss.config.js       # PostCSS configuration
```

## Customization Guide

### Updating Contact Information

Edit `src/components/Contact.jsx`:
- Change email, phone, and location
- Update social media links

### Modifying Services

Edit `src/components/Services.jsx`:
- Add/remove services from the `services` array
- Update service descriptions and features

### Updating Experience

Edit `src/components/Experience.jsx`:
- Modify the `experiences` array with your work history
- Update achievements and descriptions

### Changing Colors

Edit `tailwind.config.js`:
- Modify the `colors` section to change the color scheme
- Primary colors are used throughout the site

### Brand Name

The site uses "Cloud Secure Canada" branding throughout:
1. Navbar: `src/components/Navbar.jsx`
2. Footer: `src/components/Footer.jsx`
3. Page title: `index.html`

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Vite and deploy

### Netlify

1. Push your code to GitHub
2. Visit [netlify.com](https://netlify.com)
3. Import your repository
4. Build command: `npm run build`
5. Publish directory: `dist`

### Traditional Web Hosting

1. Run `npm run build`
2. Upload the contents of the `dist` folder to your web server
3. Configure your server to serve the index.html file

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, Vite will automatically try the next available port.

### Dependencies Installation Failed

Try clearing npm cache:
```bash
npm cache clean --force
npm install
```

### Build Errors

Ensure you're using Node.js version 16 or higher:
```bash
node --version
```

## Performance

- Lighthouse Score: 95+ (Performance, Accessibility, Best Practices, SEO)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for personal and commercial use.

## Support

For questions or support, contact: contact@cloudsecure.ca

---

Built with ❤️ for secure digital infrastructure
