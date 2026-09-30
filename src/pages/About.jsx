import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { useStore } from '../context/CMSContext'

export default function About() {
  const { brandName, openAcquireModal } = useStore()

  const VALUES = [
    {
      icon: 'verified',
      title: 'Uncompromising Quality',
      desc: 'Engineered with premium materials, surgical steel, aerospace titanium, 480 GSM cottons, and clean active botanicals.',
    },
    {
      icon: 'all_inclusive',
      title: 'Timeless Longevity',
      desc: 'We discard seasonal obsolescence in favor of enduring silhouettes and durable hardware made to last years.',
    },
    {
      icon: 'local_shipping',
      title: 'Direct-to-Consumer Value',
      desc: 'By eliminating traditional middlemen and luxury retail markups, we deliver flagship craftsmanship directly to your doorstep.',
    },
    {
      icon: 'forum',
      title: 'Human VIP Concierge',
      desc: 'Real human support via instant WhatsApp and email. No automated dead-ends or robotic loops.',
    },
  ]

  return (
    <div className="about-page">
      {/* Hero Header */}
      <section className="about-hero">
        <div className="about-hero__content">
          <span className="about-hero__eyebrow">
            ✦ THE PHILOSOPHY BEHIND {brandName.toUpperCase()}
          </span>
          <h1 className="about-hero__title">
            Curated Form. Precision Craft. Everyday Refinement.
          </h1>
          <p className="about-hero__sub">
            {brandName} was established to bridge the gap between architectural minimalism 
            and everyday functionality across fashion, technology, horology, and modern lifestyle.
          </p>
        </div>
      </section>

      {/* Stats Counter Strip */}
      <section className="about-stats-strip">
        <div className="about-stat-item">
          <span className="about-stat-number">25,000+</span>
          <span className="about-stat-label">Orders Delivered</span>
        </div>
        <div className="about-stat-sep" />
        <div className="about-stat-item">
          <span className="about-stat-number">4.9 / 5.0</span>
          <span className="about-stat-label">Average Customer Score</span>
        </div>
        <div className="about-stat-sep" />
        <div className="about-stat-item">
          <span className="about-stat-number">48 Hours</span>
          <span className="about-stat-label">Average Express Dispatch</span>
        </div>
        <div className="about-stat-sep" />
        <div className="about-stat-item">
          <span className="about-stat-number">100%</span>
          <span className="about-stat-label">Independent &amp; Direct</span>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="section section--pad about-story-grid">
        <div className="about-story-text">
          <span className="section__eyebrow">✦ OUR APPROACH</span>
          <h2 className="section__title">Designed for Those Who Care About Details</h2>
          <p>
            Whether it is the weighted acoustic tactile feel of a mechanical switch, 
            the fluid drape of pre-shrunk loopback cotton, or the scratchproof brilliance of 
            sapphire crystal — we believe the objects you interact with every day shape your daily momentum.
          </p>
          <p>
            Every product in our catalog undergoes rigorous real-world endurance testing before it is 
            released. We source directly from master artisans and ISO-certified workshops around the globe.
          </p>
          <div style={{ marginTop: '24px' }}>
            <Link to="/shop" className="btn btn--gold">
              Explore Our Catalog &rarr;
            </Link>
          </div>
        </div>

        <div className="about-story-image">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80"
            alt="Studio Design Workspace"
          />
        </div>
      </section>

      {/* Core Values */}
      <section className="section section--pad section--alt">
        <div className="section__head" style={{ textAlign: 'center', justifyContent: 'center' }}>
          <div>
            <span className="section__eyebrow">✦ FOUNDATIONAL PRINCIPLES</span>
            <h2 className="section__title">The Standards We Live By</h2>
          </div>
        </div>

        <div className="pillar-grid">
          {VALUES.map((v) => (
            <div key={v.title} className="pillar-card">
              <div className="pillar-card__icon-wrap">
                <Icon name={v.icon} className="pillar-card__icon" />
              </div>
              <h3 className="pillar-card__title">{v.title}</h3>
              <p className="pillar-card__desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Commercial Showcase Card */}
      <section className="section section--pad">
        <div className="about-commercial-banner">
          <h3>Are you an entrepreneur or agency looking for this store template?</h3>
          <p>
            This entire web application is available for commercial acquisition. 
            Enjoy complete source code ownership, zero subscription fees, lightning performance, 
            and turnkey deployment for any retail niche.
          </p>
          <button className="btn btn--gold" onClick={openAcquireModal}>
            <Icon name="verified" className="icon-sm" />
            Learn More About Licensing This Website
          </button>
        </div>
      </section>
    </div>
  )
}
