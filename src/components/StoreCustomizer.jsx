import { useState } from 'react'
import { useStore } from '../context/CMSContext'
import { STORE_PRESETS } from '../data/showcaseData'
import Icon from './Icon'

const COLOR_SWATCHES = [
  { name: 'Champagne Gold', hex: '#d4af37' },
  { name: 'Electric Cyan', hex: '#00f0ff' },
  { name: 'Warm Terracotta', hex: '#e07a5f' },
  { name: 'Botanical Emerald', hex: '#10b981' },
  { name: 'Nordic Amber', hex: '#f59e0b' },
  { name: 'Royal Violet', hex: '#8b5cf6' },
  { name: 'Cyber Crimson', hex: '#ef4444' },
  { name: 'Titanium Slate', hex: '#94a3b8' },
]

const CURRENCIES = [
  { code: 'INR', label: '₹ INR (India)' },
  { code: 'USD', label: '$ USD (US/Global)' },
  { code: 'EUR', label: '€ EUR (Europe)' },
  { code: 'GBP', label: '£ GBP (UK)' },
]

export default function StoreCustomizer() {
  const {
    isCustomizerOpen,
    openCustomizer,
    closeCustomizer,
    openAcquireModal,
    activePresetKey,
    setPreset,
    brandName,
    setBrandName,
    brandTagline,
    setTagline,
    accentColor,
    setAccentColor,
    currency,
    setCurrency,
    resetCustomizer,
  } = useStore()

  const [copied, setCopied] = useState(false)

  const copyConfig = () => {
    const config = {
      brandName,
      brandTagline,
      activePreset: activePresetKey,
      accentColor,
      currency,
    }
    navigator.clipboard.writeText(JSON.stringify(config, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      {/* Floating Demo Trigger Pill */}
      <div className="customizer-trigger-wrap">
        <button
          className="customizer-trigger-btn"
          onClick={openCustomizer}
          aria-label="Customize Store Demo"
        >
          <span className="customizer-pulse" />
          <Icon name="tune" className="icon-sm" />
          <span className="customizer-trigger-text">Demo Customizer</span>
          <span className="customizer-trigger-badge">Live</span>
        </button>
      </div>

      {/* Backdrop */}
      {isCustomizerOpen && (
        <div className="customizer-backdrop" onClick={closeCustomizer} />
      )}

      {/* Slide-over Drawer */}
      <aside className={`customizer-drawer${isCustomizerOpen ? ' is-open' : ''}`}>
        <div className="customizer-drawer__head">
          <div>
            <div className="customizer-tag">✨ INTERACTIVE DEMO ENGINE</div>
            <h3 className="customizer-drawer__title">Store Customizer</h3>
          </div>
          <button
            className="icon-btn"
            onClick={closeCustomizer}
            aria-label="Close Customizer"
          >
            <Icon name="close" />
          </button>
        </div>

        <div className="customizer-drawer__body custom-scrollbar">
          {/* 1. Niche Presets Section */}
          <div className="customizer-section">
            <label className="customizer-label">
              <span>Choose Store Industry / Niche Preset</span>
              <span className="customizer-sublabel">1-Click Live Re-Skin</span>
            </label>
            <div className="preset-grid">
              {Object.entries(STORE_PRESETS).map(([key, item]) => {
                const isActive = activePresetKey === key
                return (
                  <button
                    key={key}
                    className={`preset-btn${isActive ? ' is-active' : ''}`}
                    onClick={() => setPreset(key)}
                  >
                    <div className="preset-btn__header">
                      <span
                        className="preset-btn__dot"
                        style={{ background: item.accentColor }}
                      />
                      <span className="preset-btn__name">{item.name}</span>
                    </div>
                    <span className="preset-btn__badge">{item.badge}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 2. Brand Identity Inputs */}
          <div className="customizer-section">
            <label className="customizer-label">
              <span>Brand Identity</span>
              <span className="customizer-sublabel">Custom Store Name & Slogan</span>
            </label>
            <div className="customizer-input-group">
              <input
                type="text"
                className="customizer-input"
                placeholder="Store Name (e.g. LUMEN, NEXUS)"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
              />
              <input
                type="text"
                className="customizer-input"
                placeholder="Tagline or Header Badge"
                value={brandTagline}
                onChange={(e) => setTagline(e.target.value)}
              />
            </div>
          </div>

          {/* 3. Accent Color Swatches */}
          <div className="customizer-section">
            <label className="customizer-label">
              <span>Accent Color Scheme</span>
              <span className="customizer-sublabel">Real-time Dynamic Palette</span>
            </label>
            <div className="color-swatches-grid">
              {COLOR_SWATCHES.map((swatch) => (
                <button
                  key={swatch.hex}
                  className={`color-swatch-btn${
                    accentColor.toLowerCase() === swatch.hex.toLowerCase()
                      ? ' is-active'
                      : ''
                  }`}
                  style={{ '--swatch-color': swatch.hex }}
                  onClick={() => setAccentColor(swatch.hex)}
                  title={swatch.name}
                >
                  <span
                    className="swatch-circle"
                    style={{ backgroundColor: swatch.hex }}
                  />
                  <span className="swatch-name">{swatch.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Currency Switcher */}
          <div className="customizer-section">
            <label className="customizer-label">
              <span>Currency & Pricing Format</span>
            </label>
            <div className="currency-selector-grid">
              {CURRENCIES.map((curr) => (
                <button
                  key={curr.code}
                  className={`currency-pill${currency === curr.code ? ' is-active' : ''}`}
                  onClick={() => setCurrency(curr.code)}
                >
                  {curr.label}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Website For Sale Promo Card */}
          <div className="customizer-commercial-card">
            <div className="customizer-commercial-badge">
              💎 TEMPLATE AVAILABLE FOR SALE
            </div>
            <h4>Want this website for your brand?</h4>
            <p>
              Purchase this complete e-commerce website with instant WhatsApp order concierge,
              high-speed React architecture, mobile optimization, and zero recurring fees.
            </p>
            <button
              className="btn btn--gold btn--block"
              onClick={() => {
                closeCustomizer()
                openAcquireModal()
              }}
            >
              <Icon name="verified" className="icon-sm" />
              View Purchase &amp; Licensing Details
            </button>
          </div>
        </div>

        {/* Drawer Foot Actions */}
        <div className="customizer-drawer__foot">
          <button
            className="btn btn--outline btn--sm"
            onClick={copyConfig}
            title="Copy current preset configuration as JSON"
          >
            <Icon name="content_copy" className="icon-sm" />
            {copied ? 'Copied Config!' : 'Copy Config'}
          </button>
          <button
            className="btn btn--ghost btn--sm"
            onClick={resetCustomizer}
            title="Reset to default showcase"
          >
            <Icon name="restart_alt" className="icon-sm" />
            Reset
          </button>
        </div>
      </aside>
    </>
  )
}
