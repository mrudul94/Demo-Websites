import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Marquee from './Marquee'
import Header from './Header'
import MobileNav from './MobileNav'
import SearchOverlay from './SearchOverlay'
import Footer from './Footer'
import CartDrawer from './CartDrawer'
import WhatsAppFloat from './WhatsAppFloat'
import StoreCustomizer from './StoreCustomizer'
import AcquireModal from './AcquireModal'
import { useCart } from '../context/CartContext'

export default function Layout() {
  const [navOpen, setNavOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { isOpen: cartOpen, closeCart } = useCart()
  const location = useLocation()
  const topbarRef = useRef(null)

  // Measure rendered topbar height and set --topbar-h CSS variable
  useLayoutEffect(() => {
    const el = topbarRef.current
    if (!el) return

    const publish = () => {
      const h = el.getBoundingClientRect().height
      if (h > 0) {
        document.documentElement.style.setProperty('--topbar-h', `${h}px`)
      }
    }

    publish()

    const observer = new ResizeObserver(publish)
    observer.observe(el)

    window.addEventListener('orientationchange', publish)
    window.addEventListener('resize', publish)

    if (document.fonts?.ready) document.fonts.ready.then(publish).catch(() => {})

    return () => {
      observer.disconnect()
      window.removeEventListener('orientationchange', publish)
      window.removeEventListener('resize', publish)
    }
  }, [])

  // Scroll restoration
  useEffect(() => {
    if (!('scrollRestoration' in window.history)) return
    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    return () => {
      window.history.scrollRestoration = previous
    }
  }, [])

  // Close overlays on route change
  useEffect(() => {
    setNavOpen(false)
    setSearchOpen(false)
  }, [location.pathname])

  // Reset scroll on route change
  useLayoutEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0)
      return
    }
    const el = document.querySelector(location.hash)
    if (!el) {
      window.scrollTo(0, 0)
      return
    }
    const raf = requestAnimationFrame(() => {
      const topbar = topbarRef.current?.getBoundingClientRect().height ?? 0
      const top = el.getBoundingClientRect().top + window.pageYOffset - topbar - 16
      window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' })
    })
    return () => cancelAnimationFrame(raf)
  }, [location.key, location.hash])

  // Lock body scroll while a drawer/overlay is open
  useEffect(() => {
    if (!(navOpen || cartOpen)) return

    const scrollY = window.pageYOffset
    document.body.style.top = `-${scrollY}px`
    document.body.classList.add('is-locked')

    return () => {
      document.body.classList.remove('is-locked')
      document.body.style.top = ''
      window.scrollTo(0, scrollY)
    }
  }, [navOpen, cartOpen])

  // Escape key handler
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        closeCart()
        setSearchOpen(false)
        setNavOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeCart])

  return (
    <>
      <div className="site-topbar" ref={topbarRef}>
        <Marquee />
        <Header
          onOpenNav={() => setNavOpen(true)}
          onOpenSearch={() => setSearchOpen(true)}
        />
      </div>

      <MobileNav open={navOpen} onClose={() => setNavOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      <main className="site-main">
        <Outlet />
      </main>

      <Footer />
      <CartDrawer />
      <WhatsAppFloat />
      <StoreCustomizer />
      <AcquireModal />
    </>
  )
}
