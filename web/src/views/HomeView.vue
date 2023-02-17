<template>

  <div class="container-home">
    <div class="container-home__panel">
      <h1>Minhas Tarefas</h1>

      <!-- div input + botao -->
      <div class="container-home__task">
        <input @keydown.enter="enter" type="text">
        <button @click="enter">adicionar</button>
      </div>

      <!-- nav bar -->
      <div class="nav-menu">
        <ul ref="menu">
          <li @click="teste">TODOS</li>
          <li @click="teste">ATIVOS</li>
          <li @click="teste">PENDENTES</li>
          <li @click="teste">FINALIZADOS</li>
        </ul>
      </div>

      <!-- list em forma de tabela -->
      <div>
        <table class="table">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">Tarefa</th>
      <th scope="col">Status</th>
      <th scope="col">Início</th>
      <th scope="col">Fim</th>
      <th scope="col">Ações</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>iniciando projeto para teste técnico</td>
      <td :class="['teste']">em andamento</td>
      <td><input class="date-row" type="date"></td>
      <td><input class="date-row" type="date"></td>
      
      <td>
        <div class="actions">
          <div class="actions__item"
               @mouseover="hoveringPencil = true"
               @mouseout="hoveringPencil = false"
               :class="hoveringPencil ? 'bi bi-pencil' : 'bi bi-pencil-fill'">
          </div>

          <div class="actions__item"
               @mouseover="hoveringTrash = true"
               @mouseout="hoveringTrash = false"
               :class="hoveringTrash ? 'bi bi-trash3' : 'bi bi-trash3-fill'">
          </div>
        </div>
      </td>
    </tr>
  </tbody>
</table>
      </div>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'HomeView',

  components: {
    // HelloWorld
  },

  data() {
    return {
      hoveringPencil: false,
      hoveringTrash: false,
      active: false
    }
  },

  methods: {
    // item(e) {
    //   console.log(e)
    // }

    enter() {
      alert(2)
    },

    teste(e) {
      const menu = this.$refs.menu.children;
      for (let i = 0; i < menu.length; i++) {
        menu[i].classList.remove('activeItem');
      };

      e.target.classList.add('activeItem');
    }
  }
}
</script>

<style>
  @import '@/assets/css/home.css';
  @import "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css";

  .date-row {
    border: none;
  }

  .actions {
    display: flex;
    gap: 1.2rem;
    justify-content: center;
    font-size: 1.2rem;
  }

  .actions__item {
    cursor: pointer;
    transition: .3s;
  }

  .actions__item:active {
    position: relative;
    top: 1px;
  }

  .activeItem {
    background-color: #18215992;
    color: #fff;
    border-radius: .3rem;
  }
</style>
