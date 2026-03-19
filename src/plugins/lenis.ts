import Lenis from 'lenis'
import { gsap } from 'gsap'

export function initLenis() {
  const lenis = new Lenis()

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

  return lenis
}
