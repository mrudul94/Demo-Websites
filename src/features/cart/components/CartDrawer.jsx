import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../../design-system/Icon'
import { useCart } from '../context/CartContext'
import { findProduct } from '../../../data/products'
import { formatPrice } from '../../../utils/format'
import { useStore } from '../../../context/CMSContext'
import { useToast } from '../../../context/ToastContext'

export default function CartDrawer() {
  const {
    cart,
    isOpen,
    closeCart,
    changeQty,
    removeFromCart,
    subtotal,
    checkoutOnWhatsApp,
  } = useCart()

  const { currency, settings, brandName } = useStore()
  const toast = useToast()

  const [couponCode, setCouponCode] = useState('')
  const [discountPercent, setDiscountPercent] = useState(0)
  const [couponApplied, setCouponApplied] = useState(false)

  const freeShippingThreshold = settings.freeShippingThreshold || 999
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal)
  const shippingProgressPct = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  )

  const applyCoupon = (e) => {
    e.preventDefault()
    if (couponCode.trim().toUpperCase() === 'LAUNCH20') {
      setDiscountPercent(20)
      setCouponApplied(true)
      toast('🎉 20% discount code "LAUNCH20" applied!')
    } else if (couponCode.trim()) {
      toast('Invalid coupon code. Try: LAUNCH20')
    }
  }

  const discountAmount = Math.round((subtotal * discountPercent) / 100)
  const finalTotal = Math.max(0, subtotal - discountAmount)

  const handleCustomWhatsAppCheckout = () => {
    if (cart.length === 0) {
      toast('Your bag is empty')
      return
    }

    let msg = `✨ *${brandName.toUpperCase()} ORDER REQUEST*\n\n`
    msg += `🛍️ *BAG ITEMS:*\n`
    cart.forEach((item, idx) => {
      const p = findProduct(item.id)
      if (p) {
        msg += `${idx + 1}. *${p.name}* x${item.qty} (${formatPrice(p.price * item.qty, currency)})\n`
      }
    })

    msg += `\nSubtotal: ${formatPrice(subtotal, currency)}\n`
    if (couponApplied) {
      msg += `Promo Code (LAUNCH20): -${formatPrice(discountAmount, currency)} (20% OFF)\n`
    }
    msg += `💰 *FINAL TOTAL:* ${formatPrice(finalTotal, currency)}\n\n`
    msg += `Could you please confirm item availability and send payment details?`

    window.open(
      `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(msg)}`,
      '_blank'
    )
  }

  return (
    <>
      <div
        className={`cart-overlay${isOpen ? ' is-visible' : ''}`}
        onClick={closeCart}
      />
      <aside className={`cart-drawer${isOpen ? ' is-open' : ''}`}>
        <div className="cart-drawer__head">
          <div className="cart-drawer__head-title">
            <Icon name="shopping_bag" className="icon-sm" />
            <h2>Shopping Bag</h2>
            <span className="cart-drawer__count-badge">
              {cart.reduce((sum, i) => sum + i.qty, 0)} items
            </span>
          </div>
          <button className="icon-btn" onClick={closeCart} aria-label="Close cart">
            <Icon name="close" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="cart-shipping-banner">
          <p className="cart-shipping-text">
            {remainingForFreeShipping === 0
              ? '🎉 Congratulations! You unlocked FREE Express Shipping!'
              : `Add ${formatPrice(remainingForFreeShipping, currency)} more for FREE Express Shipping!`}
          </p>
          <div className="cart-progress-bar-bg">
            <div
              className="cart-progress-bar-fill"
              style={{ width: `${shippingProgressPct}%` }}
            />
          </div>
        </div>

        {/* Cart Item Rows */}
        <div className="cart-drawer__body custom-scrollbar">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <span className="cart-empty-icon">🛍️</span>
              <p className="cart-empty-title">Your shopping bag is empty</p>
              <p className="cart-empty-sub">
                Explore our curated drops and add your favorite essentials.
              </p>
              <button className="btn btn--gold btn--sm" onClick={closeCart}>
                Browse Collections &rarr;
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const p = findProduct(item.id)
              if (!p) return null
              return (
                <div key={item.id} className="cart-row">
                  <div className="cart-row__img">
                    <img src={p.img} alt={p.name} />
                  </div>
                  <div className="cart-row__main">
                    <div>
                      <div className="cart-row__top">
                        <h3>{p.name}</h3>
                        <span className="cart-row__price">
                          {formatPrice(p.price * item.qty, currency)}
                        </span>
                      </div>
                      <p className="cart-row__cat">{p.category}</p>
                    </div>
                    <div className="cart-row__bottom">
                      <div className="qty-stepper">
                        <button
                          onClick={() => changeQty(p.id, -1)}
                          aria-label="Decrease quantity"
                        >
                          <Icon name="remove" className="icon-sm" />
                        </button>
                        <span>{item.qty}</span>
                        <button
                          onClick={() => changeQty(p.id, 1)}
                          aria-label="Increase quantity"
                        >
                          <Icon name="add" className="icon-sm" />
                        </button>
                      </div>
                      <button
                        className="cart-row__remove"
                        onClick={() => removeFromCart(p.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer & Totals */}
        {cart.length > 0 && (
          <div className="cart-drawer__foot">
            {/* Promo Code Input */}
            <form onSubmit={applyCoupon} className="cart-coupon-form">
              <input
                type="text"
                placeholder="Promo Code (Try LAUNCH20)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="cart-coupon-input"
              />
              <button type="submit" className="btn btn--sm btn--primary">
                Apply
              </button>
            </form>

            <div className="cart-totals">
              <div className="cart-totals__line">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal, currency)}</span>
              </div>
              {couponApplied && (
                <div className="cart-totals__line discount-line">
                  <span>Special Promo (20% OFF)</span>
                  <span>-{formatPrice(discountAmount, currency)}</span>
                </div>
              )}
              <div className="cart-totals__line">
                <span>Express Shipping</span>
                <span>
                  {remainingForFreeShipping === 0 ? 'FREE' : 'Calculated at checkout'}
                </span>
              </div>
              <div className="cart-totals__line cart-totals__total">
                <span>Total</span>
                <span>{formatPrice(finalTotal, currency)}</span>
              </div>
            </div>

            <div className="cart-drawer__actions">
              <Link to="/checkout" className="btn btn--gold btn--block" onClick={closeCart}>
                Proceed to Checkout ({formatPrice(finalTotal, currency)}) &rarr;
              </Link>
              <button
                className="btn btn--outline btn--block"
                onClick={handleCustomWhatsAppCheckout}
              >
                <Icon name="chat" className="icon-sm" />
                1-Click WhatsApp Order
              </button>
              <button className="cart-drawer__continue" onClick={closeCart}>
                Continue Browsing
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
