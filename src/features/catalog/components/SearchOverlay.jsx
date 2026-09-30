import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../../design-system/Icon'
import { useStore } from '../../../context/CMSContext'
import { formatPrice } from '../../../utils/format'

export default function SearchOverlay({ open, onClose }) {
  const { products, brandName, currency } = useStore()
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setQuery('')
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  const q = query.trim().toLowerCase()
  const matches = q
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.desc && p.desc.toLowerCase().includes(q))
      )
    : []

  if (!open) return null

  return (
    <div className="search-overlay">
      <div className="search-overlay__inner">
        <div className="search-overlay__head">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--secondary)' }}>✦</span>
            <h2>Search {brandName}</h2>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close search">
            <Icon name="close" className="icon-lg" />
          </button>
        </div>
        <div className="search-field">
          <Icon name="search" className="search-field__icon" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search audio, apparel, timepieces, skincare, living..."
          />
        </div>
        <div className="search-results custom-scrollbar">
          {!q && (
            <div className="search-results__empty">
              <p style={{ fontWeight: 600, color: 'var(--primary)', marginBottom: '8px' }}>
                Instant Catalog Search
              </p>
              <p style={{ fontSize: '13px' }}>
                Type keywords like &quot;headphones&quot;, &quot;hoodie&quot;, &quot;watch&quot;, &quot;serum&quot;, or &quot;lamp&quot;.
              </p>
            </div>
          )}
          {q && matches.length === 0 && (
            <div className="search-results__empty">
              <p>No products found matching &quot;{query}&quot;.</p>
              <p style={{ fontSize: '13px', marginTop: '6px' }}>
                Try searching for a general category name or explore all products in the shop.
              </p>
            </div>
          )}
          {matches.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              className="search-result"
              onClick={onClose}
            >
              <img src={p.img} alt={p.name} />
              <div className="search-result__info">
                <p className="search-result__name">{p.name}</p>
                <p className="search-result__cat">{p.category}</p>
              </div>
              <span className="search-result__price">
                {formatPrice(p.price, currency)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
