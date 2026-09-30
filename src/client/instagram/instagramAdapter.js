import { AURA_INSTAGRAM } from '../../config'
import { cmsRepository } from '../../features/cms/services/cmsRepository'

export const instagramAdapter = {
  openProfile: () => {
    window.open(AURA_INSTAGRAM, '_blank')
  },
  getFeedImages: () => cmsRepository.loadData().settings.instaFeed || [],
}
