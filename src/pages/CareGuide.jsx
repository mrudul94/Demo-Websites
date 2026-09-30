import Icon from '../components/Icon'
import { useStore } from '../context/CMSContext'

export default function CareGuide() {
  const { brandName, settings } = useStore()

  return (
    <div className="info-page">
      {/* Hero Header */}
      <section className="info-hero">
        <span className="info-hero__eyebrow">
          <Icon name="auto_awesome" className="icon-sm" /> Product Longevity &amp; Maintenance
        </span>
        <h1 className="info-hero__title">Product Care &amp; Longevity Guide</h1>
        <p className="info-hero__desc">
          Every item at {brandName} is selected and manufactured with premium endurance standards. 
          Follow our care recommendations to keep your investments pristine for years to come.
        </p>
      </section>

      {/* Main Content */}
      <div className="info-body">
        {/* Anti-Tarnish Science */}
        <div className="info-grid-3">
          <div className="info-card">
            <div className="info-card__icon-wrap">
              <Icon name="headphones" />
            </div>
            <h3 className="info-card__title">Electronics &amp; Audio</h3>
            <p className="info-card__text">
              Store in a cool dry space. Clean headphone ear pads and keyboards with dry microfiber cloth and avoid direct submersions.
            </p>
          </div>

          <div className="info-card">
            <div className="info-card__icon-wrap">
              <Icon name="checkroom" />
            </div>
            <h3 className="info-card__title">Heavyweight Cottons</h3>
            <p className="info-card__text">
              Wash inside out with cold water. Air dry in the shade to preserve rich dye saturation and avoid thermal shrinkage.
            </p>
          </div>

          <div className="info-card">
            <div className="info-card__icon-wrap">
              <Icon name="watch" />
            </div>
            <h3 className="info-card__title">Timepieces &amp; Accessories</h3>
            <p className="info-card__text">
              Surgical steel and sapphire crystal wipe clean easily. Store leather goods in dust bags and apply conditioning once a year.
            </p>
          </div>
        </div>

        {/* Support Banner */}
        <div className="info-support-banner" style={{ marginTop: '48px' }}>
          <div>
            <h3>Have a specific care question?</h3>
            <p>Our concierge team is available to assist with care instructions and replacement parts.</p>
          </div>
          <a
            href={`https://wa.me/${settings.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn--gold"
          >
            <Icon name="chat" className="icon-sm" />
            Ask Concierge
          </a>
        </div>
      </div>
    </div>
  )
}
