<template>
  <ContainerPanel title="Configurações">

    <div v-for="item in tags" :key="item.id">
      <label :for="item.id">{{ `tag ${item.id}` }}</label>
      <input :id="item.id" :value="item.name">
      <input :id="item.id" :value="item.color">
      <input type="color" :id="item.id" :value="item.color" disabled>
    </div>

    <div>
      <label for="pageSize">Paginação</label>
      <input type="number" id="pageSize">
      <label for="dateSize">Dias do Prazo</label>
      <input type="number" id="dateSize">
    </div>

  </ContainerPanel>
</template>

<script>
  import ContainerPanel from '@/components/ContainerPanel.vue';

  export default {
    name: 'ConfigView',

    components: {
      ContainerPanel
    },

    computed: {
      // getTags() {
      //     return this.$store.getters.getTags
      //   },

      // tags() {
      //   return this.$store.state.tags;
      // },

      // getTasks() {
      //   return this.$store.getters.getTasks;
      // },

      tags() {
        return this.$store.state.tags;
      }
    },

    mounted() {
      this.$store.dispatch('getTags');
      // this.$store.dispatch('updateTask', { id: 25, name: 'teste2' });
    }
  }
</script>
