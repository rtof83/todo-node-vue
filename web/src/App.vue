<template>
  <nav>
    <router-link to="/">Minhas Tarefas</router-link> |
    <router-link to="/about">Configurações</router-link>
  </nav>
  <router-view/>
</template>

<style>
  @import '@/assets/css/global.css';

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
</style>
