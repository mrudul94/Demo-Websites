import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import ProductCard from '../components/ProductCard'
import { useStore } from '../context/CMSContext'
import { STORE_PRESETS } from '../data/showcaseData'

export default function Home() {
  const {
    products,
    hero,
    categories,
    reviews,
    pillars,
    settings,
    brandName,
    activePresetKey,
    setPreset,
    openCustomizer,
    openAcquireModal,
  } = useStore()

  const [selectedCategoryTab, setSelectedCategoryTab] = useState('All')

  // Filter products by selected tab
  const displayedProducts =
    selectedCategoryTab === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategoryTab)

  const featuredList = displayedProducts.slice(0, 8)
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4)

  return (
    <>
      {/* 1. Full-Bleed Editorial Cover Hero */}
      <section className="hero">
        <div
          className="hero__bg"
          style={{
            backgroundImage: hero.bgImg ? `url('${hero.bgImg}')` : undefined,
          }}
        />
        <div className="hero__scrim" />
        <div className="hero__content">
          <div className="hero__eyebrow-wrap">
            <span className="hero__eyebrow">
              {hero.eyebrow || '✦ NEXT-GEN MULTI-CATEGORY COMMERCE'}
            </span>
          </div>

          <h1 className="hero__title">{hero.title}</h1>

          <p className="hero__sub">{hero.sub}</p>

          <div className="hero__actions">
            <Link to="/shop" className="btn btn--gold">
              Explore Collection &rarr;
            </Link>
            <button className="btn btn--ghost" onClick={openCustomizer}>
              <Icon name="tune" className="icon-sm" />
              Customize Demo Live
            </button>
            <button className="btn btn--outline hide-mobile" onClick={openAcquireModal}>
              <Icon name="verified" className="icon-sm" />
              Acquire Website
            </button>
          </div>

          {/* Quick Niche Switcher Bar inside Hero */}
          <div className="hero__preset-switcher">
            <span className="preset-switcher-label">✨ Quick Preview Niche:</span>
            <div className="preset-pills-row">
              {Object.entries(STORE_PRESETS).map(([key, p]) => (
                <button
                  key={key}
                  className={`preset-pill${activePresetKey === key ? ' is-active' : ''}`}
                  onClick={() => setPreset(key)}
                >
                  <span
                    className="preset-pill__dot"
                    style={{ background: p.accentColor }}
                  />
                  <span>{p.badge}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Floating Trust Pills Strip */}
          <div className="hero__trust-strip">
            <span>⚡ 48h Express Shipping</span>
            <span className="hero__trust-sep">•</span>
            <span>🛡️ 100% Quality Guaranteed</span>
            <span className="hero__trust-sep">•</span>
            <span>💬 Direct WhatsApp Checkout</span>
            <span className="hero__trust-sep">•</span>
            <span>⭐ 4.9/5 Rating ({settings.customerCount} Shoppers)</span>
          </div>
        </div>
      </section>

      {/* 2. Interactive Category Showcase Grid */}
      <section className="section section--pad">
        <div className="section__head">
          <div>
            <span className="section__eyebrow">
              ✦ DISCOVER BY CATEGORY
            </span>
            <h2 className="section__title">
              Curated Department Edits
            </h2>
          </div>
          <Link to="/shop" className="link-underline">
            View All Departments &rarr;
          </Link>
        </div>

        <div className="category-grid">
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/shop?cat=${encodeURIComponent(c.name)}`}
              className="category-tile"
            >
              <img
                src={c.img}
                alt={c.name}
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="category-tile__scrim" />
              <div className="category-tile__label">
                <span className="category-tile__count">{c.itemCount}</span>
                <h3>{c.name}</h3>
                <p className="category-tile__tagline">{c.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Featured Products with Category Tabs */}
      <Reveal as="section" className="section section--pad section--alt">
        <div className="section__head section__head--between">
          <div>
            <span className="section__eyebrow">
              🔥 HANDPICKED DROPS
            </span>
            <h2 className="section__title">
              Featured Trending Catalog
            </h2>
          </div>
          <Link to="/shop" className="link-underline hide-mobile">
            Browse All {products.length} Products &rarr;
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="catalog-tabs-bar">
          <button
            className={`catalog-tab-btn${selectedCategoryTab === 'All' ? ' is-active' : ''}`}
            onClick={() => setSelectedCategoryTab('All')}
          >
            All Departments ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`catalog-tab-btn${selectedCategoryTab === cat.name ? ' is-active' : ''}`}
              onClick={() => setSelectedCategoryTab(cat.name)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {featuredList.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link to="/shop" className="btn btn--primary btn--lg">
            View Full Catalog ({products.length} Items) &rarr;
          </Link>
        </div>
      </Reveal>

      {/* 4. Commercial "Acquire / Buy This Website" Spotlight Banner */}
      <Reveal as="section" className="section section--pad">
        <div className="store-sale-banner">
          <div className="store-sale-banner__scrim" />
          <div className="store-sale-banner__content">
            <span className="store-sale-banner__chip">
              💎 TURNKEY E-COMMERCE WEBSITE TEMPLATE
            </span>
            <h2>Looking to launch your own store or sell this platform?</h2>
            <p>
              This entire website is built with React 18, Vite, responsive UI, itemized cart drawer, 
              live niche customizer, and 1-click WhatsApp order generation. Ready for immediate deployment, 
              zero CMS subscriptions, and full source code ownership.
            </p>
            <div className="store-sale-banner__actions">
              <button className="btn btn--gold" onClick={openAcquireModal}>
                <Icon name="verified" className="icon-sm" />
                Acquire / Buy This Website
              </button>
              <button className="btn btn--ghost" onClick={openCustomizer}>
                <Icon name="tune" className="icon-sm" />
                Customize Live Demo
              </button>
            </div>
            <div className="store-sale-banner__perks">
              <span>✔ Fast 24-hr Setup</span>
              <span>•</span>
              <span>✔ Full Source Code</span>
              <span>•</span>
              <span>✔ Razorpay / Stripe Ready</span>
              <span>•</span>
              <span>✔ Zero Monthly Platform Fees</span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* 5. The Pillars of Modern Commerce */}
      <Reveal as="section" className="section section--pad section--alt">
        <div className="section__head" style={{ justifyContent: 'center', textAlign: 'center' }}>
          <div>
            <span className="section__eyebrow">
              ✦ BUILT FOR SEAMLESS SHOPPING
            </span>
            <h2 className="section__title">
              Why Customers Love {brandName}
            </h2>
          </div>
        </div>

        <div className="pillar-grid">
          {pillars.map((p) => (
            <div key={p.title} className="pillar-card">
              <div className="pillar-card__icon-wrap">
                <Icon name={p.icon} className="pillar-card__icon" />
              </div>
              <span className="pillar-card__badge">{p.badge}</span>
              <h3 className="pillar-card__title">{p.title}</h3>
              <p className="pillar-card__desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* 6. Verified Customer Reviews */}
      <Reveal as="section" className="section section--pad">
        <div className="section__head" style={{ justifyContent: 'center', textAlign: 'center' }}>
          <div>
            <span className="section__eyebrow">
              🪷 VERIFIED EXPERIENCES
            </span>
            <h2 className="section__title">
              Trusted by Over {settings.customerCount} Shoppers
            </h2>
          </div>
        </div>

        <div className="reviews-grid">
          {reviews.map((r) => (
            <div key={r.id} className="review-card">
              <div className="review-card__stars">
                {'★'.repeat(r.stars || 5)}
              </div>
              <h4 className="review-card__headline">&quot;{r.title}&quot;</h4>
              <p className="review-card__text">{r.text}</p>
              <div className="review-card__footer">
                <div>
                  <p className="review-card__author">{r.author}</p>
                  <p className="review-card__city">{r.city} • {r.role}</p>
                </div>
                <span className="verified-badge">✔ Verified Buyer</span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* 7. Newsletter & Special Promo Strip */}
      <section className="newsletter-section">
        <div className="newsletter-card">
          <div className="newsletter-text">
            <span className="newsletter-eyebrow">🎁 EXCLUSIVE INVITATION</span>
            <h3>Unlock 20% Off Your First Order</h3>
            <p>
              Use code <strong style={{ color: 'var(--secondary)', letterSpacing: '0.08em' }}>LAUNCH20</strong> at checkout 
              or subscribe to receive limited releases, private sales, and new drops.
            </p>
          </div>
          <form
            className="newsletter-form"
            onSubmit={(e) => {
              e.preventDefault()
              alert('Coupon LAUNCH20 has been activated for your session!')
            }}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              required
              className="newsletter-input"
            />
            <button type="submit" className="btn btn--gold">
              Claim 20% Off
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
