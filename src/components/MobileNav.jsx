import { Link, NavLink } from 'react-router-dom'
import Icon from './Icon'
import { useStore } from '../context/CMSContext'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'All Products', end: true },
  { to: '/new-arrivals', label: 'New Drops & Limited' },
  { to: '/about', label: 'About Store' },
  { to: '/contact', label: 'Contact & Concierge' },
  { to: '/shipping', label: 'Shipping & Delivery' },
  { to: '/exchange', label: 'Returns & Exchange' },
  { to: '/care-guide', label: 'Product Care Guide' },
  { to: '/track-order', label: 'Track Your Order' },
  { to: '/faqs', label: 'FAQs & Help' },
]

export default function MobileNav({ open, onClose }) {
  const { brandName, brandTagline, settings, openCustomizer, openAcquireModal } = useStore()

  return (
    <>
      <div
        className={`mobile-nav-overlay${open ? ' is-visible' : ''}`}
        onClick={onClose}
      />
      <div className={`mobile-nav${open ? ' is-open' : ''}`}>
        <div className="mobile-nav__head">
          <Link to="/" onClick={onClose} className="site-header__logo-wrap">
            <span className="logo-sparkle" style={{ color: 'var(--secondary)' }}>✦</span>
            <div className="site-header__brand-text">
              <span className="site-header__brand-title" style={{ fontSize: '1.2rem' }}>{brandName}</span>
              <span className="site-header__brand-tag">{brandTagline}</span>
            </div>
          </Link>
          <button className="icon-btn" onClick={onClose} aria-label="Close menu">
            <Icon name="close" />
          </button>
        </div>

        {/* Mobile Quick Action Buttons */}
        <div className="mobile-nav__actions-bar">
          <button
            className="btn btn--gold btn--sm btn--block"
            onClick={() => {
              onClose()
              openAcquireModal()
            }}
          >
            <Icon name="verified" className="icon-sm" />
            Buy This Website
          </button>
          <button
            className="btn btn--ghost btn--sm btn--block"
            onClick={() => {
              onClose()
              openCustomizer()
            }}
          >
            <Icon name="tune" className="icon-sm" />
            Customize Demo
          </button>
        </div>

        <nav className="mobile-nav__links custom-scrollbar">
          {LINKS.map((link, i) => (
            <NavLink
              key={i}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? 'is-active' : '')}
              onClick={onClose}
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href={`https://wa.me/${settings.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="mobile-nav-whatsapp"
          >
            <Icon name="chat" className="icon-sm" /> Chat on WhatsApp
          </a>
        </nav>
      </div>
    </>
  )
}
