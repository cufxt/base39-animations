<script setup lang="ts"></script>

<template>
  <svg
    viewBox="0 0 179 179"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    <path
      class="square-empty-path"
      d="M179 179H89.4985C138.919 179 179 138.919 179 89.4985C179 40.078 138.919 0 89.4985 0C40.078 0.000203571 0.000121625 40.078 0 89.4985C0 138.919 40.078 179 89.4985 179H0V0H179V179Z"
    />

    <path
      class="circle-path"
      d="M89.5 0C139.383 0 179 39.617 179 89.5C179 139.383 139.383 179 89.5 179C39.617 179 0 139.383 0 89.5C0 39.617 39.617 0 89.5 0Z"
    />
  </svg>
</template>

<style lang="scss" scoped>
svg {
  width: 179px;
  height: 179px;
  transform-origin: center center;
  background-color: var(--icon-svg-color, transparent);
  z-index: calc(var(--z-line) + 1);

  @include mobile() {
    width: 88px;
    height: 88px;
  }
}

path {
  fill: var(--icon-figure-color, var(--c-sand-beige));
}

.circle-path {
  fill: var(--bg-color, var(--c-charcoal-brown));
  opacity: 0;
  transform-origin: center center;
  transform-box: fill-box;
}
</style>
