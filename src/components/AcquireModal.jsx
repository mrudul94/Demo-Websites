import { useStore } from '../context/CMSContext'
import Icon from './Icon'

export default function AcquireModal() {
  const { isAcquireModalOpen, closeAcquireModal, settings, brandName } = useStore()

  if (!isAcquireModalOpen) return null

  const whatsappInquiryUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    `Hello! I am interested in purchasing/licensing this Turnkey E-Commerce Website Template ("${brandName}"). Could you please share the pricing, deployment assistance, and source code transfer details?`
  )}`

  return (
    <div className="modal-backdrop" onClick={closeAcquireModal}>
      <div
        className="acquire-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="modal-close-btn"
          onClick={closeAcquireModal}
          aria-label="Close dialog"
        >
          <Icon name="close" />
        </button>

        <div className="acquire-modal__badge">
          <span>🚀 WEBSITE FOR SALE • TURNKEY LICENSE</span>
        </div>

        <h2 className="acquire-modal__title">
          Acquire This High-Performance E-Commerce Storefront
        </h2>

        <p className="acquire-modal__sub">
          Looking to launch your own brand or need a modern, lightning-fast store for your client?
          Get full source code ownership with zero recurring CMS platform fees.
        </p>

        <div className="acquire-features-grid">
          <div className="acquire-feature-card">
            <span className="acquire-feature-icon">⚡</span>
            <div>
              <h4>Ultra-Fast React 18 & Vite</h4>
              <p>Sub-second page loads, instant client routing, 100/100 Core Web Vitals.</p>
            </div>
          </div>

          <div className="acquire-feature-card">
            <span className="acquire-feature-icon">🛍️</span>
            <div>
              <h4>Universal Multi-Store Design</h4>
              <p>Built-in presets for Tech, Fashion, Luxury, Cosmetics, Home Decor & General stores.</p>
            </div>
          </div>

          <div className="acquire-feature-card">
            <span className="acquire-feature-icon">💬</span>
            <div>
              <h4>Instant WhatsApp Checkout</h4>
              <p>Direct-to-chat order generation with itemized cart, customer details & delivery address.</p>
            </div>
          </div>

          <div className="acquire-feature-card">
            <span className="acquire-feature-icon">💳</span>
            <div>
              <h4>Payment Gateway Ready</h4>
              <p>Easily plug in Razorpay, Stripe, PayPal, UPI, or Cash on Delivery.</p>
            </div>
          </div>

          <div className="acquire-feature-card">
            <span className="acquire-feature-icon">📱</span>
            <div>
              <h4>Mobile-App Touch & Feel</h4>
              <p>Smooth swipeable drawers, micro-interactions, responsive bottom bar, and search overlay.</p>
            </div>
          </div>

          <div className="acquire-feature-card">
            <span className="acquire-feature-icon">📦</span>
            <div>
              <h4>100% Source Code Ownership</h4>
              <p>Clean, maintainable React codebase with complete freedom to host anywhere (Vercel, Netlify, Cloudflare).</p>
            </div>
          </div>
        </div>

        <div className="acquire-modal__cta-box">
          <div className="acquire-modal__cta-info">
            <span className="acquire-price-tag">Turnkey Commercial License</span>
            <p className="acquire-price-sub">Includes source code, documentation & setup support</p>
          </div>
          <div className="acquire-modal__cta-btns">
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn--gold acquire-btn-primary"
            >
              <Icon name="chat" className="icon-sm" />
              Inquire / Buy on WhatsApp
            </a>
            <a
              href={`mailto:${settings.email}?subject=${encodeURIComponent(
                'Website Template Purchase Inquiry'
              )}`}
              className="btn btn--ghost"
            >
              <Icon name="mail" className="icon-sm" />
              Email Inquiry
            </a>
          </div>
        </div>

        <div className="acquire-modal__footer">
          <span>✔ No monthly Shopify/Wix subscription fees</span>
          <span>•</span>
          <span>✔ Complete design customizability</span>
          <span>•</span>
          <span>✔ Fast 24-hour delivery</span>
        </div>
      </div>
    </div>
  )
}
