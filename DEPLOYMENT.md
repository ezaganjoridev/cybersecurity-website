# Deployment Guide - GitHub Pages & Contact Form

## Part 1: Deploy to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **+** icon (top right) → **New repository**
3. Name it: `cybersecurity-website` (or any name you prefer)
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README (you already have one)
6. Click **Create repository**

### Step 2: Install GitHub Pages Package

```bash
npm install --save-dev gh-pages
```

### Step 3: Update package.json

The package.json needs to be updated with your GitHub username. Open `package.json` and add:

```json
{
  "name": "cybersecurity-services",
  "private": true,
  "version": "1.0.0",
  "homepage": "https://YOUR_GITHUB_USERNAME.github.io/cybersecurity-website",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

**Replace `YOUR_GITHUB_USERNAME`** with your actual GitHub username.

### Step 4: Update vite.config.js

Update the Vite config for GitHub Pages:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/cybersecurity-website/', // Match your repo name
  server: {
    port: 3000,
    open: true
  }
})
```

### Step 5: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Cybersecurity website"

# Add your GitHub repository (replace with your repo URL)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/cybersecurity-website.git

# Push to main branch
git branch -M main
git push -u origin main
```

### Step 6: Deploy to GitHub Pages

```bash
npm run deploy
```

This will:
1. Build your website
2. Create a `gh-pages` branch
3. Push the built files to GitHub

### Step 7: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select `gh-pages` branch
4. Click **Save**
5. Your site will be live at: `https://YOUR_GITHUB_USERNAME.github.io/cybersecurity-website`

---

## Part 2: Contact Form Solution

GitHub Pages only hosts static files, so you need a backend service for the contact form. Here are the best options:

### Option 1: Formspree (Easiest - Recommended)

**Pros:** Free tier, no backend needed, 50 submissions/month
**Setup time:** 2 minutes

1. Go to [Formspree.io](https://formspree.io) and sign up
2. Create a new form
3. Copy your form endpoint (looks like: `https://formspree.io/f/YOUR_FORM_ID`)
4. Update the Contact component

### Option 2: EmailJS (Free & Popular)

**Pros:** 200 emails/month free, easy setup
**Setup time:** 5 minutes

1. Sign up at [EmailJS.com](https://www.emailjs.com)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your credentials (Service ID, Template ID, Public Key)

### Option 3: Netlify Forms (If using Netlify)

**Pros:** Built-in, unlimited submissions
**Setup time:** 1 minute

Simply add `netlify` attribute to your form tag.

### Option 4: Web3Forms (Simple & Free)

**Pros:** No registration, unlimited forms
**Setup time:** 2 minutes

1. Go to [Web3Forms.com](https://web3forms.com)
2. Get a free access key

---

## Implementing Formspree (Recommended)

### Step 1: Sign up for Formspree

1. Go to https://formspree.io
2. Sign up with your email
3. Verify your email
4. Click "New Form"
5. Name it "Contact Form"
6. Copy your form endpoint: `https://formspree.io/f/YOUR_FORM_ID`

### Step 2: Update Contact.jsx

Replace the `handleSubmit` function in `src/components/Contact.jsx`:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        service: formData.service,
        message: formData.message
      })
    });

    if (response.ok) {
      setSubmitted(true);
      setFormData({ name: '', email: '', company: '', service: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } else {
      alert('Failed to send message. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to send message. Please email directly.');
  }
};
```

**Replace `YOUR_FORM_ID`** with your actual Formspree form ID.

### Step 3: Test Locally

```bash
npm run dev
```

Fill out the form and submit. Check your Formspree dashboard for submissions.

### Step 4: Deploy Updates

```bash
git add .
git commit -m "Add Formspree integration"
git push
npm run deploy
```

---

## Alternative: EmailJS Implementation

If you prefer EmailJS, here's the setup:

### Step 1: Install EmailJS

```bash
npm install @emailjs/browser
```

### Step 2: Update Contact.jsx

```javascript
import emailjs from '@emailjs/browser';

const handleSubmit = (e) => {
  e.preventDefault();

  emailjs.send(
    'YOUR_SERVICE_ID',
    'YOUR_TEMPLATE_ID',
    {
      from_name: formData.name,
      from_email: formData.email,
      company: formData.company,
      service: formData.service,
      message: formData.message,
    },
    'YOUR_PUBLIC_KEY'
  )
  .then(() => {
    setSubmitted(true);
    setFormData({ name: '', email: '', company: '', service: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  })
  .catch((error) => {
    console.error('Error:', error);
    alert('Failed to send message. Please try again.');
  });
};
```

### Step 3: Get EmailJS Credentials

1. Sign up at https://www.emailjs.com
2. Add email service (Gmail recommended)
3. Create email template with variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`, etc.
4. Get your Service ID, Template ID, and Public Key from dashboard

---

## Testing Your Deployed Site

After deployment:

1. Visit your GitHub Pages URL
2. Test all navigation links
3. Try submitting the contact form
4. Check form submissions in Formspree/EmailJS dashboard
5. Verify email delivery

---

## Updating Your Site

To make changes and redeploy:

```bash
# Make your changes to the code

# Test locally
npm run dev

# Commit changes
git add .
git commit -m "Description of changes"
git push

# Deploy to GitHub Pages
npm run deploy
```

---

## Custom Domain (Optional)

To use your own domain instead of GitHub Pages URL:

1. Buy a domain (Namecheap, GoDaddy, etc.)
2. In your repo, create a file `public/CNAME` with your domain: `www.yourdomain.com`
3. In your domain registrar, add DNS records:
   - Type: `A` → Value: `185.199.108.153`
   - Type: `A` → Value: `185.199.109.153`
   - Type: `A` → Value: `185.199.110.153`
   - Type: `A` → Value: `185.199.111.153`
4. Deploy again: `npm run deploy`
5. In GitHub Settings → Pages, enter your custom domain

---

## Troubleshooting

### Issue: Page shows blank after deployment
**Solution:** Check that `base` in `vite.config.js` matches your repo name

### Issue: Links don't work on GitHub Pages
**Solution:** Use HashRouter instead of BrowserRouter in App.jsx

### Issue: Contact form doesn't send
**Solution:** Check browser console for errors, verify Formspree/EmailJS credentials

### Issue: CSS not loading
**Solution:** Clear cache, check vite.config.js base path

---

## Alternative Hosting Options

### Vercel (Recommended for simplicity)
1. Push code to GitHub
2. Go to [Vercel.com](https://vercel.com)
3. Import your repository
4. Deploy (automatic)
5. Contact forms work the same way

### Netlify
1. Push code to GitHub
2. Go to [Netlify.com](https://netlify.com)
3. Import repository
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Can use built-in Netlify Forms

---

## Support

For issues:
- GitHub Pages: https://docs.github.com/pages
- Formspree: https://help.formspree.io
- EmailJS: https://www.emailjs.com/docs

Contact: cloudsecurecanada@gmail.com
