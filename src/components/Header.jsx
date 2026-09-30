import { Link, NavLink } from 'react-router-dom'
import Icon from './Icon'
import { useCart } from '../context/CartContext'
import { useStore } from '../context/CMSContext'

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'All Products' },
  { to: '/new-arrivals', label: 'New Drops' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header({ onOpenNav, onOpenSearch }) {
  const { count, toggleCart } = useCart()
  const { brandName, brandTagline, openCustomizer, openAcquireModal, currency, setCurrency } = useStore()

  const cycleCurrency = () => {
    const list = ['INR', 'USD', 'EUR', 'GBP']
    const idx = list.indexOf(currency)
    const next = list[(idx + 1) % list.length]
    setCurrency(next)
  }

  return (
    <header className="site-header">
      <div className="site-header__brand">
        <button
          className="icon-btn header-menu-btn"
          onClick={onOpenNav}
          aria-label="Open menu"
        >
          <Icon name="menu" />
        </button>

        <Link to="/" className="site-header__logo-wrap">
          <div className="site-header__logo-icon">
            <span className="logo-sparkle">✦</span>
          </div>
          <div className="site-header__brand-text">
            <span className="site-header__brand-title">{brandName}</span>
            <span className="site-header__brand-tag">{brandTagline}</span>
          </div>
        </Link>
      </div>

      <nav className="site-header__nav">
        {NAV_LINKS.map((link, i) => (
          <NavLink
            key={i}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              'nav-link' + (isActive ? ' is-active' : '')
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="site-header__right">
        {/* Currency Switcher Pill */}
        <button
          className="currency-badge-btn hide-mobile"
          onClick={cycleCurrency}
          title="Click to cycle currency (INR / USD / EUR / GBP)"
        >
          <Icon name="payments" className="icon-sm" />
          <span>{currency}</span>
        </button>

        {/* Customizer trigger in header */}
        <button
          className="header-demo-btn hide-mobile"
          onClick={openCustomizer}
          title="Open Live Store Customizer"
        >
          <Icon name="tune" className="icon-sm" />
          <span>Customize Demo</span>
        </button>

        {/* Buy Website CTA in header */}
        <button
          className="header-acquire-btn hide-mobile"
          onClick={openAcquireModal}
          title="Buy This Website Template"
        >
          <span>Buy This Website</span>
          <span className="acquire-chip">Ready</span>
        </button>

        <div className="nav-divider hide-mobile" />

        <div className="site-header__actions">
          <button
            className="icon-btn"
            onClick={onOpenSearch}
            aria-label="Search Catalog"
            title="Search products"
          >
            <Icon name="search" />
          </button>

          <Link
            to="/shop"
            className="icon-btn hide-mobile"
            aria-label="Wishlist"
            title="Browse collection"
          >
            <Icon name="favorite_border" />
          </Link>

          <button
            className="icon-btn cart-btn"
            onClick={toggleCart}
            aria-label="View Shopping Bag"
            title="Open Bag"
          >
            <Icon name="shopping_bag" />
            {count > 0 && <span className="cart-badge">{count}</span>}
          </button>
        </div>
      </div>
    </header>
  )
}
