<script setup lang="ts">
import DefaultButton from '@/components/buttons/Default.vue'
import Tagline from '@/components/common/Tagline.vue'
</script>

<template>
  <section class="hero">
    <div class="content">
      <h1 class="title">
        A Creative Ecosystem for Collaboration <br />
        and Growth
      </h1>

      <p class="description">
        Base39 connects creators, innovators, and businesses in a shared environment designed to
        support ideas, collaboration, and real-world outcomes.
      </p>

      <div class="buttons">
        <RouterLink to="#">
          <DefaultButton text="Explore the Spaces" />
        </RouterLink>

        <RouterLink to="#">
          <DefaultButton text="Get Involved" :dark="true" />
        </RouterLink>
      </div>
    </div>

    <Tagline :dark="true" />
  </section>
</template>

<style scoped lang="scss">
.hero {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 116px var(--offset-main) 25px;
  height: 100vh;
  background: url('@/assets/images/pages/home/hero/bg.webp') no-repeat center;
  background-size: cover;

  .content {
    display: flex;
    flex-direction: column;
    max-width: 1100px;

    .title {
      width: 100%;
      margin-bottom: 19px;
      text-indent: 167px;
      font-size: 70px;
      font-weight: 500;
      line-height: 130%;
      letter-spacing: normal;
    }

    .description {
      width: 440px;
      margin-bottom: 26px;
      font-size: 14px;
      font-weight: 400;
      line-height: 150%;
      text-transform: capitalize;
    }

    .buttons {
      display: flex;
      gap: 14px;
    }
  }
}
</style>
