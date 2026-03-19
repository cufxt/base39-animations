<script setup lang="ts">
interface Props {
  dark?: boolean
}
defineProps<Props>()
</script>

<template>
  <div :class="{ dark }" class="tagline">
    <p>More than a workspace —</p>
    <p>a place where ideas slow down, connect</p>
  </div>
</template>

<style scoped lang="scss">
.tagline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  line-height: 120%;
  font-weight: 500;
  letter-spacing: normal;
  text-transform: capitalize;
  color: var(--c-ivory);

  &.dark {
    color: var(--c-charcoal-brown);
  }
}
</style>
