<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap, ScrollTrigger } from '@/plugins/gsap.ts'

import SquareEmpty from '@/components/icons/figures/SquareEmpty.vue'
import Circle from '@/components/icons/figures/Circle.vue'
import Square from '@/components/icons/figures/Square.vue'

let tl: gsap.core.Timeline

const SCREENS_COUNT = 3
const currentScreen = ref<number>(1)

function initAnimations() {
  const figuresElement = document.querySelector('section.figures')

  if (!figuresElement) return

  const squareEmptyElement = figuresElement.querySelector('.square-empty')
  const circleElement = figuresElement.querySelector('.circle')
  const squareElement = figuresElement.querySelector('.square')
  const circlePath = figuresElement.querySelector('.circle-path')

  if (!squareEmptyElement || !circleElement || !squareElement || !circlePath) return

  const innerHeight = window.innerHeight

  tl = gsap.timeline({
    scrollTrigger: {
      trigger: figuresElement,
      start: 'top top',
      end: () => `top+=${innerHeight * 2} top`,
      scrub: true,
    },
  })

  tl.to(
    figuresElement,
    {
      '--bg-color': '#A9472C',
      '--icon-figure-color': '#E6D2B5',
      '--icon-svg-color': 'transparent',
      '--line-color': '#D36242',
    },
    0,
  )
    .to(squareElement, { rotate: -45, translateX: '-100%' }, 0)
    .to(squareEmptyElement, { rotate: 45, translateX: '100%', ease: 'none' }, 0)

  tl.fromTo(
    figuresElement,
    { '--icon-svg-color': '#E6D2B5' },
    { '--icon-svg-color': '#A9472C' },
    '50%',
  )
    .to(
      figuresElement,
      {
        '--bg-color': '#E6D2B5',
        '--icon-figure-color': '#A9472C',
        '--text-color': '#A9472C',
        '--line-color': '#5044404D',
      },
      '50%',
    )
    .to(circlePath, { scale: 0, ease: 'power3.in' }, '50%')
    .to(squareEmptyElement, { scaleX: 0.2, skewY: 55, rotate: 37 }, '50%')
    .to(squareEmptyElement, { scaleY: 1.5 }, '50%') //TODO sync

  gsap.set(figuresElement, { '--icon-svg-color': 'transparent' })

  gsap.to(circleElement, {
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: figuresElement,
      start: 'top top',
      end: `+=30%`,
      scrub: true,
      onLeave: () => gsap.set(circlePath, { opacity: 1 }),
      onEnterBack: () => gsap.set(circlePath, { opacity: 0 }),
    },
  })

  ScrollTrigger.create({
    trigger: figuresElement,
    start: 'top top',
    end: '+=100%',
    onLeave: () => gsap.set(squareElement, { opacity: 0 }),
    onEnterBack: () => gsap.set(squareElement, { opacity: 1 }),
  })

  for (let i = 0; i < SCREENS_COUNT; i++) {
    const screen = i + 1

    ScrollTrigger.create({
      trigger: figuresElement,
      start: () => `top+=${innerHeight * i} top`,
      end: () => `top+=${innerHeight * (i + 1)} top`,
      onEnter: () => {
        if (screen === 1) return

        currentScreen.value = screen
      },
      onEnterBack: () => {
        currentScreen.value = screen
      },
    })
  }
}

onMounted(initAnimations)

onUnmounted(() => {
  tl?.kill()
  ScrollTrigger.getAll().forEach((st) => st.kill())
})
</script>

<template>
  <section class="figures">
    <div class="inner">
      <div class="content">
        <div class="header">
          <span class="label anim-text-show">Who It’s For</span>

          <Transition name="fade">
            <span :key="currentScreen" class="number">{{ currentScreen }}</span>
          </Transition>
        </div>

        <div class="shapes">
          <SquareEmpty class="square-empty" />
          <Circle class="circle" />
          <Square class="square" />
        </div>

        <div class="footer">
          <h2 class="title anim-text-show">Creators & Artists</h2>

          <p class="description anim-text-show">
            Independent creatives exploring new ideas, formats, and collaborations across art,
            design, media, and culture.
          </p>
        </div>
      </div>

      <div class="line" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.figures {
  --bg-color: var(--c-charcoal-brown);
  --icon-svg-color: transparent;
  --icon-figure-color: var(--c-sand-beige);
  --text-color: var(--c-ivory);
  --line-color: var(--c-line-brown);

  position: relative;
  height: 330vh;
  background-color: var(--bg-color);

  .inner {
    position: sticky;
    top: 0;
    height: 100vh;

    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      padding: var(--offset-main);
      color: var(--text-color);

      .header {
        .label {
          font-size: 30px;
          font-weight: 500;
          line-height: 120%;
          letter-spacing: normal;
          text-transform: capitalize;
        }

        .number {
          position: absolute;
          top: 3px;
          right: 34px;
          font-size: 300px;
          font-weight: 500;
          line-height: normal;
          letter-spacing: normal;
        }
      }

      .shapes {
        position: absolute;
        left: 50%;
        top: 50%;
        display: flex;
        align-items: center;
        transform: translate(-50%, -50%);
        z-index: var(--z-base);
      }

      .footer {
        display: flex;
        flex-direction: column;
        gap: 30px;
        width: 420px;
        text-transform: capitalize;

        .title {
          font-size: 22px;
          font-weight: 500;
          line-height: 150%;
          letter-spacing: normal;
        }

        .description {
          font-size: 16px;
          font-weight: 500;
          line-height: 150%;
          letter-spacing: normal;
        }
      }
    }

    .line {
      position: absolute;
      left: 50%;
      top: 0;
      width: 1px;
      height: 100%;
      background-color: var(--line-color);
      transform: translateX(-50%);
      z-index: var(--z-line);
    }
  }
}
</style>
