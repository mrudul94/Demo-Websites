import Icon from '../components/Icon'
import { useStore } from '../context/CMSContext'

export default function Shipping() {
  const { brandName, settings } = useStore()

  return (
    <div className="info-page">
      {/* Hero Header */}
      <section className="info-hero">
        <span className="info-hero__eyebrow">
          <Icon name="local_shipping" className="icon-sm" /> Express Tracked Delivery
        </span>
        <h1 className="info-hero__title">Shipping &amp; Delivery</h1>
        <p className="info-hero__desc">
          Every {brandName} order is dispatched with protective luxury packaging, insured courier handling, 
          and real-time tracking directly to your doorstep.
        </p>
      </section>

      {/* Main Content */}
      <div className="info-body">
        {/* Highlight Cards */}
        <div className="info-grid-3">
          <div className="info-card">
            <div className="info-card__icon-wrap">
              <Icon name="bolt" />
            </div>
            <h3 className="info-card__title">24-Hour Dispatch</h3>
            <p className="info-card__text">
              Orders placed before 2 PM are processed and handed over to our premier courier partners within 24 hours on business days.
            </p>
          </div>

          <div className="info-card">
            <div className="info-card__icon-wrap">
              <Icon name="card_giftcard" />
            </div>
            <h3 className="info-card__title">Signature Packaging</h3>
            <p className="info-card__text">
              Each piece arrives inside custom protective luxury boxes, perfect for gifting or safe keeping.
            </p>
          </div>

          <div className="info-card">
            <div className="info-card__icon-wrap">
              <Icon name="verified_user" />
            </div>
            <h3 className="info-card__title">Insured Transit</h3>
            <p className="info-card__text">
              All shipments are 100% insured against loss or transit damage. If anything happens, a free replacement is dispatched immediately.
            </p>
          </div>
        </div>

        {/* Timelines Section */}
        <section className="info-section">
          <h2 className="info-section__title">Delivery Timelines &amp; Charges</h2>
          <div className="step-list">
            <div className="step-item">
              <div className="step-item__number">1</div>
              <div className="step-item__content">
                <h4 className="step-item__title">Express Metro Delivery — 2 to 3 Business Days</h4>
                <p className="step-item__desc">
                  Fast-tracked air couriers to major metropolitan hubs.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-item__number">2</div>
              <div className="step-item__content">
                <h4 className="step-item__title">Rest of Country &amp; Tier 2/3 Cities — 3 to 5 Business Days</h4>
                <p className="step-item__desc">
                  Reliable door-to-door delivery with real-time SMS and WhatsApp notifications.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-item__number">3</div>
              <div className="step-item__content">
                <h4 className="step-item__title">International Express — 5 to 8 Business Days</h4>
                <p className="step-item__desc">
                  Shipped via DHL / FedEx with customs clearance and complete tracking.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Support Callout */}
        <div className="info-support-banner">
          <div>
            <h3>Need urgent delivery assistance?</h3>
            <p>Our WhatsApp concierge can expedite your parcel or check delivery pincodes in seconds.</p>
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
