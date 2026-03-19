import { gsap, SplitText, ScrollTrigger } from '@/plugins/gsap'

const splitMap = new Map<HTMLElement, SplitText>()

export function fillText(el: HTMLElement, options?: gsap.TweenVars) {
  clearFill(el)

  const wrapper = document.createElement('div')

  wrapper.classList.add('text-fill-wrapper')

  gsap.set(wrapper, { position: 'relative' })
  gsap.set(el, { color: '#CFCFCF' })

  const overlay = el.cloneNode(true) as HTMLElement

  el.classList.add('text-fill-original')
  el.parentNode?.insertBefore(wrapper, el)
  wrapper.appendChild(el)
  wrapper.appendChild(overlay)

  gsap.set(overlay, {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    color: '#312926',
    pointerEvents: 'none',
  })

  const splitBase = new SplitText(el, { type: 'lines', tag: 'span' })
  const splitOverlay = new SplitText(overlay, { type: 'lines', tag: 'span' })

  splitMap.set(el, splitBase)

  splitOverlay.lines.forEach((line, i) => {
    const baseLine = splitBase.lines[i]

    if (!baseLine) return

    gsap.set(line, { clipPath: 'inset(0 100% 0 0)' })

    gsap.to(line, {
      clipPath: 'inset(0 0% 0 0)',
      ease: 'none',
      delay: i * 0.05,
      scrollTrigger: {
        trigger: baseLine,
        scroller: window,
        start: 'top 80%',
        end: 'top 40%',
        scrub: true,
      },
      ...options,
    })
  })
}

function clearFill(el: HTMLElement) {
  const wrapper =
    el.parentElement?.closest('.text-fill-wrapper') ?? el.closest('.text-fill-wrapper')

  if (!wrapper) return

  const original = wrapper.querySelector<HTMLElement>('.text-fill-original')

  if (!original) return

  splitMap.get(original)?.revert()
  splitMap.delete(original)

  original.classList.remove('text-fill-original')

  ScrollTrigger.getAll()
    .filter((st) => st.trigger && wrapper.contains(st.trigger as HTMLElement))
    .forEach((st) => st.kill())

  wrapper.parentNode?.insertBefore(original, wrapper)
  wrapper.remove()
}
