import { gsap, SplitText } from '@/plugins/gsap'

export function showText(
  el: HTMLElement,
  noTrigger?: boolean,
  options?: gsap.TweenVars,
  scroller: Element | Window = window,
) {
  const split = new SplitText(el, { type: 'words', tag: 'span' })

  gsap.set(split.words, {
    display: 'inline-block',
    overflow: 'hidden',
  })

  split.words.forEach((word) => {
    word.innerHTML = `<span class="inner-word" style="display: inline-block">${word.textContent}</span>`
  })

  const words: NodeListOf<Element> = el.querySelectorAll('.inner-word')

  gsap.set(el, { opacity: 1 })

  return gsap.fromTo(
    words,
    { yPercent: 125 },
    {
      yPercent: 0,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.015,

      ...(!noTrigger && {
        scrollTrigger: {
          trigger: el,
          scroller: scroller ?? window,
          start: 'bottom bottom',
        },
      }),

      ...options,
    },
  )
}

export function hideText(el: HTMLElement, options?: gsap.TweenVars) {
  const words: NodeListOf<Element> = el.querySelectorAll('.inner-word')

  if (!words.length) return

  return gsap.to(words, {
    yPercent: 125,
    duration: 0.3,
    ease: 'power2.in',
    stagger: 0.015,
    onComplete: () => {
      gsap.set(words, { opacity: 0 })
    },
    ...options,
  })
}
