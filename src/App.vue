<template>
<div class="container">
  <nav class="nav">
    <router-link to="/">
      <div class="nav__home">
        <img src="./assets/logo.svg" />
      </div>
    </router-link>
  </nav>
  <main class="main">
    <page-header class="main__header"></page-header>
    <router-view/>
  </main>
</div>
</template>

<script>
import PageHeader from './components/PageHeader.vue'

export default {
  components: { PageHeader }
}
</script>

<style lang="scss">
@font-face {
  font-family: "PF DinDisplay Pro Medium";
  src: local("PF DinDisplay Pro Medium"),
    local("PF-DinDisplay-Pro-Medium"),
    url("./assets/fonts/PFDinDisplayPro-Medium.eot") format("opentype"),
    url("./assets/fonts/PFDinDisplayPro-Medium.woff") format("woff"),
    url("./assets/fonts/PFDinDisplayPro-Medium.ttf") format("truetype");
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: "PF DinDisplay Pro Regular";
  src: local("PF DinDisplay Pro Regular"),
    local("PF-DinDisplay-Pro-Regular"),
    url("./assets/fonts/PFDinDisplayPro-Regular.eot") format("opentype"),
    url("./assets/fonts/PFDinDisplayPro-Regular.woff") format("woff"),
    url("./assets/fonts/PFDinDisplayPro-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}

body {
  margin: 0;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 4px;
    height: 100%;
    background-color: #E6E6E6;

    &-thumb {
      width: 4px;
      background-color: #E31243;
      border-radius: 100px;
    }
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-weight: normal;
}

:root {
  --font-medium: 'PF DinDisplay Pro Medium', sans-serif;
  --font-regular: 'PF DinDisplay Pro Regular', sans-serif;
}

#app {
  background-color: #FFFFFF;
}

.container {
  display: flex;
  max-width: 1280px;
  margin: 0 auto;
  min-height: 100vh;
  font-family: var(--font-regular);
}

.nav {
  padding: 40px 20px;

  &__home {
    width: 48px;
    height: 48px;
  }
}

.main {
  width: 100%;
  border-left: 1px solid #DBDADA;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  padding: 40px 48px;

  &__header {
    margin-bottom: 6px;
  }
}
</style>
