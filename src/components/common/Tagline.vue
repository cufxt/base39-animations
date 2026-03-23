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

  @include mobile() {
    flex-direction: column;
    gap: 12px;
    font-size: 14px;
  }

  &.dark {
    color: var(--c-charcoal-brown);
  }

  p {
    @include mobile() {
      &:first-child {
        align-self: flex-start;
      }

      &:last-child {
        align-self: flex-end;
      }
    }
  }
}
</style>
