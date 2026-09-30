import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import {
  STORE_PRESETS,
  SHOWCASE_CATEGORIES,
  SHOWCASE_PRODUCTS,
  SHOWCASE_REVIEWS,
  STORE_PILLARS,
} from '../../../data/showcaseData'
import { useToast } from '../../../context/ToastContext'

const CMSContext = createContext(null)

const DEFAULT_SETTINGS = {
  whatsappNumber: '918075915386',
  email: 'contact@auroracommerce.store',
  freeShippingThreshold: 999,
  storeNotice: '⚡ All orders ship with luxury protective packaging & certificate of authenticity.',
  customerCount: '25,000+',
}

const DEFAULT_MARQUEE = [
  '✦ FLASH SALE: ENJOY 20% OFF YOUR FIRST ORDER WITH CODE: LAUNCH20',
  '✦ COMPLIMENTARY EXPRESS GLOBAL SHIPPING ON ORDERS ABOVE ₹999 / $49',
  '✦ 100% SATISFACTION GUARANTEED • 7-DAY HASSLE-FREE RETURNS',
  '✦ INSTANT 1-CLICK WHATSAPP CHECKOUT & 24/7 CONCIERGE ASSISTANCE',
  '✦ TURNKEY E-COMMERCE WEBSITE TEMPLATE AVAILABLE FOR SALE • READY TO DEPLOY',
]

export function CMSProvider({ children }) {
  const toast = useToast()

  // 1. Active Preset State
  const [activePresetKey, setActivePresetKey] = useState(() => {
    try {
      return localStorage.getItem('omni_preset') || 'omni'
    } catch (e) {
      return 'omni'
    }
  })

  // 2. Custom Branding overrides
  const [customBrandName, setCustomBrandName] = useState(() => {
    try {
      return localStorage.getItem('omni_brand_name') || ''
    } catch (e) {
      return ''
    }
  })

  const [customTagline, setCustomTagline] = useState(() => {
    try {
      return localStorage.getItem('omni_tagline') || ''
    } catch (e) {
      return ''
    }
  })

  const [accentColor, setAccentColor] = useState(() => {
    try {
      return localStorage.getItem('omni_accent_color') || STORE_PRESETS.omni.accentColor
    } catch (e) {
      return STORE_PRESETS.omni.accentColor
    }
  })

  const [currency, setCurrencyState] = useState(() => {
    try {
      return localStorage.getItem('omni_currency') || 'INR'
    } catch (e) {
      return 'INR'
    }
  })

  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('omni_settings')
      if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }
    } catch (e) {}
    return DEFAULT_SETTINGS
  })

  // Modals & Panels
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false)
  const [isAcquireModalOpen, setIsAcquireModalOpen] = useState(false)

  // Current active preset object
  const activePreset = useMemo(
    () => STORE_PRESETS[activePresetKey] || STORE_PRESETS.omni,
    [activePresetKey]
  )

  // Dynamic CSS variables injector for real-time live theme updates
  useEffect(() => {
    const root = document.documentElement
    if (accentColor) {
      root.style.setProperty('--secondary', accentColor)
      root.style.setProperty('--secondary-hover', accentColor)
      root.style.setProperty(
        '--gold-gradient',
        `linear-gradient(135deg, #ffffff 0%, ${accentColor} 60%, #000000 130%)`
      )
      root.style.setProperty(
        '--secondary-glow',
        `${accentColor}40`
      )
      root.style.setProperty('--secondary-fixed', accentColor)
    }
  }, [accentColor])

  // Save changes to localStorage
  const setPreset = useCallback((presetKey) => {
    const target = STORE_PRESETS[presetKey]
    if (!target) return
    setActivePresetKey(presetKey)
    setAccentColor(target.accentColor)
    try {
      localStorage.setItem('omni_preset', presetKey)
      localStorage.setItem('omni_accent_color', target.accentColor)
    } catch (e) {}
    if (toast) toast(`✨ Switched to "${target.name}" (${target.badge})`)
  }, [toast])

  const setCurrency = useCallback((curr) => {
    setCurrencyState(curr)
    try {
      localStorage.setItem('omni_currency', curr)
    } catch (e) {}
    if (toast) toast(`Currency set to ${curr}`)
  }, [toast])

  const setBrandName = useCallback((name) => {
    setCustomBrandName(name)
    try {
      localStorage.setItem('omni_brand_name', name)
    } catch (e) {}
  }, [])

  const setTagline = useCallback((tag) => {
    setCustomTagline(tag)
    try {
      localStorage.setItem('omni_tagline', tag)
    } catch (e) {}
  }, [])

  const updateSetting = useCallback((key, value) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: value }
      try {
        localStorage.setItem('omni_settings', JSON.stringify(next))
      } catch (e) {}
      return next
    })
  }, [])

  const resetCustomizer = useCallback(() => {
    try {
      localStorage.removeItem('omni_preset')
      localStorage.removeItem('omni_brand_name')
      localStorage.removeItem('omni_tagline')
      localStorage.removeItem('omni_accent_color')
      localStorage.removeItem('omni_currency')
      localStorage.removeItem('omni_settings')
    } catch (e) {}
    setActivePresetKey('omni')
    setCustomBrandName('')
    setCustomTagline('')
    setAccentColor(STORE_PRESETS.omni.accentColor)
    setCurrencyState('INR')
    setSettings(DEFAULT_SETTINGS)
    if (toast) toast('Reset to default Omni Store showcase!')
  }, [toast])

  // Resolved brand details
  const resolvedBrandName = customBrandName.trim() || activePreset.name
  const resolvedTagline = customTagline.trim() || activePreset.badge

  // Filtered or full product catalog
  const products = useMemo(() => {
    if (activePreset.categoryFilter && activePreset.categoryFilter !== 'All') {
      const filtered = SHOWCASE_PRODUCTS.filter(
        (p) => p.category === activePreset.categoryFilter
      )
      // If filtered has items, show filtered first, then others
      const others = SHOWCASE_PRODUCTS.filter(
        (p) => p.category !== activePreset.categoryFilter
      )
      return [...filtered, ...others]
    }
    return SHOWCASE_PRODUCTS
  }, [activePreset])

  const hero = useMemo(
    () => ({
      eyebrow: activePreset.eyebrow,
      title: activePreset.title,
      sub: activePreset.sub,
      bgImg: activePreset.bgImg,
      bgFit: 'ambient',
    }),
    [activePreset]
  )

  const findProduct = useCallback(
    (id) => SHOWCASE_PRODUCTS.find((p) => String(p.id) === String(id)) || null,
    []
  )

  const value = {
    // Core data
    products,
    categories: SHOWCASE_CATEGORIES,
    hero,
    marquee: DEFAULT_MARQUEE,
    reviews: SHOWCASE_REVIEWS,
    pillars: STORE_PILLARS,
    settings,
    isLoading: false,
    
    // Store identity & customization
    brandName: resolvedBrandName,
    brandTagline: resolvedTagline,
    activePresetKey,
    activePreset,
    accentColor,
    currency,

    // Controls
    isCustomizerOpen,
    openCustomizer: () => setIsCustomizerOpen(true),
    closeCustomizer: () => setIsCustomizerOpen(false),
    toggleCustomizer: () => setIsCustomizerOpen((v) => !v),

    isAcquireModalOpen,
    openAcquireModal: () => setIsAcquireModalOpen(true),
    closeAcquireModal: () => setIsAcquireModalOpen(false),

    setPreset,
    setBrandName,
    setTagline,
    setAccentColor,
    setCurrency,
    updateSetting,
    resetCustomizer,
    resetDefaults: resetCustomizer,
    findProduct,
    refreshData: () => {},
  }

  return <CMSContext.Provider value={value}>{children}</CMSContext.Provider>
}

export const useCMS = () => {
  const context = useContext(CMSContext)
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider')
  }
  return context
}

export const useStore = useCMS
