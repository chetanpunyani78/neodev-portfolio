# 🚀 NEODEV Portfolio

Akira-themed DevOps & Java Engineer portfolio. Angry astronaut included.

---

## ⚡ Quick Start (Local)

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

---

## 📧 EmailJS Setup (5 min, free)

Your contact form sends real emails. Here's how to wire it:

### Step 1: Create account
Go to [emailjs.com](https://www.emailjs.com/) → Sign up (free tier = 200 emails/month)

### Step 2: Add email service
- Dashboard → **Email Services** → **Add New Service**
- Pick Gmail/Outlook/whatever you use
- Connect your email → note down the **Service ID** (e.g. `service_abc123`)

### Step 3: Create template
- Dashboard → **Email Templates** → **Create New**
- Subject: `New Portfolio Message from {{from_name}}`
- Body:
```
Name: {{from_name}}
Email: {{from_email}}
Message: {{message}}
```
- Save → note down the **Template ID** (e.g. `template_xyz789`)

### Step 4: Get public key
- Dashboard → **Account** → **API Keys**
- Copy your **Public Key**

### Step 5: Paste into code
Open `src/App.jsx`, find these lines at the top and replace:

```js
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";    // ← paste service ID
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // ← paste template ID
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";     // ← paste public key
```

Done. Contact form now fires real emails.

---

## 🌐 Deploy to Vercel (free, 2 min)

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "initial commit - NEODEV portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/neodev-portfolio.git
git push -u origin main
```

### Step 2: Connect Vercel

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Click **"Add New Project"**
3. Import your `neodev-portfolio` repo
4. Framework preset: **Vite** (auto-detected)
5. Click **Deploy**

That's it. Vercel gives you a URL like `neodev-portfolio.vercel.app`.
Every `git push` auto-redeploys.

### Optional: Custom domain

Vercel Dashboard → your project → **Settings** → **Domains** → Add your domain.

---

## 🎨 Customize

| What | Where |
|---|---|
| Your name/bio | `src/App.jsx` → About section text |
| Skills | `src/App.jsx` → `SKILLS` array |
| Projects | `src/App.jsx` → `PROJECTS` array (update `link` to real repo URLs) |
| Social links | `src/App.jsx` → `Socials()` component URLs |
| Colors | `src/App.jsx` → `C` object at top |
| EmailJS creds | `src/App.jsx` → top 3 constants |

---

## 📁 Project Structure

```
neodev-portfolio/
├── index.html          # Entry HTML
├── package.json        # Dependencies
├── vite.config.js      # Vite config
└── src/
    ├── main.jsx        # React mount
    └── App.jsx         # Everything lives here
```

---

Built with mass, and mass amounts of mass. 🏍️
