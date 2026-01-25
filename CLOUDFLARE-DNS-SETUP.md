# Cloudflare DNS Setup for GitHub Pages

## Configure cloudsecurecanada.com with Cloudflare

### Step 1: Access Cloudflare Dashboard

1. Go to https://dash.cloudflare.com
2. You should be automatically logged in (via GitHub)
3. Click on your domain: **cloudsecurecanada.com**

### Step 2: Navigate to DNS Settings

1. On the left sidebar, click **DNS** → **Records**
2. You'll see the DNS management interface

### Step 3: Remove Existing Records (if any)

If you see any existing A, AAAA, or CNAME records for `@` or `www`, delete them:
- Click the **three dots** next to each record
- Select **Delete**
- Confirm deletion

### Step 4: Add A Records for GitHub Pages

Add **4 A Records** pointing to GitHub Pages servers:

**Record 1:**
- **Type:** A
- **Name:** @ (this represents your root domain)
- **IPv4 address:** 185.199.108.153
- **Proxy status:** ⚠️ Toggle OFF (click the cloud icon so it shows gray/DNS only)
- **TTL:** Auto
- Click **Save**

**Record 2:**
- **Type:** A
- **Name:** @
- **IPv4 address:** 185.199.109.153
- **Proxy status:** ⚠️ Toggle OFF (gray/DNS only)
- **TTL:** Auto
- Click **Save**

**Record 3:**
- **Type:** A
- **Name:** @
- **IPv4 address:** 185.199.110.153
- **Proxy status:** ⚠️ Toggle OFF (gray/DNS only)
- **TTL:** Auto
- Click **Save**

**Record 4:**
- **Type:** A
- **Name:** @
- **IPv4 address:** 185.199.111.153
- **Proxy status:** ⚠️ Toggle OFF (gray/DNS only)
- **TTL:** Auto
- Click **Save**

### Step 5: Add CNAME Record for www Subdomain

**CNAME Record:**
- **Type:** CNAME
- **Name:** www
- **Target:** ezaganjoridev.github.io
- **Proxy status:** ⚠️ Toggle OFF (gray/DNS only)
- **TTL:** Auto
- Click **Save**

### Step 6: Verify Your DNS Records

Your DNS records should look like this:

```
Type    Name    Content                     Proxy Status
----    ----    -------                     ------------
A       @       185.199.108.153            DNS only
A       @       185.199.109.153            DNS only
A       @       185.199.110.153            DNS only
A       @       185.199.111.153            DNS only
CNAME   www     ezaganjoridev.github.io    DNS only
```

### Step 7: Configure SSL/TLS Settings (Important!)

1. Click **SSL/TLS** in the left sidebar
2. Under **SSL/TLS encryption mode**, select: **Full**
   - ⚠️ NOT "Full (strict)" - this can cause issues with GitHub Pages
   - ⚠️ NOT "Flexible" - this is less secure

### Step 8: Optional - Enable Cloudflare Proxy (After Site Works)

Once your site is working (after following GitHub steps below), you can optionally enable Cloudflare's proxy:
1. Go back to **DNS** → **Records**
2. Click the cloud icon next to each record to toggle proxy **ON** (orange cloud)
3. This gives you Cloudflare's CDN, DDoS protection, and caching

**Note:** Keep proxy OFF initially to troubleshoot any issues.

### Step 9: Wait for DNS Propagation

- Cloudflare updates are usually instant to 5 minutes
- Global DNS propagation: 15 minutes to 48 hours (usually 1-2 hours)
- Check status: https://dnschecker.org

---

## Configure GitHub Pages

### Step 1: Enable GitHub Pages with Custom Domain

1. Go to your repository: https://github.com/ezaganjoridev/cybersecurity
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar under "Code and automation")

### Step 2: Set Custom Domain

1. Under **Custom domain**, enter: `cloudsecurecanada.com`
   - ⚠️ Use the root domain (without www) or with www - your choice
   - I recommend using without www (just `cloudsecurecanada.com`)
2. Click **Save**
3. GitHub will verify your domain (takes 1-2 minutes)
4. Once verified (green checkmark appears), check **Enforce HTTPS**

### Step 3: Verify CNAME File

The CNAME file should already be created in your repository at `public/CNAME` with content:
```
cloudsecurecanada.com
```

This is already done! ✅

---

## Deploy Your Website

### After Installing Node.js:

```powershell
cd C:\Users\Admin\Documents\Development\cybersecurity-website

# Install dependencies (if not already done)
npm install

# Commit the CNAME file
git add public/CNAME
git commit -m "Add Cloudflare custom domain"
git push

# Deploy to GitHub Pages
npm run deploy
```

---

## Verification Steps

### 1. Check DNS Propagation (5-15 minutes)

Visit: https://dnschecker.org
- Enter: `cloudsecurecanada.com`
- You should see the GitHub Pages IPs: 185.199.108.153, etc.

### 2. Test Your Website (15 minutes to 2 hours)

Try these URLs:
- http://cloudsecurecanada.com (should redirect to https)
- https://cloudsecurecanada.com (should show your site)
- https://www.cloudsecurecanada.com (should show your site)

### 3. Check GitHub Pages Status

1. Go to: https://github.com/ezaganjoridev/cybersecurity/deployments
2. Should show "Active" deployment
3. Click on the deployment to see status

### 4. Verify SSL Certificate

1. Visit: https://cloudsecurecanada.com
2. Click the padlock icon in browser
3. Should show "Connection is secure"
4. Certificate should be from GitHub or Cloudflare

---

## Troubleshooting

### Issue: "DNS_PROBE_FINISHED_NXDOMAIN" error

**Solution:**
- Wait longer for DNS propagation (up to 48 hours)
- Clear your DNS cache:
  ```powershell
  ipconfig /flushdns
  ```

### Issue: "Not Secure" warning or SSL error

**Solution 1:** Make sure "Enforce HTTPS" is checked in GitHub Settings → Pages

**Solution 2:** In Cloudflare, set SSL/TLS mode to "Full" (not Flexible or Full strict)

**Solution 3:** Wait 15-30 minutes for SSL certificate to provision

### Issue: 404 error on website

**Solution 1:** Verify `base: '/cybersecurity/'` in vite.config.js

**Solution 2:** Check GitHub Pages source is set to `gh-pages` branch

**Solution 3:** Verify deployment succeeded:
```powershell
npm run deploy
```

### Issue: CSS/JS not loading

**Solution:** Check browser console for errors. Verify the base path in vite.config.js matches your repository name.

### Issue: Cloudflare shows "Error 525: SSL handshake failed"

**Solution:**
1. Go to Cloudflare → SSL/TLS
2. Change to "Full" mode (not "Full strict")
3. Wait 5 minutes and try again

---

## Optional: Enable Cloudflare Features (After Site Works)

Once your site is working, you can enable Cloudflare's features:

### 1. Enable Proxy (CDN + DDoS Protection)

1. Go to **DNS** → **Records**
2. Click the cloud icon next to each record
3. Should turn **orange** (Proxied)
4. This gives you:
   - Faster loading (CDN)
   - DDoS protection
   - Free SSL certificate
   - Analytics

### 2. Configure Speed Optimizations

1. Go to **Speed** → **Optimization**
2. Enable:
   - Auto Minify (HTML, CSS, JavaScript)
   - Brotli compression
   - Early Hints

### 3. Set Up Page Rules (Optional)

1. Go to **Rules** → **Page Rules**
2. Add rule to always use HTTPS:
   - URL: `http://cloudsecurecanada.com/*`
   - Setting: Always Use HTTPS

### 4. Enable Caching

1. Go to **Caching** → **Configuration**
2. Caching Level: Standard
3. Browser Cache TTL: 4 hours (or higher)

---

## Important Notes

### Why Proxy Status Should Be OFF Initially?

- **OFF (Gray cloud)** = DNS only, direct to GitHub
- **ON (Orange cloud)** = Through Cloudflare proxy

Keep it OFF initially because:
1. Easier to troubleshoot issues
2. Lets GitHub handle SSL certificate setup
3. You can enable it later for CDN benefits

### Root Domain vs WWW

Your CNAME file uses: `cloudsecurecanada.com` (no www)

This means:
- ✅ `cloudsecurecanada.com` → Your site
- ✅ `www.cloudsecurecanada.com` → Redirects to non-www

If you prefer www, change CNAME file to: `www.cloudsecurecanada.com`

---

## Summary Checklist

- [ ] Added 4 A records in Cloudflare (proxy OFF)
- [ ] Added 1 CNAME record for www (proxy OFF)
- [ ] Set SSL/TLS mode to "Full"
- [ ] Configured custom domain in GitHub Pages
- [ ] Enabled "Enforce HTTPS" in GitHub
- [ ] CNAME file exists in public/CNAME
- [ ] Deployed with `npm run deploy`
- [ ] Waited for DNS propagation (15 min - 2 hours)
- [ ] Tested https://cloudsecurecanada.com
- [ ] SSL certificate is working (padlock icon)

---

## Your URLs

After setup:
- **Main site:** https://cloudsecurecanada.com
- **With www:** https://www.cloudsecurecanada.com
- **GitHub Pages URL:** https://ezaganjoridev.github.io/cybersecurity (redirects to your domain)

---

## Support

- **Cloudflare Docs:** https://developers.cloudflare.com/pages/
- **GitHub Pages Docs:** https://docs.github.com/pages
- **DNS Checker:** https://dnschecker.org
- **SSL Checker:** https://www.ssllabs.com/ssltest/

**Your GitHub Repo:** https://github.com/ezaganjoridev/cybersecurity
**Your GitHub Username:** ezaganjoridev

---

## Quick Reference: DNS Records for Cloudflare

Copy these values exactly:

| Type | Name | Target/Content | Proxy |
|------|------|----------------|-------|
| A | @ | 185.199.108.153 | OFF |
| A | @ | 185.199.109.153 | OFF |
| A | @ | 185.199.110.153 | OFF |
| A | @ | 185.199.111.153 | OFF |
| CNAME | www | ezaganjoridev.github.io | OFF |

Done! Your website will be live at https://cloudsecurecanada.com 🚀
