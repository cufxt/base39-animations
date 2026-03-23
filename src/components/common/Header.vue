<script setup lang="ts">
type TNavLink = {
  label: string
  to: string
}

const links: TNavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Bases', to: '/bases' },
  { label: 'Services', to: '/services' },
  { label: 'Blog', to: '/blog' },
]

const extraLink: TNavLink = {
  label: 'Contact',
  to: '/contact',
}
</script>

<template>
  <header class="header">
    <RouterLink to="/">
      <img src="@/assets/icons/logo.svg" alt="logo" class="logo" />
    </RouterLink>

    <nav class="nav">
      <ul class="links">
        <li v-for="link in links" :key="link.label" class="link-wrapper">
          <RouterLink :to="link.to" class="link">{{ link.label }}</RouterLink>
        </li>
      </ul>
    </nav>

    <RouterLink :to="extraLink.to" class="extra-link">
      {{ extraLink.label }}
    </RouterLink>

    <button class="menu-button">Menu</button>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px var(--offset-main);
  border-bottom: 1px solid var(--c-sand);
  box-sizing: border-box;

  @include mobile() {
    padding: 26px var(--offset-main);
  }

  .logo {
    width: 135px;
    height: auto;

    @include mobile() {
      width: 110px;
    }
  }

  .nav {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .links {
      display: flex;
      align-items: center;
      gap: 22px;

      .link-wrapper {
        font-size: 16px;
        line-height: 120%;
        font-weight: 500;
        letter-spacing: normal;
      }
    }

    @include mobile() {
      display: none;
    }
  }

  .link,
  .extra-link {
    transition: color 0.2s ease-in-out;

    &.router-link-active {
      position: relative;
      padding-left: 15px;
      color: var(--c-terracotta-rust);

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        width: 12px;
        height: 20px;
        background: url('@/assets/icons/logo-mini.svg') no-repeat;
        background-size: 100%;
        transform: translateY(-50%);
      }
    }

    @media (hover: hover) {
      &:not(.router-link-active):hover {
        color: var(--c-terracotta-rust);
      }
    }
  }

  .extra-link {
    margin-right: 10px;

    @include mobile() {
      display: none;
    }
  }

  .menu-button {
    display: none;

    @include mobile() {
      display: block;
      font-size: 14px;
      font-weight: 500;
      line-height: 120%;
      letter-spacing: normal;
      color: var(--c-charcoal-brown);
      background-color: transparent;
      border: none;
      outline: none;
      box-shadow: none;
    }
  }
}
</style>
