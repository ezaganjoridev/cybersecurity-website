# Complete Deployment Guide - GitHub Pages with Custom Domain

## Overview
This guide will walk you through deploying your website to GitHub Pages with a custom domain while keeping your source code private and only showing the built website publicly.

---

## Part 1: Prepare Your Project for GitHub

### Step 1: Verify Your .gitignore File

Your `.gitignore` file should already exist. Let's verify it excludes sensitive information:

**Open:** `c:\Users\Admin\Documents\Development\cybersecurity-website\.gitignore`

It should contain:
```
node_modules
dist
dist-ssr
*.local
.env
.env.local
.env.production
.vscode/*
.DS_Store
```

### Step 2: Update package.json with Your GitHub Username

**Open:** `c:\Users\Admin\Documents\Development\cybersecurity-website\package.json`

Add these lines (you'll need your GitHub username):

```json
{
  "name": "cybersecurity-services",
  "homepage": "https://YOUR_GITHUB_USERNAME.github.io/cybersecurity-website",
  "private": true,
  ...
}
```

**Replace `YOUR_GITHUB_USERNAME`** with your actual GitHub username (you'll get this when you create your account).

### Step 3: Update vite.config.js

**Open:** `c:\Users\Admin\Documents\Development\cybersecurity-website\vite.config.js`

Update it to:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/cybersecurity-website/',
  server: {
    port: 3000,
    open: true
  }
})
```

---

## Part 2: Create GitHub Account and Repository

### Step 1: Create GitHub Account

1. Go to https://github.com
2. Click **Sign up**
3. Enter your email (use cloudsecurecanada@gmail.com or personal)
4. Create a password
5. Choose a username (e.g., `cloudsecurecanada` or similar)
6. Verify your account via email

### Step 2: Create a New Repository

1. Once logged in, click the **+** icon (top right) → **New repository**
2. **Repository name:** `cybersecurity-website`
3. **Description:** "Cloud Secure Canada - Professional Cybersecurity Services"
4. **Visibility:** Choose **Private** (keeps your source code hidden)
5. **DO NOT** check "Initialize this repository with a README"
6. Click **Create repository**

### Step 3: Save Your Repository URL

You'll see a URL like:
```
https://github.com/YOUR_USERNAME/cybersecurity-website.git
```

**Copy this URL** - you'll need it in the next steps.

---

## Part 3: Upload Your Website to GitHub

### Step 1: Install gh-pages Package

Open PowerShell in your project directory:

```powershell
cd C:\Users\Admin\Documents\Development\cybersecurity-website
npm install --save-dev gh-pages
```

### Step 2: Initialize Git (If Not Already Done)

```powershell
git init
```

### Step 3: Configure Git (First Time Only)

```powershell
git config --global user.name "Your Name"
git config --global user.email "cloudsecurecanada@gmail.com"
```

### Step 4: Add All Files

```powershell
git add .
```

### Step 5: Create Your First Commit

```powershell
git commit -m "Initial commit - Cloud Secure Canada website"
```

### Step 6: Connect to GitHub

**Replace `YOUR_USERNAME` with your actual GitHub username:**

```powershell
git remote add origin https://github.com/YOUR_USERNAME/cybersecurity-website.git
```

### Step 7: Push to GitHub

```powershell
git branch -M main
git push -u origin main
```

You'll be prompted to log in to GitHub. Enter your username and password.

**Note:** If you have 2FA enabled, you'll need to create a Personal Access Token:
- Go to GitHub → Settings → Developer settings → Personal access tokens → Generate new token
- Select "repo" scope
- Use the token as your password

### Step 8: Deploy to GitHub Pages

```powershell
npm run deploy
```

This will:
1. Build your website
2. Create a `gh-pages` branch
3. Deploy only the built website (not your source code)

---

## Part 4: Enable GitHub Pages

### Step 1: Configure GitHub Pages

1. Go to your repository on GitHub: `https://github.com/YOUR_USERNAME/cybersecurity-website`
2. Click **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar under "Code and automation")
4. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click **Save**

### Step 2: Wait for Deployment

- GitHub will take 2-5 minutes to deploy
- You'll see a green checkmark when ready
- Your site will be at: `https://YOUR_USERNAME.github.io/cybersecurity-website`

### Step 3: Test Your Website

Visit: `https://YOUR_USERNAME.github.io/cybersecurity-website`

Your website should now be live!

---

## Part 5: Register a Custom Domain

### Option A: Namecheap (Recommended - Good pricing)

1. Go to https://www.namecheap.com
2. Search for domains like:
   - `cloudsecurecanada.com`
   - `cloudsecurecanada.ca` (Canada-specific)
   - `cloudsecure.ca`
3. Add to cart (usually $10-15/year for .com, $15-20 for .ca)
4. Create an account
5. Complete purchase

### Option B: GoDaddy

1. Go to https://www.godaddy.com
2. Search for your domain
3. Purchase (usually $15-20/year)

### Option C: Google Domains

1. Go to https://domains.google.com
2. Search and purchase domain
3. Simple interface, good for beginners

**Recommended:** Get a `.ca` domain for Canadian business credibility.

---

## Part 6: Connect Your Custom Domain to GitHub Pages

### Step 1: Add CNAME File to Your Project

**Create file:** `c:\Users\Admin\Documents\Development\cybersecurity-website\public\CNAME`

**Content** (no file extension, just one line):
```
www.yourdomain.com
```

Replace `yourdomain.com` with your actual domain (e.g., `www.cloudsecurecanada.ca`)

### Step 2: Update DNS Settings at Your Domain Registrar

#### For Namecheap:

1. Log in to Namecheap
2. Go to **Domain List** → Click **Manage** next to your domain
3. Go to **Advanced DNS** tab
4. Delete any existing A Records or CNAME Records
5. Add these new records:

**A Records** (Point to GitHub Pages):
| Type | Host | Value | TTL |
|------|------|-------|-----|
| A Record | @ | 185.199.108.153 | Automatic |
| A Record | @ | 185.199.109.153 | Automatic |
| A Record | @ | 185.199.110.153 | Automatic |
| A Record | @ | 185.199.111.153 | Automatic |

**CNAME Record** (For www subdomain):
| Type | Host | Value | TTL |
|------|------|-------|-----|
| CNAME Record | www | YOUR_USERNAME.github.io. | Automatic |

**Important:** Notice the period (.) at the end of `YOUR_USERNAME.github.io.`

6. Click **Save All Changes**

#### For GoDaddy:

1. Log in to GoDaddy
2. Go to **My Products** → **DNS** next to your domain
3. Add the same A Records and CNAME Record as above

#### For Google Domains:

1. Go to **DNS** section
2. Add Custom resource records with the same values

### Step 3: Configure Custom Domain in GitHub

1. Go to your repository on GitHub
2. Go to **Settings** → **Pages**
3. Under **Custom domain**, enter your domain: `www.yourdomain.com`
4. Click **Save**
5. Wait 5-10 minutes for DNS verification
6. Once verified, check **Enforce HTTPS** (important for security!)

### Step 4: Redeploy Your Website

```powershell
cd C:\Users\Admin\Documents\Development\cybersecurity-website
git add public/CNAME
git commit -m "Add custom domain"
git push
npm run deploy
```

### Step 5: Wait for DNS Propagation

- DNS changes take 15 minutes to 48 hours to fully propagate
- Usually works within 1-2 hours
- Test by visiting: `https://www.yourdomain.com`

---

## Part 7: Keep Your Repository Private While Website is Public

### Current Setup (Recommended):

✅ **Source code:** Private (on main branch)
✅ **Built website:** Public (on gh-pages branch - only shows compiled HTML/CSS/JS)

This is already configured! Here's why it's secure:

1. **Main branch** = Private
   - Contains your React source code
   - Contains your development files
   - Only you can see it

2. **gh-pages branch** = Public
   - Contains only the built website (HTML, CSS, JS)
   - No source code visible
   - No React components visible
   - Just the final website

### To Verify Your Privacy:

1. Go to your repo: `https://github.com/YOUR_USERNAME/cybersecurity-website`
2. You should see it says **Private** next to the repository name
3. Switch to `gh-pages` branch (dropdown near top left)
4. You'll only see built files in the `dist` folder - no source code

### If You Want to Make Repository Public (Optional):

If you want to showcase your code:
1. Go to **Settings** → **General**
2. Scroll to **Danger Zone**
3. Click **Change visibility** → **Make public**

**Note:** Only do this if you want to show your React code publicly (for portfolio purposes).

---

## Part 8: Update Your Website in the Future

### Making Changes:

1. Edit your files locally
2. Test locally: `npm run dev`
3. Once satisfied, commit and deploy:

```powershell
cd C:\Users\Admin\Documents\Development\cybersecurity-website

# Save your changes
git add .
git commit -m "Update services section"
git push

# Deploy to GitHub Pages
npm run deploy
```

Your website will update in 2-5 minutes!

---

## Part 9: Troubleshooting

### Issue: Website shows 404 error

**Solution 1:** Check that gh-pages branch exists
- Go to your repo → Branches → should see `gh-pages`

**Solution 2:** Verify base path in vite.config.js
- Should match your repo name: `base: '/cybersecurity-website/'`

**Solution 3:** Make sure GitHub Pages is enabled
- Settings → Pages → Source should be `gh-pages` branch

### Issue: Custom domain not working

**Solution 1:** Wait longer (DNS can take up to 48 hours)

**Solution 2:** Check DNS settings
- Use https://dnschecker.org to verify your domain points to GitHub

**Solution 3:** Verify CNAME file
- Should be in `public/CNAME` with just your domain

**Solution 4:** Check GitHub Pages status
- Settings → Pages → should show green checkmark

### Issue: CSS/Images not loading

**Solution:** Check the base path in vite.config.js matches your repository name

### Issue: Contact form not working

**Solution:** Verify your Formspree endpoint is set correctly in Contact.jsx

---

## Part 10: Security Best Practices

### Keep These Private (Never Commit):

✅ Already in .gitignore:
- `node_modules/`
- `.env` files
- `.vscode/` folder

### Verify Formspree is Configured:

Your contact form already uses Formspree (endpoint: `xdagobnn`)
- Submissions go to: cloudsecurecanada@gmail.com
- No backend code needed
- Works perfectly with static hosting

### Enable HTTPS:

Once your custom domain is connected:
1. Settings → Pages
2. Check **Enforce HTTPS**
3. This encrypts all traffic to your site

---

## Quick Reference Commands

```powershell
# Navigate to project
cd C:\Users\Admin\Documents\Development\cybersecurity-website

# Test locally
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy

# Save changes to GitHub
git add .
git commit -m "Your message here"
git push
```

---

## Summary Timeline

1. **GitHub Setup:** 10 minutes
2. **First Deployment:** 5 minutes
3. **Domain Purchase:** 10 minutes
4. **Domain Connection:** 15-30 minutes
5. **DNS Propagation:** 1-48 hours (usually 1-2 hours)

**Total:** Your website can be live with custom domain in 2-3 hours!

---

## Cost Breakdown

- **GitHub Pages:** FREE ✅
- **Domain (.ca):** $15-20/year
- **Domain (.com):** $10-15/year
- **Hosting:** FREE (GitHub Pages) ✅
- **SSL Certificate:** FREE (GitHub provides) ✅

**Total Annual Cost:** $10-20 for domain only!

---

## Support Resources

- **GitHub Pages Docs:** https://docs.github.com/pages
- **Formspree Help:** https://help.formspree.io
- **DNS Checker:** https://dnschecker.org
- **Your Website Status:** https://github.com/YOUR_USERNAME/cybersecurity-website/deployments

---

## Your Website URLs

After setup, you'll have:

1. **GitHub Pages URL:** `https://YOUR_USERNAME.github.io/cybersecurity-website`
2. **Custom Domain:** `https://www.yourdomain.com` or `https://www.yourdomain.ca`

Both will work, and visitors can use either!

---

**Questions or Issues?**
Email: cloudsecurecanada@gmail.com
