import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useStore } from '../context/CMSContext'
import Icon from '../components/Icon'

export default function Shop() {
  const { products, categories, brandName } = useStore()
  const [searchParams, setSearchParams] = useSearchParams()

  const [category, setCategory] = useState('All')
  const [tagFilter, setTagFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sort, setSort] = useState('featured')

  const categoryOptions = useMemo(
    () => ['All', ...categories.map((c) => c.name)],
    [categories]
  )

  // Sync category from ?cat= query param
  useEffect(() => {
    const cat = searchParams.get('cat')
    if (cat && categoryOptions.includes(cat)) {
      setCategory(cat)
    } else {
      setCategory('All')
    }
  }, [searchParams, categoryOptions])

  // Filtered items
  const items = useMemo(() => {
    let list = [...products]

    // Category filter
    if (category !== 'All') {
      list = list.filter((p) => p.category === category)
    }

    // Tag filter
    if (tagFilter !== 'All') {
      list = list.filter((p) => p.tag === tagFilter || (tagFilter === 'NEW' && p.isNewArrival))
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.desc && p.desc.toLowerCase().includes(q))
      )
    }

    // Sorting
    if (sort === 'price-low') list.sort((a, b) => a.price - b.price)
    if (sort === 'price-high') list.sort((a, b) => b.price - a.price)
    if (sort === 'rating') list.sort((a, b) => (b.rating || 0) - (a.rating || 0))

    return list
  }, [category, tagFilter, searchQuery, sort, products])

  const handleCategorySelect = (c) => {
    setCategory(c)
    if (c === 'All') {
      searchParams.delete('cat')
      setSearchParams(searchParams)
    } else {
      setSearchParams({ cat: c })
    }
  }

  const clearAllFilters = () => {
    setCategory('All')
    setTagFilter('All')
    setSearchQuery('')
    setSort('featured')
    setSearchParams({})
  }

  return (
    <section className="section section--pad shop">
      <div className="shop__head">
        <span className="section__eyebrow">✦ {brandName.toUpperCase()} CATALOG</span>
        <h1 className="section__title section__title--center">All Collections</h1>
        <p className="shop__count">
          Showing <strong>{items.length}</strong> items across all departments
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="shop-filter-bar">
        <div className="shop-search-box">
          <Icon name="search" className="shop-search-icon" />
          <input
            type="text"
            placeholder="Search all items by title, category, or material..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="shop-search-input"
          />
          {searchQuery && (
            <button className="shop-search-clear" onClick={() => setSearchQuery('')}>
              <Icon name="close" className="icon-sm" />
            </button>
          )}
        </div>

        <div className="shop-sort-wrap">
          <span className="shop-sort-label">Sort by:</span>
          <select
            className="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="featured">Featured / Best Match</option>
            <option value="rating">Highest Customer Rating</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Category Pills Strip */}
      <div className="shop__controls">
        <div className="filter-chips">
          {categoryOptions.map((c) => (
            <button
              key={c}
              className={`filter-chip${category === c ? ' is-active' : ''}`}
              onClick={() => handleCategorySelect(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Tag Filter Pills */}
      <div className="tag-filter-chips">
        {['All', 'BESTSELLER', 'NEW', 'TRENDING', 'HOT DEAL'].map((tag) => (
          <button
            key={tag}
            className={`tag-chip${tagFilter === tag ? ' is-active' : ''}`}
            onClick={() => setTagFilter(tag)}
          >
            {tag === 'All' ? '✦ All Drops' : tag}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="shop-empty-state">
          <div className="empty-icon-wrap">
            <Icon name="search_off" />
          </div>
          <h3>No products match your criteria</h3>
          <p>Try searching with another keyword or resetting the active filters.</p>
          <button className="btn btn--gold" onClick={clearAllFilters}>
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  )
}
