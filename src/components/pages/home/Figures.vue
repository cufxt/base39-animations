<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap, ScrollTrigger } from '@/plugins/gsap.ts'

import SquareEmpty from '@/components/icons/figures/SquareEmpty.vue'
import Circle from '@/components/icons/figures/Circle.vue'
import Square from '@/components/icons/figures/Square.vue'

let tl: gsap.core.Timeline

const SCREENS_COUNT = 3
const currentScreen = ref<number>(1)

const COLORS = {
  terracottaRust: '#A9472C',
  sandBeige: '#E6D2B5',
  lineRed: '#D36242',
  lineGrey: '#5044404D',
}

function initAnimations() {
  const figuresElement = document.querySelector('section.figures')

  if (!figuresElement) return

  const squareEmptyElement = figuresElement.querySelector('.square-empty')
  const circleElement = figuresElement.querySelector('.circle')
  const squareElement = figuresElement.querySelector('.square')
  const circlePath = figuresElement.querySelector('.circle-path')

  if (!squareEmptyElement || !circleElement || !squareElement || !circlePath) return

  tl = gsap.timeline({
    scrollTrigger: {
      trigger: figuresElement,
      start: 'top top',
      end: () => `top+=${window.innerHeight * 2} top`,
      scrub: true,
    },
    duration: 1,
  })

  tl.to(circleElement, { opacity: 0, duration: 0.1 }, 0)
    .to(circlePath, { opacity: 1, duration: 0.001 }, 0.1)
    .to(squareElement, { rotate: -45, translateX: '-100%', duration: 0.5 }, 0)
    .to(squareEmptyElement, { rotate: 45, translateX: '100%', duration: 0.5 }, 0)
    .to(squareElement, { opacity: 0, duration: 0.001 }, 0.5)
    .set(figuresElement, { '--icon-svg-color': COLORS.sandBeige }, 0.5)

    .to(
      figuresElement,
      {
        '--bg-color': COLORS.terracottaRust,
        '--icon-figure-color': COLORS.sandBeige,
        '--line-color': COLORS.lineRed,
        duration: 0.1,
      },
      0.4,
    )

    .to(circlePath, { scale: 0, ease: 'power3.in', duration: 0.3 }, 0.5)
    .to(squareEmptyElement, { scaleX: 0.2, skewY: 55, rotate: 37, duration: 0.3 }, 0.5)
    .to(squareEmptyElement, { scaleY: 1.5, duration: 0.2 }, 0.8)

    .to(
      figuresElement,
      {
        '--bg-color': COLORS.sandBeige,
        '--icon-svg-color': COLORS.terracottaRust,
        '--icon-figure-color': COLORS.terracottaRust,
        '--text-color': COLORS.terracottaRust,
        '--line-color': COLORS.lineGrey,
        duration: 0.1,
      },
      0.9,
    )

  for (let i = 0; i < SCREENS_COUNT; i++) {
    const screen = i + 1

    ScrollTrigger.create({
      trigger: figuresElement,
      start: () => `top+=${window.innerHeight * i} top`,
      end: () => `top+=${window.innerHeight * (i + 1)} top`,
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

      @include mobile() {
        padding: 25px var(--offset-main) 27px;
      }

      .header {
        .label {
          font-size: 30px;
          font-weight: 500;
          line-height: 120%;
          letter-spacing: normal;
          text-transform: capitalize;

          @include mobile() {
            font-size: 22px;
          }
        }

        .number {
          position: absolute;
          top: 3px;
          right: 34px;
          font-size: 300px;
          font-weight: 500;
          line-height: normal;
          letter-spacing: normal;

          @include mobile() {
            top: 10px;
            right: 10px;
            font-size: 130px;
          }
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

        @include mobile() {
          width: 270px;
          gap: 14px;
        }

        .title {
          font-size: 22px;
          font-weight: 500;
          line-height: 150%;
          letter-spacing: normal;

          @include mobile() {
            font-size: 18px;
          }
        }

        .description {
          font-size: 16px;
          font-weight: 500;
          line-height: 150%;
          letter-spacing: normal;

          @include mobile() {
            font-size: 14px;
          }
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
