import { AURA_WHATSAPP_NUMBER } from '../../config'

export const whatsappAdapter = {
  openChat: (customMsg = '') => {
    const url = `https://wa.me/${AURA_WHATSAPP_NUMBER}${customMsg ? '?text=' + encodeURIComponent(customMsg) : ''}`
    window.open(url, '_blank')
  },
}
