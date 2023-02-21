<template>
  <nav class="menu">
    <!-- <router-link to="/">Minhas Tarefas</router-link> |
    <router-link to="/config">Configurações</router-link> -->
    <ul>
      <li><router-link to="/">Minhas Tarefas</router-link></li>
      <li><router-link to="/config">Configurações</router-link></li>
    </ul>
  </nav>
  <router-view/>
</template>

<!-- <style>
  @import '@/assets/css/global.css';

  nav {
    display: flex;
    gap: 1rem;
    justify-content: center;
    padding: 1rem 0;
  }

/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
</style> -->

<style src="@/assets/scss/global.scss" lang="scss" />
