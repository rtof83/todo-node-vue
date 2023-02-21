<template>
  <div class="pagination" v-for="item in tasks" :key="item.id">
    <template v-if="item.page">
      <button @click="countPage('decrease', item.page, item.from)"> &lt </button>
        Página {{ item.page }} de {{ item.from }}
      <button @click="countPage('increase', item.page, item.from)"> > </button>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'Pagination',

    computed: {
      tasks() {
        return this.$store.state.tasks
      }
    },

    methods: {
      countPage(action, page, from) {
        if (action === 'decrease' && page > 1)
          this.$store.dispatch('getTasks', { page: page - 1 });
        else if (action === 'increase' && page < from)
          this.$store.dispatch('getTasks', { page: page + 1 });
      }
    }
  }
</script>

<style src="@/assets/scss/pagination.scss" lang="scss" />
