import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import Icon from '../components/Icon'
import { useStore } from '../context/CMSContext'

export default function NewArrivals() {
  const { products, categories, brandName } = useStore()
  const [searchParams] = useSearchParams()
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('newest')

  const categoryOptions = useMemo(
    () => ['All', ...categories.map((c) => c.name)],
    [categories]
  )

  useEffect(() => {
    const cat = searchParams.get('cat')
    if (cat && categoryOptions.includes(cat)) setCategory(cat)
    else setCategory('All')
  }, [searchParams, categoryOptions])

  const items = useMemo(() => {
    const newItems = products.filter((p) => p.isNewArrival || p.tag === 'NEW' || p.tag === 'LIMITED DROP')
    const sourceList = newItems.length > 0 ? newItems : [...products]

    let list =
      category === 'All'
        ? sourceList
        : sourceList.filter((p) => p.category === category)

    if (sort === 'price-low') list.sort((a, b) => a.price - b.price)
    else if (sort === 'price-high') list.sort((a, b) => b.price - a.price)

    return list
  }, [category, sort, products])

  return (
    <div className="new-arrivals-page">
      {/* Hero Banner Header */}
      <section className="new-arrivals-hero">
        <div className="new-arrivals-hero__content">
          <span className="section__eyebrow">
            ✦ JUST DROPPED • THE LATEST RELEASES
          </span>
          <h1 className="new-arrivals-hero__title">
            New Arrivals &amp; Limited Drops
          </h1>
          <p className="new-arrivals-hero__sub">
            Discover the newest arrivals across all {brandName} departments. Precision-crafted 
            for performance, everyday luxury, and modern aesthetics.
          </p>
          <div className="hero__trust-strip">
            <span>⚡ Express 24h Dispatch</span>
            <span className="hero__trust-sep">•</span>
            <span>🛡️ 100% Quality Guaranteed</span>
            <span className="hero__trust-sep">•</span>
            <span>💬 WhatsApp Concierge</span>
          </div>
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="section section--pad shop">
        <div className="shop__controls">
          <div className="filter-chips">
            {categoryOptions.map((c) => (
              <button
                key={c}
                className={`filter-chip${category === c ? ' is-active' : ''}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <select
            className="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Sort: Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {items.length === 0 ? (
          <div className="shop-empty-state">
            <Icon name="auto_awesome" style={{ fontSize: '40px', color: 'var(--secondary)', marginBottom: '16px' }} />
            <h3>No New Arrivals in this category yet.</h3>
            <p>Check back soon for new drops or explore all collections in our shop.</p>
            <Link to="/shop" className="btn btn--gold">
              Explore All Collections &rarr;
            </Link>
          </div>
        ) : (
          <div className="product-grid">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} forceTag="NEW" />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
