import { supabase, isSupabaseConfigured } from '../../../lib/supabaseClient'
import { storageService } from '../../../services/storageService'

export const DEFAULT_HERO = {
  eyebrow: '✦ ATELIER AURA • TIMELESS MINIMALISM',
  title: 'Jewellery Crafted to Live In, Never Take Off',
  sub: 'Anti-tarnish • Water-safe • Sweatproof. Luxury 18K gold-plated essentials designed for seamless daily elegance.',
  bgImg: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1920&q=85',
  bgFit: 'ambient',
}

export const DEFAULT_CATEGORIES = [
  {
    id: 'cat-1',
    name: 'Necklaces & Pendants',
    slug: 'necklaces',
    img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cat-2',
    name: 'Statement & Stacking Rings',
    slug: 'rings',
    img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cat-3',
    name: 'Sculptural Earrings',
    slug: 'earrings',
    img: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cat-4',
    name: 'Cuffs & Bracelets',
    slug: 'bracelets',
    img: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80',
  },
]

export const DEFAULT_PRODUCTS = [
  {
    id: 'aura-01',
    name: 'Solstice Serpent Chain Necklace',
    category: 'Necklaces & Pendants',
    price: 1899,
    compareAt: 2499,
    tag: 'BESTSELLER',
    isNewArrival: true,
    desc: '18K heavy gold plated liquid herringbone snake chain. Fluid, high-shine silhouette engineered with permanent anti-tarnish micro-shielding for 24/7 wear.',
    img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    img2: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    material: '18K Gold Plated Stainless Steel',
    care: 'Anti-tarnish, 100% waterproof, sweatproof, perfume-safe',
  },
  {
    id: 'aura-02',
    name: 'Celestial Baroque Pearl Pendant',
    category: 'Necklaces & Pendants',
    price: 2199,
    compareAt: 2899,
    tag: 'NEW',
    isNewArrival: true,
    desc: 'Hand-selected natural freshwater baroque pearl suspended from a delicate 18K gold vermeil link chain. Unique organic shape with an iridescent natural luster.',
    img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    img2: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    material: 'Freshwater Baroque Pearl & 18K Gold Vermeil',
    care: 'Anti-tarnish, water-resistant, hypoallergenic',
  },
  {
    id: 'aura-03',
    name: 'Aethel Signet Ring',
    category: 'Statement & Stacking Rings',
    price: 1499,
    compareAt: 1999,
    tag: 'SIGNATURE',
    isNewArrival: false,
    desc: 'Clean geometric face with mirror-polish chamfered edges. Designed to stack effortlessly or serve as a standalone focal piece.',
    img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    img2: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80',
    material: 'Heavy 18K Gold Coating over Surgical Steel',
    care: 'Never tarnishes, shower-safe, hypoallergenic',
  },
  {
    id: 'aura-04',
    name: 'Eternity Pavé Duo Ring',
    category: 'Statement & Stacking Rings',
    price: 1699,
    compareAt: 2299,
    tag: 'BESTSELLER',
    isNewArrival: true,
    desc: 'Double interlocking band encrusted with hand-set brilliant cubic zirconia stones for an everlasting sparkle in any light.',
    img: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80',
    img2: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    material: '18K Gold Plated Brass & Pavé Cubic Zirconia',
    care: 'Anti-tarnish, sweat-resistant, lead & nickel free',
  },
  {
    id: 'aura-05',
    name: 'Aura Molten Huggie Hoops',
    category: 'Sculptural Earrings',
    price: 1399,
    compareAt: 1799,
    tag: 'TRENDING',
    isNewArrival: true,
    desc: 'Organic sculpted molten gold hoops with secure click-closure. Feather-light for all-day wear with a radiant warm tone.',
    img: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
    img2: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    material: '18K Gold Plated Stainless Steel',
    care: 'Waterproof, shower-safe, anti-allergic posts',
  },
  {
    id: 'aura-06',
    name: 'Cascade Drop Threader Earrings',
    category: 'Sculptural Earrings',
    price: 1599,
    compareAt: 1999,
    tag: 'NEW',
    isNewArrival: true,
    desc: 'Ultra-fine linear chain threaders that drape gracefully with subtle kinetic shimmer. Fluid and ultra-modern minimalism.',
    img: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80',
    img2: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
    material: 'Solid Sterling Silver with 18K Gold Vermeil',
    care: 'Anti-tarnish nano-sealed, water-safe',
  },
  {
    id: 'aura-07',
    name: 'Verona Sculpted Cuff',
    category: 'Cuffs & Bracelets',
    price: 1999,
    compareAt: 2699,
    tag: 'BESTSELLER',
    isNewArrival: false,
    desc: 'Bold architectural cuff with smooth contoured taper and an adjustable open fit. Casts a warm champagne gold glow on any wrist.',
    img: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80',
    img2: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    material: '18K Gold Plated Stainless Steel',
    care: '100% waterproof, sweatproof, perfume-resistant',
  },
  {
    id: 'aura-08',
    name: 'Lumière Pavé Tennis Bracelet',
    category: 'Cuffs & Bracelets',
    price: 2499,
    compareAt: 3299,
    tag: 'LUXURY',
    isNewArrival: true,
    desc: 'Timeless four-prong tennis bracelet with seamless dual-safety box clasp. Engineered to glisten continuously under sunlight or candlelight.',
    img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    img2: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80',
    material: '18K Gold Plated & Flawless AAAAA Cubic Zirconia',
    care: 'Anti-tarnish, water-safe, hypoallergenic',
  },
]

export const DEFAULT_MARQUEE = [
  '✦ COMPLIMENTARY PAN-INDIA EXPRESS SHIPPING ON ORDERS ABOVE ₹999',
  '✦ AURA — LUXURY MINIMALIST ANTI-TARNISH JEWELLERY',
  '✦ WATERPROOF • SWEATPROOF • HYPOALLERGENIC • DESIGNED FOR 24/7 WEAR',
  '✦ BUY DIRECTLY ON WHATSAPP WITH INSTANT CONCIERGE ASSISTANCE',
]

export const DEFAULT_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Ananya Sharma',
    stars: 5,
    text: 'I have worn my Solstice Chain every single day for the past 3 months — in the gym, shower, and ocean. Zero tarnishing, looks just as gold as day one!',
  },
  {
    id: 'rev-2',
    author: 'Meera Kapoor',
    stars: 5,
    text: 'The packaging from AURA is pure luxury. The baroque pearl necklace exceeded every expectation. Stunning quality and super prompt shipping!',
  },
  {
    id: 'rev-3',
    author: 'Rhea Patel',
    stars: 5,
    text: 'Usually gold plated rings turn my fingers green within a week. The AURA signet ring has not tarnished at all. 10/10 recommend!',
  },
  {
    id: 'rev-4',
    author: 'Sanya Malhotra',
    stars: 5,
    text: 'Minimal, chic, and genuinely water-safe. Ordering via WhatsApp was so smooth and fast. AURA is my go-to gifting brand now.',
  },
]

export const DEFAULT_INSTA = [
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80',
]

export const DEFAULT_SETTINGS = {
  whatsappNumber: '918075915386',
  freeShippingThreshold: 999,
  storeNotice: '⚡ All orders ship with a signature velvet pouch and luxury care card.',
  customerCount: '15,000+',
}

const LOCAL_STORAGE_KEY = 'aura_cms_data_v1'

let activeFetchPromise = null

export const cmsRepository = {
  /**
   * Synchronously load data from localStorage or default fallbacks.
   */
  loadData: () => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        return {
          products: (parsed.products && parsed.products.length > 0) ? parsed.products : DEFAULT_PRODUCTS,
          hero: parsed.hero || DEFAULT_HERO,
          categories: (parsed.categories && parsed.categories.length > 0) ? parsed.categories : DEFAULT_CATEGORIES,
          marquee: (parsed.marquee && parsed.marquee.length > 0) ? parsed.marquee : DEFAULT_MARQUEE,
          reviews: (parsed.reviews && parsed.reviews.length > 0) ? parsed.reviews : DEFAULT_REVIEWS,
          settings: parsed.settings || DEFAULT_SETTINGS,
        }
      }
    } catch (e) {
      console.warn('Could not parse localStorage cache:', e)
    }
    return {
      products: DEFAULT_PRODUCTS,
      hero: DEFAULT_HERO,
      categories: DEFAULT_CATEGORIES,
      marquee: DEFAULT_MARQUEE,
      reviews: DEFAULT_REVIEWS,
      settings: DEFAULT_SETTINGS,
    }
  },

  /**
   * Async fetch from Supabase PostgreSQL database.
   */
  fetchFromSupabase: async () => {
    if (!isSupabaseConfigured() || !supabase) {
      return cmsRepository.loadData()
    }

    if (activeFetchPromise) {
      return activeFetchPromise
    }

    activeFetchPromise = (async () => {
      try {
        const [
          { data: catData, error: catErr },
          { data: prodData, error: prodErr },
          { data: heroData, error: heroErr },
          { data: annData, error: annErr },
          { data: revData, error: revErr },
          { data: setDa, error: setErr },
        ] = await Promise.all([
          supabase.from('categories').select('*').or('is_active.eq.true,is_active.is.null').order('priority', { ascending: true }),
          supabase.from('products').select('*').or('is_active.eq.true,is_active.is.null').order('priority', { ascending: true }),
          supabase.from('hero').select('*').eq('id', 1).maybeSingle(),
          supabase.from('announcements').select('*').or('is_active.eq.true,is_active.is.null').order('priority', { ascending: true }),
          supabase.from('reviews').select('*').or('is_active.eq.true,is_active.is.null'),
          supabase.from('store_settings').select('*').eq('id', 1).maybeSingle(),
        ])

        if (catErr) console.error('[Supabase CMS Error] Failed to fetch categories:', catErr)
        if (prodErr) {
          console.error('[Supabase CMS Error] Failed to fetch products:', prodErr)
        }

        const categories = (catData || []).map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug || c.name.toLowerCase().replace(/\s+/g, '-'),
          img: storageService.getPublicUrl(c.img),
        }))

        const catMapById = new Map(categories.map((c) => [c.id, c.name]))

        const products = (prodData || []).map((p) => {
          const resolvedCategory = p.category_id ? (catMapById.get(p.category_id) || p.category_name) : p.category_name
          return {
            id: p.id,
            name: p.name,
            category: resolvedCategory || 'Necklaces & Pendants',
            categoryId: p.category_id,
            price: Number(p.price || 0),
            compareAt: p.compare_at ? Number(p.compare_at) : null,
            tag: p.tag || '',
            img: storageService.getPublicUrl(p.img),
            img2: storageService.getPublicUrl(p.img2),
            desc: p.description || '',
            material: p.material || '18K Gold Plated Stainless Steel',
            care: p.care || 'Anti-tarnish, water-safe, sweatproof',
          }
        })

        const hero = heroData
          ? {
              eyebrow: heroData.eyebrow || DEFAULT_HERO.eyebrow,
              title: heroData.title || DEFAULT_HERO.title,
              sub: heroData.sub || DEFAULT_HERO.sub,
              bgImg: storageService.getPublicUrl(heroData.bg_img) || DEFAULT_HERO.bgImg,
              bgFit: heroData.bg_fit || heroData.bgFit || 'ambient',
            }
          : DEFAULT_HERO

        const marquee = (annData || []).map((a) => a.text).filter(Boolean)

        const reviews = (revData || []).map((r) => ({
          id: r.id,
          author: r.author,
          stars: Number(r.stars || 5),
          text: r.text,
        }))

        const settings = setDa
          ? {
              whatsappNumber: setDa.whatsapp_number || DEFAULT_SETTINGS.whatsappNumber,
              freeShippingThreshold: Number(setDa.free_shipping_threshold || DEFAULT_SETTINGS.freeShippingThreshold),
              storeNotice: setDa.store_notice || DEFAULT_SETTINGS.storeNotice,
              customerCount: setDa.customer_count || DEFAULT_SETTINGS.customerCount,
            }
          : DEFAULT_SETTINGS

        const fullData = {
          products: products.length > 0 ? products : DEFAULT_PRODUCTS,
          hero,
          categories: categories.length > 0 ? categories : DEFAULT_CATEGORIES,
          marquee: marquee.length > 0 ? marquee : DEFAULT_MARQUEE,
          reviews: reviews.length > 0 ? reviews : DEFAULT_REVIEWS,
          settings,
        }

        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fullData))
        } catch (err) {}

        return fullData
      } catch (err) {
        console.error('[Supabase CMS Failure] Cloud data fetch failed, using local cache:', err)
        return cmsRepository.loadData()
      } finally {
        activeFetchPromise = null
      }
    })()

    return activeFetchPromise
  },

  saveData: (data) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
    } catch (e) {}
  },
}
