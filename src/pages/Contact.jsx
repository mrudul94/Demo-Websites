import { useState } from 'react'
import Icon from '../components/Icon'
import { useToast } from '../context/ToastContext'
import { useStore } from '../context/CMSContext'

export default function Contact() {
  const toast = useToast()
  const { brandName, settings, openAcquireModal } = useStore()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Order Inquiry',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      toast('Please fill in all required fields.')
      return
    }
    setSubmitted(true)
    toast('✨ Thank you! Your message has been sent to our concierge.')
  }

  const FAQS = [
    {
      q: 'How long does shipping & order delivery take?',
      a: 'All orders are dispatched within 24-48 hours. Express shipping typically arrives in 2–4 business days. Free shipping is automatically applied on orders above the threshold.',
    },
    {
      q: `Can I place an order or buy this website directly through WhatsApp?`,
      a: `Yes! You can order any product or inquire about purchasing this turnkey website template directly on WhatsApp. Our concierge provides immediate assistance.`,
    },
    {
      q: 'What is your return & exchange policy?',
      a: 'We provide a 7-day hassle-free exchange or replacement for any damaged or mismatched products. Customer satisfaction is our top priority.',
    },
    {
      q: 'Which payment methods are accepted?',
      a: 'We accept all major Credit/Debit cards (Visa, Mastercard), UPI (GPay, PhonePe, Paytm), NetBanking, and Cash on Delivery (COD).',
    },
  ]

  return (
    <div className="contact-page">
      {/* Hero Header */}
      <section className="contact-hero">
        <div className="contact-hero__content">
          <span className="section__eyebrow">
            ✦ VIP CLIENT CONCIERGE • {brandName.toUpperCase()}
          </span>
          <h1 className="contact-hero__title">
            We Are Here to Assist You
          </h1>
          <p className="contact-hero__sub">
            Have a question about an order, custom sizing, delivery, or purchasing this website template? 
            Connect with our team via live WhatsApp or send us a message below.
          </p>
        </div>
      </section>

      <section className="section section--pad">
        <div className="contact-grid">
          {/* Col 1: Contact Direct Channels */}
          <div className="contact-channels">
            <h2 className="section__title" style={{ fontSize: '1.75rem', marginBottom: '16px' }}>
              Direct Support Channels
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '28px', lineHeight: 1.6 }}>
              Our team operates 7 days a week to ensure every question and order is handled smoothly.
            </p>

            <div className="contact-channel-cards">
              <a
                href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                  `Hi ${brandName}! I have a question regarding your store.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="contact-channel-card"
              >
                <div className="contact-channel-icon whatsapp">
                  <Icon name="chat" />
                </div>
                <div>
                  <h4>WhatsApp Instant Concierge</h4>
                  <p>Fastest response time (under 15 mins)</p>
                  <span className="channel-action">Chat on WhatsApp &rarr;</span>
                </div>
              </a>

              <a
                href={`mailto:${settings.email}`}
                className="contact-channel-card"
              >
                <div className="contact-channel-icon email">
                  <Icon name="mail" />
                </div>
                <div>
                  <h4>Official Email Support</h4>
                  <p>{settings.email}</p>
                  <span className="channel-action">Send Email &rarr;</span>
                </div>
              </a>

              <div className="contact-channel-card template-inquiry" onClick={openAcquireModal} style={{ cursor: 'pointer' }}>
                <div className="contact-channel-icon template">
                  <Icon name="storefront" />
                </div>
                <div>
                  <h4>Website Template Sales</h4>
                  <p>Interested in purchasing this store code?</p>
                  <span className="channel-action">View Acquisition Details &rarr;</span>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="operating-hours-box">
              <h4>Operating Hours</h4>
              <p>Monday – Saturday: 9:00 AM – 9:00 PM IST</p>
              <p>Sunday: 10:00 AM – 6:00 PM IST</p>
            </div>
          </div>

          {/* Col 2: Message Form */}
          <div className="contact-form-wrap">
            <h2 className="section__title" style={{ fontSize: '1.75rem', marginBottom: '16px' }}>
              Send an Inquiry
            </h2>
            {submitted ? (
              <div className="contact-success-box">
                <span className="contact-success-icon">✓</span>
                <h3>Message Sent Successfully!</h3>
                <p>
                  Thank you for reaching out to {brandName}. A concierge specialist will respond 
                  to your email within 2-4 hours.
                </p>
                <button
                  className="btn btn--gold"
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({ name: '', email: '', phone: '', subject: 'Order Inquiry', message: '' })
                  }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="Order Inquiry">Order Status &amp; Tracking</option>
                    <option value="Product Details">Product Details &amp; Sizing</option>
                    <option value="Returns">Returns &amp; Exchange</option>
                    <option value="Acquire Website">Purchasing This Website Template</option>
                    <option value="General">Other / Feedback</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="How can we assist you today?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn--gold btn--block">
                  Submit Inquiry &rarr;
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="section section--pad section--alt">
        <div className="section__head" style={{ textAlign: 'center', justifyContent: 'center' }}>
          <div>
            <span className="section__eyebrow">✦ QUICK ANSWERS</span>
            <h2 className="section__title">Frequently Asked Questions</h2>
          </div>
        </div>

        <div className="faqs-list" style={{ maxWidth: '48rem', margin: '0 auto' }}>
          {FAQS.map((faq, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-summary">
                <span>{faq.q}</span>
                <Icon name="expand_more" />
              </summary>
              <div className="faq-body">
                <p>{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
