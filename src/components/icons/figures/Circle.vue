<script setup lang="ts"></script>

<template>
  <svg viewBox="0 0 179 179" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M89.5 0C139.383 0 179 39.617 179 89.5C179 139.383 139.383 179 89.5 179C39.617 179 0 139.383 0 89.5C0 39.617 39.617 0 89.5 0Z"
    />
  </svg>
</template>

<style lang="scss" scoped>
svg {
  width: 179px;
  height: 179px;

  @include mobile() {
    width: 88px;
    height: 88px;
  }
}

path {
  fill: var(--icon-figure-color, var(--c-sand-beige));
}
</style>
