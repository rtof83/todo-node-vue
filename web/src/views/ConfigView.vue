<template>
  <ContainerPanel title="Configurações">

    <div class="config">
      <div class="config__tags" v-for="item in tags" :key="item.id">
        <label :for="item.id">{{ `Etiqueta ${item.id}` }}</label>
        <input :id="item.id" v-model="item.name">
        <input :id="item.id" v-model="item.color">
        <input type="color" :id="item.id" v-model="item.color">
      </div>

      <hr>

      <div v-for="item in configs" :key="item.id">
        <div class="config__general">
          <div class="config__general__page">
            <label for="pageSize">Paginação</label>
            <input type="number" id="pageSize" v-model="item.pageSize" min="1">
          </div>
          
          <div class="config__general__date">
            <label for="dateSize">Dias do Prazo</label>
            <input type="number" id="dateSize" v-model="item.dateSize" min="1">
          </div>
        </div>
      </div>

      <hr>

      <div class="config__buttons">
        <button @click="save">Salvar</button>
        <button @click="reset">Configuração Padrão</button>
      </div>
    </div>

  </ContainerPanel>
</template>

<script>
  import ContainerPanel from '@/components/ContainerPanel.vue';
  import router from '@/router';

  export default {
    name: 'ConfigView',

    components: {
      ContainerPanel
    },

    computed: {
      tags() {
        return this.$store.state.tagsModule.tags;
      },
      
      configs() {
        return this.$store.state.configsModule.configs;
      }
    },

    methods: {
      reset() {
        if (confirm('As configurações serão reinicializadas. Deseja Continuar?')) {
          this.$store.dispatch('configsModule/resetConfigs');
          router.push('/');
        }
      },

      save() {
        this.tags.map(item => {
          this.$store.dispatch('tagsModule/updateTag', item);
          router.push('/');
        })

        this.configs.map(item => {
          this.$store.dispatch('configsModule/updateConfig', item);
        })
      }
    },

    mounted() {
      this.$store.dispatch('tagsModule/getTags');
      this.$store.dispatch('configsModule/getConfigs');
    }
  }
</script>

<style src="@/assets/scss/config.scss" lang="scss" scoped />
