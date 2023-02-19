<template>
  <div class="menu-home">{{ tasks }}{{ loading }}

    <ul ref="menu">
      <li v-for="menu in listMenu" :key="menu.id" @click="(e) => clickMenu(e, menu.id)">
        {{ menu.name }}
      </li>
    </ul>

  </div>
</template>

<script>
  export default {
    name: 'MenuHome',

    data() {
      return {
        listMenu: [],
        query: ''
      }
    },

    computed: {
      getTags() {
        return this.$store.getters.getTags
      },

      tags() {
        return this.$store.state.tags;
      },

      getTasks() {
        return this.$store.getters.getTasks;
      },

      tasks() {
        return this.$store.state.tasks;
      },

      loading() {
        return this.$store.state.loading;
      }

      // listMenu() {
      //   return this.$store.state.listMenu;
      // }
    },

    methods: {
      clickMenu(e, tag) {
        const menu = this.$refs.menu.children;
        for (let i = 0; i < menu.length; i++) {
          menu[i].classList.remove('activeItem');
        };

        e.target.classList.add('activeItem');

        this.listTasks(tag);
      },

      listTasks(tag) {
        if (tag && tag !== 0)
          this.query = `?tag=${tag}`;
        else if (tag === 0)
          this.query = '';
        
        this.loading = 'carregando...';

        this.$store.dispatch('getTasks', this.query);

        // axios.get(`http://localhost:3001/tasks${this.query}`)
        //   .then(({ data }) => {
        //     this.tasks = data;

        //     if (!data.length)
        //       this.loading = 'Nenhum registro encontrado'
        //   })
        //   .catch(error => this.loading = error.message)
      },
    },

    mounted() {
      this.$store.dispatch('getTags');

      // mount menu
      this.listMenu.push({ id: 0, name: 'todos' });
      this.tags.map(item => this.listMenu.push({ id: item.id, name: item.name }));
    }
  }

</script>

<style>
  @import '@/assets/css/menu-home.css';
</style>
