// Currency & Number Formatting Helpers with Multi-Currency support

const CURRENCY_CONFIG = {
  INR: { symbol: '₹', locale: 'en-IN', rate: 1 },
  USD: { symbol: '$', locale: 'en-US', rate: 0.012 },
  EUR: { symbol: '€', locale: 'de-DE', rate: 0.011 },
  GBP: { symbol: '£', locale: 'en-GB', rate: 0.0095 },
}

export function getActiveCurrency() {
  try {
    return localStorage.getItem('omni_currency') || 'INR'
  } catch (e) {
    return 'INR'
  }
}

export function formatPrice(n, currency = getActiveCurrency()) {
  if (typeof n !== 'number' || isNaN(n)) return '₹0'
  const config = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.INR
  
  if (currency === 'INR') {
    return `${config.symbol}${Math.round(n).toLocaleString(config.locale)}`
  }
  
  const converted = Math.round(n * config.rate)
  return `${config.symbol}${converted.toLocaleString(config.locale)}`
}

export function formatINR(n) {
  return formatPrice(n, getActiveCurrency())
}
