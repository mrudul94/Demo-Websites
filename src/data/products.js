// ============================================================
// OMNI COMMERCE — Products Data Loader
// Provides reactive access to multi-category catalog items
// ============================================================
import { SHOWCASE_PRODUCTS } from './showcaseData'

export const getActiveProducts = () => {
  try {
    const saved = localStorage.getItem('omni_custom_products')
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch (e) {}
  return SHOWCASE_PRODUCTS
}

export const findProduct = (id) => {
  const products = getActiveProducts()
  return products.find((p) => String(p.id) === String(id)) || SHOWCASE_PRODUCTS.find((p) => String(p.id) === String(id)) || null
}

export const AURA_PRODUCTS = SHOWCASE_PRODUCTS
export const VIA_PRODUCTS = SHOWCASE_PRODUCTS
export const DEFAULT_PRODUCTS = SHOWCASE_PRODUCTS
