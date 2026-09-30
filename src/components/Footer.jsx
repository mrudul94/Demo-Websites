import { Link } from 'react-router-dom'
import Icon from './Icon'
import { useStore } from '../context/CMSContext'

export default function Footer() {
  const { brandName, brandTagline, settings, categories, openCustomizer, openAcquireModal } = useStore()

  const whatsappInquiryUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    `Hello! I am interested in purchasing this E-Commerce Store Website template ("${brandName}"). Could you please share the pricing and source code setup details?`
  )}`

  return (
    <footer id="contact" className="site-footer">
      {/* Top Banner / Store Pitch Banner */}
      <div className="site-footer__pitch">
        <div className="site-footer__pitch-inner">
          <div className="site-footer__pitch-text">
            <span className="pitch-eyebrow">🚀 COMMERCIAL TEMPLATE AVAILABLE</span>
            <h3>Want this modern, high-converting e-commerce website for your brand?</h3>
            <p>
              Launch your online store in 24 hours. Includes full source code ownership, zero CMS platform fees, 
              direct WhatsApp order concierge, responsive design, and lightning-fast performance.
            </p>
          </div>
          <div className="site-footer__pitch-actions">
            <button className="btn btn--gold" onClick={openAcquireModal}>
              <Icon name="verified" className="icon-sm" />
              Acquire / Inquire Website
            </button>
            <button className="btn btn--ghost" onClick={openCustomizer}>
              <Icon name="tune" className="icon-sm" />
              Test Live Demo
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="site-footer__grid">
        {/* Col 1: Brand Info */}
        <div className="site-footer__col site-footer__col--brand">
          <div className="site-footer__logo">
            <span className="logo-sparkle">✦</span>
            <span className="footer-brand-title">{brandName}</span>
          </div>
          <p className="site-footer__blurb">
            A next-generation multi-category direct-to-consumer flagship storefront. 
            Engineered for high conversion, responsive fluidity, and timeless aesthetic refinement.
          </p>
          <div className="site-footer__contact-btns">
            <a
              href={`https://wa.me/${settings.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="site-footer__contact-chip"
            >
              <Icon name="chat" className="icon-sm" /> WhatsApp Concierge
            </a>
            <a
              href={`mailto:${settings.email}`}
              className="site-footer__contact-chip"
            >
              <Icon name="mail" className="icon-sm" /> Email Support
            </a>
          </div>
        </div>

        {/* Col 2: Shop Collections */}
        <div className="site-footer__col">
          <h4>Explore Collections</h4>
          <ul>
            <li>
              <Link to="/shop" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                All Products
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  to={`/shop?cat=${encodeURIComponent(c.name)}`}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/new-arrivals" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                New Drops &amp; Limited
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Customer Care & Policies */}
        <div className="site-footer__col">
          <h4>Customer Care</h4>
          <ul>
            <li>
              <Link to="/shipping" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Shipping &amp; Express Delivery
              </Link>
            </li>
            <li>
              <Link to="/exchange" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Returns &amp; Exchange Policy
              </Link>
            </li>
            <li>
              <Link to="/track-order" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Track Your Order
              </Link>
            </li>
            <li>
              <Link to="/faqs" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Frequently Asked Questions
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Contact Concierge
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Guarantees & Newsletter */}
        <div className="site-footer__col site-footer__col--features">
          <h4>Why Choose Us</h4>
          <div className="site-footer__trust-list">
            <div className="site-footer__trust-item">
              <span className="site-footer__trust-icon">⚡</span>
              <span>Fast Global &amp; Pan-India Dispatch</span>
            </div>
            <div className="site-footer__trust-item">
              <span className="site-footer__trust-icon">🛡️</span>
              <span>100% Quality &amp; Authenticity Guarantee</span>
            </div>
            <div className="site-footer__trust-item">
              <span className="site-footer__trust-icon">💬</span>
              <span>Direct WhatsApp VIP Order Support</span>
            </div>
            <div className="site-footer__trust-item">
              <span className="site-footer__trust-icon">🔒</span>
              <span>256-Bit Encrypted Secure Payments</span>
            </div>
          </div>

          <div className="site-footer__social-section">
            <span className="site-footer__social-label">Connect &amp; Social</span>
            <div className="site-footer__social">
              <a
                href={`https://wa.me/${settings.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                title="Chat on WhatsApp"
              >
                <Icon name="chat" />
              </a>
              <a
                href={`mailto:${settings.email}`}
                aria-label="Email"
                title="Send an Email"
              >
                <Icon name="mail" />
              </a>
              <button
                className="footer-customizer-btn"
                onClick={openCustomizer}
                title="Open Store Customizer"
                aria-label="Customize Store"
              >
                <Icon name="tune" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods Badges Strip */}
      <div className="site-footer__payment-strip">
        <div className="payment-icons-list">
          <span className="payment-pill">💳 Visa</span>
          <span className="payment-pill">💳 Mastercard</span>
          <span className="payment-pill">⚡ UPI / GPay / PhonePe</span>
          <span className="payment-pill">🍏 Apple Pay</span>
          <span className="payment-pill">🅿️ PayPal</span>
          <span className="payment-pill">📦 Cash on Delivery</span>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="site-footer__bottom">
        <p className="site-footer__copy">
          © {new Date().getFullYear()} {brandName.toUpperCase()}. ALL RIGHTS RESERVED.
        </p>

        <div className="site-footer__developer-badge">
          <span className="skaylon-dot"></span>
          <span className="skaylon-text">E-Commerce Template by</span>
          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noreferrer"
            className="skaylon-link"
            title="Inquire to purchase this template"
          >
            <span className="skaylon-name">SKAYON</span>
            <span className="skaylon-sparkle">🚀</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
