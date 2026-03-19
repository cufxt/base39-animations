<script setup lang="ts">
import { onMounted } from 'vue'
import { fillText, showText } from '@/utils/animations'
import { useResize } from '@/composables/useResize.ts'

import Hero from '@/components/pages/home/Hero.vue'
import About from '@/components/pages/home/About.vue'
import Startups from '@/components/pages/home/Startups.vue'
import Figures from '@/components/pages/home/Figures.vue'

let fillTextElements: NodeListOf<HTMLElement>
let showTextElements: NodeListOf<HTMLElement>

function initAnimations() {
  if (fillTextElements?.length) {
    fillTextElements.forEach((element: HTMLElement) => fillText(element))
  }

  if (showTextElements?.length) {
    showTextElements.forEach((element: HTMLElement) => showText(element))
  }
}

onMounted(async () => {
  await document.fonts.ready

  fillTextElements = document.querySelectorAll('.anim-text-fill')
  showTextElements = document.querySelectorAll('.anim-text-show')

  initAnimations()
})

useResize(initAnimations)
</script>

<template>
  <main class="home">
    <Hero />
    <About />
    <Startups />
    <Figures />
    <Hero />
  </main>
</template>

<style scoped></style>
