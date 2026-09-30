import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../../design-system/Icon'
import { useCart } from '../../cart'
import { useToast } from '../../../context/ToastContext'
import { formatPrice } from '../../../utils/format'
import { useStore } from '../../../context/CMSContext'

export default function ProductCard({ product: p, forceTag }) {
  const { addToCart } = useCart()
  const { currency } = useStore()
  const toast = useToast()
  const [wished, setWished] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  const toggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setWished((w) => {
      const next = !w
      toast(next ? 'Saved to wishlist ❤️' : 'Removed from wishlist')
      return next
    })
  }

  const handleQuickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsAdding(true)
    addToCart(p.id)
    setTimeout(() => setIsAdding(false), 800)
  }

  const discountPct =
    p.compareAt && p.compareAt > p.price
      ? Math.round(((p.compareAt - p.price) / p.compareAt) * 100)
      : 0

  const activeTag = forceTag || p.tag

  return (
    <div className="product-card">
      <Link to={`/product/${p.id}`} className="product-card__media">
        {/* Floating Badges */}
        <div className="product-card__badges">
          {activeTag && <span className="product-card__tag">{activeTag}</span>}
          {discountPct > 0 && (
            <span className="product-card__discount">-{discountPct}% OFF</span>
          )}
        </div>

        {/* Dual Image Hover Flip */}
        <div className="product-card__img-container">
          <img
            src={p.img}
            className={`product-card__img${p.img2 ? ' product-card__img--primary' : ''}`}
            alt={p.name}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';
            }}
          />
          {p.img2 && (
            <img
              src={p.img2}
              className="product-card__img product-card__img--hover"
              alt={`${p.name} preview`}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80';
              }}
            />
          )}
        </div>

        {/* Wishlist Button */}
        <button
          className={`product-card__wish${wished ? ' is-active' : ''}`}
          onClick={toggleWishlist}
          aria-label="Save to wishlist"
          title="Save to wishlist"
        >
          <Icon name="favorite" className="icon-sm" />
        </button>

        {/* Quick Add Overlay on hover for desktop */}
        <div className="product-card__quick-bar">
          <button
            className={`product-card__quick-btn${isAdding ? ' is-added' : ''}`}
            onClick={handleQuickAdd}
          >
            <Icon name={isAdding ? 'done' : 'shopping_bag'} className="icon-sm" />
            <span>{isAdding ? 'Added to Bag!' : '+ Quick Add to Bag'}</span>
          </button>
        </div>
      </Link>

      <div className="product-card__info">
        <div className="product-card__meta-row">
          <span className="product-card__cat">{p.category}</span>
          {p.rating && (
            <div className="product-card__rating">
              <span className="star-icon">★</span>
              <span>{p.rating}</span>
              {p.reviewsCount && (
                <span className="review-count">({p.reviewsCount})</span>
              )}
            </div>
          )}
        </div>

        <h4 className="product-card__name">
          <Link to={`/product/${p.id}`}>{p.name}</Link>
        </h4>

        <div className="product-card__price-row">
          <div className="product-card__price">
            {p.compareAt && (
              <span className="product-card__compare">
                {formatPrice(p.compareAt, currency)}
              </span>
            )}
            <span className="product-card__now">
              {formatPrice(p.price, currency)}
            </span>
          </div>

          <button
            className={`product-card__mobile-add${isAdding ? ' is-added' : ''}`}
            onClick={handleQuickAdd}
            aria-label="Add to bag"
          >
            <Icon name={isAdding ? 'done' : 'add'} className="icon-sm" />
          </button>
        </div>
      </div>
    </div>
  )
}
