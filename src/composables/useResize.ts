import { onMounted, onBeforeUnmount } from 'vue'

const callbacks: Array<() => void> = []
let resizeTimeout: ReturnType<typeof setTimeout> | null = null

function onResize() {
  if (resizeTimeout) clearTimeout(resizeTimeout)

  resizeTimeout = setTimeout(() => callbacks.forEach((cb) => cb()), 200)
}

export function useResize(callback: () => void) {
  onMounted(() => {
    if (callbacks.length === 0) {
      window.addEventListener('resize', onResize)
    }

    callbacks.push(callback)
  })

  onBeforeUnmount(() => {
    const index = callbacks.indexOf(callback)

    if (index !== -1) {
      callbacks.splice(index, 1)
    }

    if (callbacks.length === 0) {
      window.removeEventListener('resize', onResize)
    }
  })
}
