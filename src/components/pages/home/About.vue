<script setup lang="ts">
import DefaultButton from '@/components/buttons/Default.vue'
</script>

<template>
  <section class="about">
    <div class="header">
      <span class="label">/ About Base39</span>

      <h2 class="title anim-text-fill">
        Base39 is a creative ecosystem built to connect people, ideas, and opportunities. It brings
        together creators, startups, brands, and institutions in a shared environment where
        collaboration is encouraged and ideas can evolve into meaningful initiatives.
      </h2>
    </div>

    <div class="content">
      <div class="image-wrapper">
        <img src="@/assets/images/pages/home/about/about.webp" alt="about" class="inner-img" />
      </div>

      <div class="info">
        <p class="description anim-text-show">
          Through flexible spaces, shared resources, and a community-driven approach, Base39
          supports creative professionals at different stages of their journey.
        </p>

        <RouterLink to="#" class="button">
          <DefaultButton text="Learn More About Base39" :dark="true" />
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.about {
  display: flex;
  flex-direction: column;
  padding: 86px var(--offset-main) 64px;
  background-color: var(--c-sand-beige);
  overflow-x: clip;

  .header {
    position: relative;
    margin-bottom: 102px;

    .title {
      font-size: 35px;
      line-height: 150%;
      font-weight: 500;
      letter-spacing: normal;
      text-transform: capitalize;

      :deep(span) {
        display: inline-block;

        &:first-child {
          text-indent: 410px;
        }
      }
    }

    .label {
      position: absolute;
      left: -2px;
      top: 13px;
      font-size: 18px;
      line-height: 120%;
      font-weight: 500;
      letter-spacing: normal;
      text-transform: capitalize;
    }
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: end;

    .image-wrapper {
      position: relative;
      width: 265px;
      height: 263px;
      margin-bottom: 1px;
    }

    .info {
      --btn-default-width: 276px;

      display: flex;
      flex-direction: column;
      width: 522px;

      .description {
        margin-bottom: 24px;
        font-size: 14px;
        font-weight: 400;
        line-height: 170%;
        letter-spacing: normal;
        text-transform: capitalize;
      }

      .button {
        width: fit-content;
      }
    }
  }
}
</style>
