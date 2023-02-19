<template>
  <div class="new-task">
    <input v-model="taskName" @keydown.enter="newTask" type="text" placeholder="Nova tarefa...">
    <button @click="newTask">adicionar</button>
  </div>
</template>

<script>
  export default {
    name: 'NewTask',
    
    computed: {
      taskName() {
        return this.$store.state.taskName
      }
    }
  }
</script>

<style>
  @import '@/assets/css/new-task.css';
</style>
