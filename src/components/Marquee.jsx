import { useStore } from '../context/CMSContext'

export default function Marquee() {
  const { marquee } = useStore()
  const list = marquee && marquee.length > 0 ? marquee : [
    '✦ SPECIAL OFFER: GET 20% OFF WITH COUPON CODE: LAUNCH20',
    '✦ COMPLIMENTARY EXPRESS GLOBAL SHIPPING ON ORDERS ABOVE ₹999 / $49',
    '✦ 100% SATISFACTION GUARANTEED • 7-DAY HASSLE-FREE RETURNS',
    '✦ READY-TO-DEPLOY TURNKEY E-COMMERCE WEBSITE TEMPLATE AVAILABLE FOR SALE',
  ]

  return (
    <div className="marquee-bar">
      <div className="marquee">
        {[...list, ...list, ...list].map((msg, i) => (
          <span key={i} className="marquee-item">
            <span>{msg}</span>
            <span className="marquee-sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
