<template>
  <nav class="menu">
    <ul>
      <li><router-link to="/">Minhas Tarefas</router-link></li>
      <li><router-link to="/config">Configurações</router-link></li>
    </ul>
  </nav>
  <router-view/>
</template>

<style src="@/assets/scss/global.scss" lang="scss" />
