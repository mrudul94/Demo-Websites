import { useState } from 'react'
import Icon from '../components/Icon'
import { useStore } from '../context/CMSContext'

export default function TrackOrder() {
  const { brandName, settings } = useStore()
  const [orderId, setOrderId] = useState('')
  const [phone, setPhone] = useState('')
  const [trackingData, setTrackingData] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleTrack = (e) => {
    e.preventDefault()
    if (!orderId.trim() && !phone.trim()) return

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      const prefix = brandName.slice(0, 3).toUpperCase()
      const cleanId = orderId.trim().toUpperCase() || `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`
      setTrackingData({
        orderId: cleanId,
        status: 'In Transit via Express Courier',
        courier: 'Express Global Air Cargo',
        awb: 'EXP' + Math.floor(100000000 + Math.random() * 900000000),
        estimatedDelivery: '2 to 3 Business Days',
        destination: 'Destination Hub',
        steps: [
          { title: 'Order Verified & Approved', date: 'Yesterday', completed: true },
          { title: `Inspected & Packed in ${brandName} Box`, date: 'Yesterday', completed: true },
          { title: 'Dispatched from Central Hub', date: 'Today, 09:30 AM', completed: true },
          { title: 'In Transit to Regional Air Hub', date: 'In Progress', current: true },
          { title: 'Out for Doorstep Handover', date: 'Pending', completed: false },
        ],
      })
    }, 600)
  }

  return (
    <div className="info-page">
      {/* Hero Header */}
      <section className="info-hero">
        <span className="info-hero__eyebrow">
          <Icon name="radar" className="icon-sm" /> Live Package Tracking
        </span>
        <h1 className="info-hero__title">Track Your Order</h1>
        <p className="info-hero__desc">
          Enter your Order ID (from email/WhatsApp confirmation) or registered phone number 
          below to get instant live tracking status on your package.
        </p>
      </section>

      {/* Main Content */}
      <div className="info-body">
        {/* Tracking Lookup Box */}
        <div
          className="info-card"
          style={{
            maxWidth: '640px',
            margin: '0 auto 48px',
            padding: '36px',
            background: 'var(--surface)',
            border: '1px solid var(--outline-variant)',
            borderRadius: 'var(--radius-xl)',
          }}
        >
          <form onSubmit={handleTrack}>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="field-label" style={{ fontWeight: 600 }}>ORDER REFERENCE ID</label>
              <input
                type="text"
                placeholder="e.g. #ORD-84920"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="modern-input"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--outline-variant)' }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="field-label" style={{ fontWeight: 600 }}>OR PHONE NUMBER</label>
              <input
                type="tel"
                placeholder="e.g. +91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="modern-input"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--outline-variant)' }}
              />
            </div>

            <button type="submit" className="btn btn--gold btn--block" disabled={loading}>
              {loading ? 'Searching Courier API...' : 'Track Package Live →'}
            </button>
          </form>
        </div>

        {/* Live Status Result */}
        {trackingData && (
          <div className="tracking-result-box" style={{ maxWidth: '640px', margin: '0 auto 48px', padding: '32px', background: 'var(--surface-container-low)', borderRadius: '16px', border: '1px solid var(--outline-variant)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--secondary)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>ORDER VERIFIED</span>
                <h3 style={{ fontSize: '1.25rem', marginTop: '4px' }}>{trackingData.orderId}</h3>
              </div>
              <span style={{ padding: '6px 12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '999px', fontSize: '12px', fontWeight: 700 }}>
                {trackingData.status}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', padding: '16px', background: '#fff', borderRadius: '10px', marginBottom: '24px' }}>
              <div>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Courier Partner</p>
                <p style={{ fontWeight: 600 }}>{trackingData.courier}</p>
              </div>
              <div>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Estimated Delivery</p>
                <p style={{ fontWeight: 600, color: 'var(--secondary)' }}>{trackingData.estimatedDelivery}</p>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="tracking-timeline">
              {trackingData.steps.map((step, idx) => (
                <div key={idx} className="timeline-step" style={{ display: 'flex', gap: '16px', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: step.completed ? 'var(--secondary)' : step.current ? 'var(--primary)' : 'var(--outline-variant)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
                      {step.completed ? '✓' : idx + 1}
                    </div>
                    {idx < trackingData.steps.length - 1 && (
                      <div style={{ width: '2px', height: '28px', background: step.completed ? 'var(--secondary)' : 'var(--outline-variant)', marginTop: '4px' }} />
                    )}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 600 }}>{step.title}</h4>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Support Banner */}
        <div className="info-support-banner">
          <div>
            <h3>Need personal delivery support?</h3>
            <p>Our WhatsApp concierge is available 7 days a week to update you on shipping.</p>
          </div>
          <a
            href={`https://wa.me/${settings.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn--gold"
          >
            <Icon name="chat" className="icon-sm" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
