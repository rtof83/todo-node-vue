<template>

  <div class="container-home">
    <div class="container-home__panel">
      <h1>Minhas Tarefas</h1>

      <!-- div input + botao -->
      <div class="container-home__task">
        <input type="text">
        <button>adicionar</button>
      </div>

      <!-- nav bar -->
      <div class="nav-menu">
        <ul>
          <li>all</li>
          <li>active</li>
          <li>completed</li>
        </ul>
      </div>

      <!-- list em forma de tabela -->
      <div>
        <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Tarefa</th>
      <th scope="col">Status</th>
      <th scope="col">Data Início</th>
      <th scope="col">Data Fim</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Marklak dlaksjdlakjs</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>@mdo</td>
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

  methods: {
    // item(e) {
    //   console.log(e)
    // }
  }
}
</script>

<style>
  @import '@/assets/css/home.css';
</style>
