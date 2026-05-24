# ☕ Nova Brew Cafe

A modern, elegant, and fully responsive coffee shop website built with pure HTML, CSS, and JavaScript.

![Nova Brew Banner](assets/images/coffee-bg.jpg)

## ✨ Features

- **Fully Responsive Design** (Mobile + Desktop)
- **Smooth Animations** & Hover Effects
- **Working Login System** with:
  - Email/Password Login
  - Google & Apple OAuth Simulation
  - Account Lockout after 3 failed attempts (16 minutes)
  - Persistent Login (localStorage)
- **Interactive Menu** with:
  - Category Filtering
  - Wishlist System (with sidebar)
  - "Buy Now" protection (requires login)
- **Beautiful Gallery** with image filters
- **Contact Form** (connected to Formspree)
- **About Us** with team & story sections

## 🛠 Tech Stack

- **HTML5** & **CSS3**
- **Vanilla JavaScript** (No frameworks)
- **Google Fonts** (Poppins)
- **Responsive Design** (Mobile-first)
- **localStorage** for user & wishlist data

### 📂 Project Structure

Cafe-Website/
├── 🌐 index.html
│
├── 🎨 css/
│   ├── 📄 aboutstyle.css
│   ├── 📄 animations.css
│   ├── 📄 contact.css
│   ├── 📄 gallery.css
│   ├── 📄 menu.css
│   ├── 📄 responsive.css
│   └── 📄 style.css
│
├── ⚙️ js/
│   ├── 📜 menu.js
│   └── 📜 script.js
│
├── 📦 assets/
│   ├── 🖼️ images/
│   │   ├── 📷 AlmondCroissant.jpg
│   │   ├── 📷 ArtisanChocolateCake.jpg
│   │   ├── 📷 barista.jpg
│   │   ├── 📷 cafe-interior.jpg
│   │   ├── 📷 CaramelLatte.png
│   │   ├── 📷 coffee-1.jpg
│   │   ├── 📷 coffee-bg.jpg
│   │   ├── 📷 contact-bg.jpg
│   │   ├── 📷 founder.jpg
│   │   ├── 📷 LoungeCorner.jpg
│   │   ├── 📷 manager.jpg
│   │   ├── 📷 MatchaLatte.png
│   │   ├── 📷 SignatureColdBrew.jpg
│   │   └── 📷 TheEspressoBar.jpg
│   │
│   ├── 🎥 videos/
│   │   └── 🎬 cafe-video.mp4
│   │
│   ├── 🏷️ icons/
│   │   └── 📁 favicon_io/
│   │       ├── 🏷️ android-chrome-192x192.png
│   │       ├── 🏷️ android-chrome-512x512.png
│   │       ├── 🏷️ apple-touch-icon.png
│   │       ├── 🏷️ favicon-16x16.png
│   │       ├── 🏷️ favicon-32x32.png
│   │       ├── 🏷️ favicon.ico
│   │       └── 📄 site.webmanifest
│   │
│   └── 🔤 fonts/
│
├── 📄 pages/
│   ├── 📄 about.html
│   ├── 📄 contact.html
│   ├── 📄 gallery.html
│   └── 📄 menu.html
│
└── 📖 README.md
