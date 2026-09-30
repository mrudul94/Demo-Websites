import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { useCart } from '../context/CartContext'
import { findProduct } from '../data/products'
import { formatPrice } from '../utils/format'
import { useStore } from '../context/CMSContext'
import { useToast } from '../context/ToastContext'

export default function Checkout() {
  const { cart, subtotal } = useCart()
  const { currency, brandName, settings } = useStore()
  const toast = useToast()

  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'upi',
    notes: '',
  })

  const [couponCode, setCouponCode] = useState('')
  const [discountPercent, setDiscountPercent] = useState(0)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const applyCoupon = (e) => {
    e.preventDefault()
    if (couponCode.trim().toUpperCase() === 'LAUNCH20') {
      setDiscountPercent(20)
      toast('🎉 20% discount code "LAUNCH20" applied!')
    } else {
      toast('Invalid coupon. Try: LAUNCH20')
    }
  }

  const discountAmount = Math.round((subtotal * discountPercent) / 100)
  const shippingFee = subtotal >= (settings.freeShippingThreshold || 999) ? 0 : 99
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee)

  const handleSubmitOrder = (e) => {
    e.preventDefault()
    if (cart.length === 0) {
      toast('Your bag is empty!')
      return
    }

    const randomId = 'ORD-' + Math.floor(100000 + Math.random() * 900000)
    setOrderId(randomId)
    setOrderPlaced(true)
    toast('✨ Order created successfully!')

    // If customer selected WhatsApp or wants instant confirmation:
    let msg = `✨ *${brandName.toUpperCase()} ORDER #${randomId}*\n\n`
    msg += `👤 Customer: ${form.firstName} ${form.lastName}\n`
    msg += `📞 Phone: ${form.phone}\n`
    msg += `📍 Address: ${form.address}, ${form.city}, ${form.state} - ${form.pincode}\n`
    msg += `💳 Payment: ${form.paymentMethod.toUpperCase()}\n\n`
    msg += `🛍️ *ITEMS:*\n`
    cart.forEach((item, idx) => {
      const p = findProduct(item.id)
      if (p) {
        msg += `${idx + 1}. *${p.name}* x${item.qty} (${formatPrice(p.price * item.qty, currency)})\n`
      }
    })
    msg += `\n💰 *TOTAL PAYABLE:* ${formatPrice(grandTotal, currency)}\n`

    // Open WhatsApp in new tab for direct merchant connection
    const waUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(msg)}`
    window.open(waUrl, '_blank')
  }

  if (orderPlaced) {
    return (
      <section className="section section--pad checkout-success-page">
        <div className="checkout-success-card">
          <div className="success-icon-badge">✓</div>
          <span className="success-eyebrow">ORDER CONFIRMED</span>
          <h2>Thank You, {form.firstName}!</h2>
          <p className="order-id-label">
            Order Reference: <strong>{orderId}</strong>
          </p>
          <p className="order-desc">
            We have dispatched your order details to our fulfillment center and our WhatsApp concierge. 
            A tracking number will be sent to <strong>{form.email}</strong> once dispatched.
          </p>

          <div className="success-actions">
            <Link to="/" className="btn btn--gold">
              Return to Storefront &rarr;
            </Link>
            <Link to="/shop" className="btn btn--ghost">
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section section--pad checkout">
      <div className="shop__head" style={{ marginBottom: '32px' }}>
        <span className="section__eyebrow">✦ SECURE 256-BIT ENCRYPTED CHECKOUT</span>
        <h1 className="section__title section__title--center">Order Checkout</h1>
      </div>

      <div className="checkout-grid">
        {/* Left Col: Customer & Shipping Details */}
        <form className="checkout-form" onSubmit={handleSubmitOrder}>
          <div className="checkout-box">
            <h2 className="checkout-box__title">
              <Icon name="person" className="icon-sm" /> Contact Information
            </h2>
            <div className="form-row">
              <div className="form-group" style={{ flex: 1 }}>
                <label className="field-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your.email@domain.com"
                  required
                  className="modern-input"
                />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="field-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  required
                  className="modern-input"
                />
              </div>
            </div>
          </div>

          <div className="checkout-box">
            <h2 className="checkout-box__title">
              <Icon name="local_shipping" className="icon-sm" /> Delivery Address
            </h2>
            <div className="form-row">
              <div className="form-group" style={{ flex: 1 }}>
                <label className="field-label">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  required
                  className="modern-input"
                />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="field-label">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  required
                  className="modern-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="field-label">Street Address *</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="House/Apartment #, street, area"
                required
                className="modern-input"
              />
            </div>

            <div className="form-row">
              <div className="form-group" style={{ flex: 1 }}>
                <label className="field-label">City *</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  required
                  className="modern-input"
                />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="field-label">State / Province *</label>
                <input
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="State"
                  required
                  className="modern-input"
                />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="field-label">Postal / Pincode *</label>
                <input
                  type="text"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="Zip/Pincode"
                  required
                  className="modern-input"
                />
              </div>
            </div>
          </div>

          <div className="checkout-box">
            <h2 className="checkout-box__title">
              <Icon name="payment" className="icon-sm" /> Payment Method
            </h2>
            <div className="payment-options-grid">
              <label className={`payment-option${form.paymentMethod === 'upi' ? ' is-selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={form.paymentMethod === 'upi'}
                  onChange={handleChange}
                />
                <div>
                  <strong>UPI / QR / Instant Pay</strong>
                  <span>GPay, PhonePe, Paytm, BHIM</span>
                </div>
              </label>

              <label className={`payment-option${form.paymentMethod === 'card' ? ' is-selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={form.paymentMethod === 'card'}
                  onChange={handleChange}
                />
                <div>
                  <strong>Credit / Debit Card</strong>
                  <span>Visa, Mastercard, RuPay, Amex</span>
                </div>
              </label>

              <label className={`payment-option${form.paymentMethod === 'cod' ? ' is-selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={form.paymentMethod === 'cod'}
                  onChange={handleChange}
                />
                <div>
                  <strong>Cash on Delivery (COD)</strong>
                  <span>Pay upon doorstep handover</span>
                </div>
              </label>

              <label className={`payment-option${form.paymentMethod === 'whatsapp' ? ' is-selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="whatsapp"
                  checked={form.paymentMethod === 'whatsapp'}
                  onChange={handleChange}
                />
                <div>
                  <strong>WhatsApp Order Concierge</strong>
                  <span>Confirm with human agent &amp; pay via link</span>
                </div>
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn--gold btn--block btn--lg">
            Place Order ({formatPrice(grandTotal, currency)}) &rarr;
          </button>
        </form>

        {/* Right Col: Order Summary */}
        <div className="checkout-sidebar">
          <div className="checkout-summary-card">
            <h3>Order Summary ({cart.length} items)</h3>

            <div className="checkout-items-list custom-scrollbar">
              {cart.map((item) => {
                const p = findProduct(item.id)
                if (!p) return null
                return (
                  <div key={item.id} className="checkout-summary-item">
                    <img src={p.img} alt={p.name} />
                    <div className="checkout-summary-item__info">
                      <h4>{p.name}</h4>
                      <p>Qty: {item.qty}</p>
                    </div>
                    <span className="checkout-summary-item__price">
                      {formatPrice(p.price * item.qty, currency)}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Promo Code Form */}
            <form onSubmit={applyCoupon} className="checkout-coupon-form">
              <input
                type="text"
                placeholder="Promo Code (Try: LAUNCH20)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button type="submit" className="btn btn--sm btn--primary">
                Apply
              </button>
            </form>

            <div className="checkout-summary-totals">
              <div className="summary-line">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal, currency)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="summary-line discount-line">
                  <span>Special Promo (20% OFF)</span>
                  <span>-{formatPrice(discountAmount, currency)}</span>
                </div>
              )}
              <div className="summary-line">
                <span>Express Shipping</span>
                <span>{shippingFee === 0 ? 'FREE' : formatPrice(shippingFee, currency)}</span>
              </div>
              <div className="summary-line total-line">
                <span>Total Amount</span>
                <span>{formatPrice(grandTotal, currency)}</span>
              </div>
            </div>

            <div className="checkout-guarantee-box">
              <Icon name="lock" className="icon-sm" />
              <span>Safe &amp; Secure 256-Bit SSL Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
