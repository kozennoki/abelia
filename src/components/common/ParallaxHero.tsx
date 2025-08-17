'use client'

import { useEffect, useState, useCallback, useRef } from 'react'

interface ParallaxHeroProps {
  backgroundImage: string
  logoImage: string
}

export function ParallaxHero({
  backgroundImage,
  logoImage
}: ParallaxHeroProps) {
  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // RAF throttling用のフラグ
  const tickingRef = useRef(false)

  // デバイス検出
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // 超最適化されたスクロールハンドラー（RAF throttling）
  const handleScroll = useCallback(() => {
    if (!tickingRef.current) {
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        // ビューポート内でのみパララックス効果を適用
        if (currentScrollY <= window.innerHeight * 1.2) {
          setScrollY(currentScrollY)
        }
        tickingRef.current = false
      })
      tickingRef.current = true
    }
  }, [])

  // スクロールインジケーターのクリックハンドラー
  const scroll = useCallback(() => {
    const topSection = document.querySelector('[data-section="top"]') as HTMLElement
    const header = document.querySelector('header') as HTMLElement

    if (topSection) {
      const headerHeight = header ? header.offsetHeight : 80 // ヘッダーの高さを取得、フォールバック80px
      const targetPosition = topSection.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }, [])

  useEffect(() => {
    setIsLoaded(true)

    // Intersection Observer でパフォーマンス最適化
    const heroElement = document.getElementById('hero-section')
    if (!heroElement) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          window.addEventListener('scroll', handleScroll, {
            passive: true,
            capture: false
          })
        } else {
          window.removeEventListener('scroll', handleScroll)
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.1
      }
    )

    observer.observe(heroElement)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  // デバイス別パララックス強度調整
  const parallaxMultiplier = isMobile ? 0.5 : 1 // モバイルでは50%に軽減
  const backgroundSpeed = 0.5 * parallaxMultiplier
  const overlaySpeed = 0.3 * parallaxMultiplier
  const logoSpeed = -0.1 * parallaxMultiplier
  const scaleSpeed = 0.0001 * parallaxMultiplier

  // 超滑らか パララックス効果の計算
  const backgroundTransform = `translate3d(0, ${scrollY * backgroundSpeed}px, 0)`
  const overlayTransform = `translate3d(0, ${scrollY * overlaySpeed}px, 0)`
  const logoTransform = `translate3d(0, ${scrollY * logoSpeed}px, 0) scale(${1 - scrollY * scaleSpeed})`

  return (
    <section
      id="hero-section"
      className="relative w-full h-screen overflow-hidden"
      style={{
        willChange: 'transform',
        contain: 'layout style paint',
        transform: 'translateZ(0)'
      }}
    >
      {/* パララックス背景レイヤー */}
      <div
        className="absolute inset-0 w-full h-[120%] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          transform: backgroundTransform,
          willChange: 'transform',
          contain: 'layout style paint',
          backfaceVisibility: 'hidden'
        }}
      />

      {/* パララックスオーバーレイレイヤー */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/50"
        style={{
          transform: overlayTransform,
          willChange: 'transform',
          contain: 'layout style paint',
          backfaceVisibility: 'hidden'
        }}
      />

      {/* パララックスロゴレイヤー */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`transition-all duration-1500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{
            transform: logoTransform,
            willChange: 'transform',
            contain: 'layout style paint',
            backfaceVisibility: 'hidden'
          }}
        >
          <img
            src={logoImage}
            alt=""
            role="presentation"
            className="max-w-xs max-h-48 md:max-w-sm md:max-h-72 mx-auto object-contain filter drop-shadow-2xl select-none pointer-events-none"
            style={{
              transition: 'filter 0.3s ease',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)', // ハードウェア加速を強制
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none'
            }}
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      </div>

      {/* スクロールインジケーター */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 cursor-pointer ${
          isLoaded ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        onClick={scroll}
      >
        <div className="flex flex-col items-center text-white group">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center group-hover:border-white/80 transition-colors duration-300 animate-bounce group-hover:[animation-play-state:paused]">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 group-hover:bg-white/90 group-hover:animate-pulse transition-colors duration-300"></div>
          </div>
          <p className="mt-2 text-sm font-light group-hover:text-white transition-colors duration-300 animate-bounce group-hover:[animation-play-state:paused]">Scroll</p>
        </div>
      </div>
    </section>
  )
}
