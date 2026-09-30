import { useState } from 'react'
import Icon from '../components/Icon'
import { useStore } from '../context/CMSContext'

const FAQ_CATEGORIES = [
  { id: 'all', label: 'All Questions' },
  { id: 'orders', label: 'Orders & WhatsApp' },
  { id: 'shipping', label: 'Shipping & Delivery' },
  { id: 'returns', label: 'Returns & Quality' },
  { id: 'payments', label: 'Payments & Security' },
  { id: 'template', label: 'Buying This Website' },
]

export default function FAQs() {
  const { brandName, settings, openAcquireModal } = useStore()
  const [activeTab, setActiveTab] = useState('all')

  const FAQS_DATA = [
    {
      cat: 'orders',
      q: 'Can I order directly through WhatsApp?',
      a: `Yes! ${brandName} offers 1-click WhatsApp order generation. You can simply click "Order on WhatsApp" on any product page or in your shopping bag, and a pre-formatted message will be sent to our concierge for instant confirmation.`,
    },
    {
      cat: 'orders',
      q: 'How do I apply coupon codes like LAUNCH20?',
      a: 'You can enter coupon code LAUNCH20 in the Cart Drawer or on the Checkout page to immediately receive 20% off your entire order total.',
    },
    {
      cat: 'shipping',
      q: 'How long does delivery take?',
      a: 'All orders are dispatched within 24-48 hours. Express delivery arrives within 2 to 4 business days in major metros, and 3 to 5 business days for regional zones.',
    },
    {
      cat: 'shipping',
      q: 'Do you offer free shipping?',
      a: `Yes, orders above ₹${settings.freeShippingThreshold} (or $49) automatically unlock 100% complimentary express shipping.`,
    },
    {
      cat: 'returns',
      q: 'What is your return & exchange guarantee?',
      a: 'We offer a 7-day hassle-free replacement or exchange window for all delivered items. If a product arrives damaged or defective, we provide an immediate doorstep replacement.',
    },
    {
      cat: 'payments',
      q: 'Which payment methods are accepted?',
      a: 'We accept all major Credit & Debit cards (Visa, Mastercard), UPI (Google Pay, PhonePe, Paytm), NetBanking, and Cash on Delivery (COD).',
    },
    {
      cat: 'template',
      q: 'Is this entire website available for purchase?',
      a: 'Yes! This high-performance, responsive e-commerce storefront is available as a turnkey commercial template. It features sub-second page loads, zero CMS recurring fees, mobile optimization, and full source code ownership.',
    },
    {
      cat: 'template',
      q: 'How can I acquire or license this website for my brand?',
      a: `Click the "Buy This Website" button in the header or contact us directly on WhatsApp (+${settings.whatsappNumber}) for immediate licensing, pricing, and fast deployment assistance.`,
    },
  ]

  const filteredFaqs =
    activeTab === 'all'
      ? FAQS_DATA
      : FAQS_DATA.filter((f) => f.cat === activeTab)

  return (
    <div className="info-page">
      {/* Hero Header */}
      <section className="info-hero">
        <span className="info-hero__eyebrow">
          <Icon name="help_outline" className="icon-sm" /> 24/7 Knowledge Base
        </span>
        <h1 className="info-hero__title">Frequently Asked Questions</h1>
        <p className="info-hero__desc">
          Everything you need to know about {brandName} orders, delivery, quality, payments, 
          and acquiring this e-commerce platform.
        </p>
      </section>

      {/* Main Content */}
      <div className="info-body">
        {/* Category Pills Filter */}
        <div className="faq-tabs-strip">
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`filter-chip${activeTab === cat.id ? ' is-active' : ''}`}
              onClick={() => setActiveTab(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQs Accordion */}
        <div className="faqs-list" style={{ maxWidth: '48rem', margin: '32px auto' }}>
          {filteredFaqs.map((faq, i) => (
            <details key={i} className="faq-item" open={i === 0}>
              <summary className="faq-summary">
                <span>{faq.q}</span>
                <Icon name="expand_more" />
              </summary>
              <div className="faq-body">
                <p>{faq.a}</p>
                {faq.cat === 'template' && (
                  <div style={{ marginTop: '12px' }}>
                    <button
                      className="btn btn--sm btn--gold"
                      onClick={openAcquireModal}
                    >
                      View Acquisition Details &rarr;
                    </button>
                  </div>
                )}
              </div>
            </details>
          ))}
        </div>

        {/* Support Banner */}
        <div className="info-support-banner">
          <div>
            <h3>Have a question not listed here?</h3>
            <p>Our personal concierge is online right now to answer any question.</p>
          </div>
          <a
            href={`https://wa.me/${settings.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn--gold"
          >
            <Icon name="chat" className="icon-sm" />
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
