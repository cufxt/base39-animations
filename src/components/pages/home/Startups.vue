<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { gsap } from '@/plugins/gsap'
import { showText, hideText } from '@/utils/animations'

import Tagline from '@/components/common/Tagline.vue'
import DefaultButton from '@/components/buttons/Default.vue'

let startupsElement: HTMLElement | null
let contentElement: HTMLElement | null
let buttonElement: HTMLElement | null
let textElements: NodeListOf<HTMLElement> | undefined
let sliderElements: NodeListOf<HTMLElement> | undefined

let sliderInterval: ReturnType<typeof setInterval> | null = null
let currentSlideI = 0
const SLIDER_TIME = 3_000

function initMaskAnimation() {
  initElements()

  const innerElement = startupsElement?.querySelector('.inner')

  if (!innerElement) return

  const maskSize = `${window.innerWidth * 1.1}px auto`

  gsap.to(innerElement, {
    maskSize,
    ease: 'none',
    scrollTrigger: {
      trigger: startupsElement,
      start: 'top top',
      end: 'bottom-=600px bottom',
      scrub: true,
      onLeave: () => {
        setContentVisibility(true)
        toggleSliderInterval(true)
      },
      onEnterBack: () => {
        setContentVisibility(false)
        toggleSliderInterval(false)
      },
    },
  })
}

function initElements() {
  startupsElement = document.querySelector('section.startups')

  if (!startupsElement) return

  contentElement = startupsElement.querySelector('.content')
  buttonElement = startupsElement.querySelector('.button')
  textElements = startupsElement.querySelectorAll('.anim-toggle-text')
}

function setContentVisibility(visibility: boolean) {
  if (!contentElement) return

  gsap.set(contentElement, {
    pointerEvents: visibility ? 'all' : 'none',
  })

  toggleButtonVisibility(visibility)
  toggleTextVisibility(visibility)
}

function toggleButtonVisibility(visibility: boolean) {
  if (!buttonElement) return

  gsap.to(buttonElement, {
    opacity: visibility ? 1 : 0,
    ease: 'power2.inOut',
    duration: 0.5,
  })
}

function toggleTextVisibility(visibility: boolean) {
  if (!textElements?.length) return

  textElements.forEach((textElement: HTMLElement) => {
    visibility ? showText(textElement) : hideText(textElement)
  })
}

function initSlider() {
  sliderElements = startupsElement?.querySelectorAll('.image')

  if (!sliderElements?.length) return

  sliderElements.forEach((slide, i) => {
    if (i !== 0) gsap.set(slide, { x: '100%' })
  })
}

function changeSlide() {
  if (!sliderElements?.length) return

  const next = (currentSlideI + 1) % sliderElements.length

  gsap.to(sliderElements[currentSlideI]!, {
    x: '-100%',
    duration: 0.8,
    ease: 'power2.inOut',
  })

  gsap.fromTo(
    sliderElements[next]!,
    {
      x: '100%',
    },
    {
      x: '0%',
      duration: 0.8,
      ease: 'power2.inOut',
    },
  )

  currentSlideI = next
}

function toggleSliderInterval(value: boolean) {
  if (sliderInterval) {
    clearInterval(sliderInterval)
    sliderInterval = null
  }

  if (value) {
    sliderInterval = setInterval(changeSlide, SLIDER_TIME)
  }
}

onMounted(() => {
  initMaskAnimation()
  initSlider()
})

onUnmounted(() => {
  toggleSliderInterval(false)
})
</script>

<template>
  <section class="startups">
    <div class="inner">
      <div class="image-wrapper">
        <img src="@/assets/images/pages/home/startups/1.webp" alt="" class="image inner-img" />
        <img src="@/assets/images/pages/home/startups/2.webp" alt="" class="image inner-img" />
      </div>

      <div class="content">
        <Tagline class="anim-toggle-text" />

        <div class="content-footer">
          <div class="info">
            <h2 class="title anim-toggle-text">Startups & Entrepreneurs</h2>

            <p class="description anim-toggle-text">
              Early-stage teams and founders building creative-driven products, services, and
              platforms.
            </p>
          </div>

          <RouterLink to="#" class="button">
            <DefaultButton text="Learn more" />
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.startups {
  position: relative;
  height: calc(200vh + 600px);
  background-color: var(--c-terracotta-rust);

  .inner {
    position: sticky;
    top: 0;
    height: 100vh;
    mask-image: url('@/assets/icons/arch-mask.svg');
    mask-position: center;
    mask-repeat: no-repeat;
    mask-size: 245px 315px;

    .image-wrapper {
      width: 100%;
      height: 100%;

      .image {
        &:first-child {
          transform: translateX(0);
        }
      }
    }
  }

  .content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 35px var(--offset-main);
    pointer-events: none;

    .content-footer {
      --btn-default-width: 300px;
      --btn-default-bg-color: var(--c-ivory);

      display: flex;
      align-items: end;
      justify-content: space-between;

      .info {
        display: flex;
        flex-direction: column;
        max-width: 383px;
        color: var(--c-ivory);

        .title {
          margin-bottom: 22px;
          font-size: 35px;
          font-weight: 500;
          line-height: 130%;
          letter-spacing: normal;
        }

        .description {
          font-size: 14px;
          font-weight: 400;
          line-height: 150%;
          letter-spacing: normal;
        }
      }

      .button {
        opacity: 0;
      }
    }
  }

  .anim-toggle-text {
    opacity: 0;
  }
}
</style>
