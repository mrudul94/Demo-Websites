import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { useStore } from '../context/CMSContext'
import { formatPrice } from '../utils/format'

export default function Product() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, findProduct, currency, settings, brandName } = useStore()
  const product = findProduct(id)
  const { addToCart } = useCart()
  const toast = useToast()

  if (!product) {
    return (
      <section className="section section--pad" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Product Not Found</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>No product matches this item ID in the active catalog.</p>
        <Link to="/shop" className="btn btn--gold">
          Browse All Collections &rarr;
        </Link>
      </section>
    )
  }

  const [mainImg, setMainImg] = useState(product.img)
  const [qty, setQty] = useState(1)
  const [wished, setWished] = useState(false)
  const [pincode, setPincode] = useState('')
  const [pincodeStatus, setPincodeStatus] = useState(null)

  useEffect(() => {
    setMainImg(product.img)
    setQty(1)
    setWished(false)
    setPincodeStatus(null)
    document.title = `${product.name} | ${brandName}`
  }, [product, brandName])

  const thumbs = [product.img, product.img2].filter(Boolean)
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4)
  const fallbackRelated = related.length > 0 ? related : products.filter((p) => p.id !== product.id).slice(0, 4)

  const toggleWishlist = () => {
    setWished((w) => {
      const next = !w
      toast(next ? 'Saved to wishlist ❤️' : 'Removed from wishlist')
      return next
    })
  }

  const checkPincode = (e) => {
    e.preventDefault()
    if (!pincode.trim() || pincode.length < 5) {
      toast('Please enter a valid postal pincode')
      return
    }
    setPincodeStatus('Available! Express delivery dispatched within 24-48 hours.')
  }

  const handleWhatsAppBuy = () => {
    const text = `Hello! I would like to order "${product.name}" (Qty: ${qty}, Price: ${formatPrice(product.price * qty, currency)}). Please assist with checkout.`
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank')
  }

  const discountPct =
    product.compareAt && product.compareAt > product.price
      ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
      : 0

  return (
    <section className="section section--pad product-page">
      {/* Breadcrumb Navigation */}
      <div className="product-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to={`/shop?cat=${encodeURIComponent(product.category)}`}>
          {product.category}
        </Link>
        <span>/</span>
        <span className="breadcrumb-current">{product.name}</span>
      </div>

      <div className="product-detail">
        {/* Gallery */}
        <div className="product-gallery">
          <div className="product-gallery__main">
            {product.tag && (
              <span className="product-card__tag gallery-tag">{product.tag}</span>
            )}
            <img
              src={mainImg}
              alt={product.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';
              }}
            />
          </div>

          {thumbs.length > 1 && (
            <div className="product-gallery__thumbs">
              {thumbs.map((src, i) => (
                <button
                  key={i}
                  className={`product-thumb${mainImg === src ? ' is-active' : ''}`}
                  style={{ backgroundImage: `url('${src}')` }}
                  onClick={() => setMainImg(src)}
                  aria-label={`View photo ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="product-info">
          <div className="product-info__header">
            <span className="product-info__cat">{product.category}</span>
            {product.rating && (
              <div className="product-info__rating">
                <span className="rating-stars">★★★★★</span>
                <span className="rating-num">{product.rating}</span>
                <span className="rating-count">
                  ({product.reviewsCount || 48} verified reviews)
                </span>
              </div>
            )}
          </div>

          <h1 className="product-info__name">{product.name}</h1>

          <div className="product-info__price">
            <span className="product-info__now">
              {formatPrice(product.price, currency)}
            </span>
            {product.compareAt && (
              <span className="product-info__compare">
                {formatPrice(product.compareAt, currency)}
              </span>
            )}
            {discountPct > 0 && (
              <span className="pdp-discount-badge">Save {discountPct}%</span>
            )}
          </div>

          <p className="product-info__desc">{product.desc}</p>

          {/* Quantity & Actions */}
          <div className="product-info__buy">
            <div className="qty-stepper qty-stepper--lg">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                <Icon name="remove" className="icon-sm" />
              </button>
              <input type="text" value={qty} readOnly />
              <button
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
              >
                <Icon name="add" className="icon-sm" />
              </button>
            </div>

            <button
              className={`icon-square${wished ? ' is-active' : ''}`}
              onClick={toggleWishlist}
              aria-label="Toggle wishlist"
              title="Add to wishlist"
            >
              <Icon name="favorite" />
            </button>
          </div>

          <div className="product-action-buttons">
            <button
              className="btn btn--gold btn--block pdp-btn-main"
              onClick={() => {
                addToCart(product.id, qty)
              }}
            >
              <Icon name="shopping_bag" className="icon-sm" />
              Add {qty > 1 ? `(${qty})` : ''} to Bag
            </button>

            <button
              className="btn btn--outline btn--block"
              onClick={handleWhatsAppBuy}
            >
              <Icon name="chat" className="icon-sm" />
              1-Click Buy on WhatsApp
            </button>

            <button
              className="btn btn--ghost btn--block"
              onClick={() => navigate(`/checkout`)}
            >
              Proceed to Direct Checkout &rarr;
            </button>
          </div>

          {/* Delivery Availability Checker */}
          <div className="pdp-delivery-box">
            <span className="pdp-delivery-title">Check Delivery Availability</span>
            <form onSubmit={checkPincode} className="pdp-pincode-form">
              <input
                type="text"
                placeholder="Enter postal / zip code"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="pdp-pincode-input"
              />
              <button type="submit" className="btn btn--sm btn--primary">
                Verify
              </button>
            </form>
            {pincodeStatus ? (
              <p className="pdp-pincode-result success">{pincodeStatus}</p>
            ) : (
              <p className="pdp-pincode-note">
                ⚡ Express Delivery eligible for Pan-India &amp; International destinations.
              </p>
            )}
          </div>

          {/* Trust Guarantees */}
          <div className="pdp-trust-grid">
            <div className="pdp-trust-card">
              <Icon name="local_shipping" />
              <span>Express Delivery</span>
            </div>
            <div className="pdp-trust-card">
              <Icon name="verified_user" />
              <span>100% Authentic</span>
            </div>
            <div className="pdp-trust-card">
              <Icon name="autorenew" />
              <span>Easy 7-Day Exchange</span>
            </div>
          </div>

          {/* Accordion Details */}
          <div className="product-accordions">
            <details open>
              <summary>
                <span>Material &amp; Specifications</span>
                <Icon name="expand_more" />
              </summary>
              <div className="accordion-content">
                <p><strong>Composition:</strong> {product.material}</p>
                <p><strong>Care &amp; Durability:</strong> {product.care}</p>
              </div>
            </details>

            <details>
              <summary>
                <span>Shipping &amp; Worldwide Delivery</span>
                <Icon name="expand_more" />
              </summary>
              <div className="accordion-content">
                <p>
                  Orders are dispatched within 24 hours. Tracked delivery usually takes 
                  2–4 business days. All items are packaged in signature shock-proof protective boxes.
                </p>
              </div>
            </details>

            <details>
              <summary>
                <span>Quality Inspection &amp; Returns</span>
                <Icon name="expand_more" />
              </summary>
              <div className="accordion-content">
                <p>
                  We offer a 7-day hassle-free replacement for any damaged or defective deliveries. 
                  Our human WhatsApp concierge is on standby 24/7 to assist.
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="product-related">
        <div className="section__head">
          <h2 className="section__title">You May Also Like</h2>
          <Link to="/shop" className="link-underline">
            View All Products &rarr;
          </Link>
        </div>
        <div className="product-grid">
          {fallbackRelated.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </section>
  )
}
