// AURA Luxury Minimalist Jewellery & Accessories configuration
export const AURA_BRAND_NAME = 'AURA'
export const AURA_WHATSAPP_NUMBER = '91XXXXXXXXXX'
export const AURA_INSTAGRAM = 'https://www.instagram.com/skaylon2026'

// Backwards compatibility aliases


export const whatsappLink = (message) =>
  `https://wa.me/${AURA_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
