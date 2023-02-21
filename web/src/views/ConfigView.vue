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


      
      <div>
        <!-- <button variant="success" @click="makeToast('success')" class="mb-2 b button">Success</button> -->
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
        return this.$store.state.tags;
      },
      
      configs() {
        return this.$store.state.configs;
      }
    },

    methods: {
      // makeToast(variant = null) {
      //   this.$bvToast.toast('Toast body content', {
      //     title: `Variant ${variant || 'default'}`,
      //     variant: variant,
      //     solid: true
      //   })
      // }

      reset() {
        if (confirm('As configurações serão reinicializadas. Deseja Continuar?')) {
          this.$store.dispatch('resetConfigs');
          router.push('/');
        }
      },

      save() {
        this.tags.map(item => {
          this.$store.dispatch('updateTag', item);
        })

        this.configs.map(item => {
          this.$store.dispatch('updateConfig', item);
        })
      }
    },

    mounted() {
      this.$store.dispatch('getTags');
      this.$store.dispatch('getConfigs');
    }
  }
</script>

<style src="@/assets/scss/config.scss" lang="scss" scoped />
