# AURORA — Next-Gen Multi-Category E-Commerce Storefront

A turnkey, ultra-fast commercial e-commerce storefront built with **React 19 + Vite** and pure vanilla CSS tokens. Designed as a universal template ready to power any direct-to-consumer online brand.

---

## 🌟 Highlights & Features

- **Universal Multi-Store Showcases**:
  - 6 instant industry presets switchable live:
    - 🌐 **Omni Flagship** (Multi-Department Lifestyle)
    - ⚡ **Cyber Tech & Audio** (Electronics & Gear)
    - 🧥 **Streetwear & Minimal Fashion** (Apparel & Footwear)
    - 💎 **Luxury Horology & Jewelry** (Watches & Jewels)
    - ✨ **Clean Skincare & Beauty** (Wellness & Cosmetics)
    - 🪴 **Modern Interior & Decor** (Home Architecture)
- **Interactive Live Store Customizer**:
  - Slide-over live drawer for branding, tagline, announcement marquee, and contact updates in real time.
  - 8-color dynamic luxury palette switcher (`Gold`, `Emerald`, `Cyan`, `Rose`, `Amber`, `Purple`, `Ruby`, `Slate`).
  - Real-time multi-currency converter (`INR ₹`, `USD $`, `EUR €`, `GBP £`).
- **Complete Shopping Experience**:
  - Slide-over slide cart drawer with promo codes (`AURORA10`), free shipping progress bar, and real-time totals.
  - 1-Click WhatsApp Direct Concierge Checkout & Integrated Buy Now Checkout.
  - High-performance product catalog with multi-category filtering, instant search, and sorting.
  - Rich interactive pages: `Home`, `Shop`, `Product Details (PDP)`, `New Drops`, `About`, `Contact`, `Order Tracking`, `Shipping`, `Returns`, and `FAQs`.
- **100% Client-Side & Zero-Config Setup**:
  - Runs out of the box with zero external backend dependencies or CMS setup required.
  - State persisted smoothly across user sessions via `localStorage`.

---

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/mrudul94/Demo-Websites.git
cd Demo-Websites

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
# Visit http://localhost:5173

# 4. Production build
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components (Header, Footer, Marquee, StoreCustomizer, AcquireModal...)
├── context/             # Global application state (CartContext, ToastContext, CMSContext)
├── data/                # Multi-category catalogs & industry presets (showcaseData.js)
├── features/            # Feature slices (Cart drawer, Catalog cards, CMS state)
├── pages/               # Application routes (Home, Shop, Product, Checkout, About, Contact...)
├── styles/              # Design tokens, base CSS, responsive rules, and customizer theme
└── utils/               # Currency formatting and WhatsApp payload builders
```

---

## 🌐 Deployment

Deployable instantly to **Vercel**, **Netlify**, or **Cloudflare Pages**:
- **Build command**: `npm run build`
- **Output directory**: `dist`
- Single Page Application (SPA) redirect configuration is pre-configured in `public/_redirects`.

---

## 📄 License

Commercial Showcase & Template Storefront. All rights reserved.
