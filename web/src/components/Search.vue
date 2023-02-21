<template>
  <div class="search">
    <input v-model="searchName" type="text" @keydown.enter="search" placeholder="Localizar tarefa">
    <button @click="search" class='bi bi-search'></button>
  </div>
</template>

<script>
  export default {
    name: 'Search',

    data() {
      return {
        searchName: ''
      }
    },

    computed: {
      tasks() {
        return this.$store.state.tasks
      }
    },

    methods: {
      search() {
        this.$store.dispatch('getTasks', { taskName: this.searchName });
        this.searchName = '';
      }
    }
  }
</script>

<style src="@/assets/scss/search.scss" lang="scss" />
