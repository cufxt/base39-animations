<template>
  <span :class="{ dark }" class="button-inner">
    <span class="text">{{ text }}</span>
  </span>
</template>

<script setup lang="ts">
interface Props {
  text: string
  dark?: boolean
}
defineProps<Props>()
</script>

<style scoped lang="scss">
.button-inner {
  display: flex;
  align-items: flex-end;
  width: var(--btn-default-width, 261px);
  height: 70px;
  padding: 15px;
  background-color: var(--btn-default-bg-color, var(--c-sand-beige));
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;

  .text {
    font-size: 14px;
    line-height: 100%;
    font-weight: 500;
    letter-spacing: normal;
    text-transform: capitalize;
    color: var(--btn-default-text-color, var(--c-charcoal-brown));
  }

  &.dark {
    --btn-default-bg-color: var(--c-charcoal-brown);
    --btn-default-text-color: var(--c-ivory);
  }
}

@media (hover: hover) {
  .button-inner:hover {
    opacity: 0.8;
  }
}
</style>
