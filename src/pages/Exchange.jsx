import Icon from '../components/Icon'
import { useStore } from '../context/CMSContext'

export default function Exchange() {
  const { brandName, settings } = useStore()

  return (
    <div className="info-page">
      {/* Hero Header */}
      <section className="info-hero">
        <span className="info-hero__eyebrow">
          <Icon name="published_with_changes" className="icon-sm" /> Customer Happiness Guarantee
        </span>
        <h1 className="info-hero__title">Returns &amp; Exchange Policy</h1>
        <p className="info-hero__desc">
          Your complete satisfaction is our highest priority. We offer a seamless 7-day exchange window 
          to ensure every item from {brandName} fits your expectations flawlessly.
        </p>
      </section>

      {/* Main Content */}
      <div className="info-body">
        {/* Core Pillars */}
        <div className="info-grid-3">
          <div className="info-card">
            <div className="info-card__icon-wrap">
              <Icon name="event_repeat" />
            </div>
            <h3 className="info-card__title">7-Day Exchange Window</h3>
            <p className="info-card__text">
              If a size isn’t right or you prefer a different color/variant, you can request an exchange within 7 days of package delivery.
            </p>
          </div>

          <div className="info-card">
            <div className="info-card__icon-wrap">
              <Icon name="home_repair_service" />
            </div>
            <h3 className="info-card__title">Doorstep Reverse Pickup</h3>
            <p className="info-card__text">
              We arrange hassle-free reverse courier pickup directly from your doorstep across all serviceable pincodes.
            </p>
          </div>

          <div className="info-card">
            <div className="info-card__icon-wrap">
              <Icon name="shield" />
            </div>
            <h3 className="info-card__title">Damaged Item Replacement</h3>
            <p className="info-card__text">
              Received an item damaged during transit? We offer a 100% instant free replacement or refund upon inspection.
            </p>
          </div>
        </div>

        {/* How To Exchange Steps */}
        <section className="info-section">
          <h2 className="info-section__title">Easy 3-Step Exchange Process</h2>
          <div className="step-list">
            <div className="step-item">
              <div className="step-item__number">1</div>
              <div className="step-item__content">
                <h4 className="step-item__title">Step 1: Contact Our Concierge</h4>
                <p className="step-item__desc">
                  Drop a message on WhatsApp or email us with your order number and item details.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-item__number">2</div>
              <div className="step-item__content">
                <h4 className="step-item__title">Step 2: Courier Pickup Handover</h4>
                <p className="step-item__desc">
                  Our courier partner will arrive to collect the package in its original box and tags.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-item__number">3</div>
              <div className="step-item__content">
                <h4 className="step-item__title">Step 3: Immediate Dispatch of Replacement</h4>
                <p className="step-item__desc">
                  Once collected, your replacement is dispatched with high-priority tracking.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Support Banner */}
        <div className="info-support-banner">
          <div>
            <h3>Initiate an exchange in 2 minutes</h3>
            <p>Our team is available 7 days a week on WhatsApp for immediate concierge support.</p>
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
