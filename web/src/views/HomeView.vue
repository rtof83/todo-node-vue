<template>

  <div class="container-home">
    <div class="container-home__panel">
      <h1>Minhas Tarefas</h1>

      <!-- div home task -->
      <div class="container-home__task">
        <input v-model="taskName" @keydown.enter="newTask" type="text" placeholder="Nova tarefa...">
        <button @click="newTask">adicionar</button>
      </div>

      <!-- nav bar -->
      <div class="nav-menu">
        <ul ref="menu">
          <li v-for="menu in listMenu" :key="menu.id" @click="(e) => clickMenu(e, menu.id)">
            {{ menu.name }}
          </li>
        </ul>
      </div>

      <!-- list em forma de tabela -->
      <div v-if="tasks.length">
        <table class="table table-hover align-middle">
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

          <tr v-for="item in tasks" :key="item.id">
            <th scope="row">{{ item.id }}</th>
            <td>{{ item.name }}</td>
            <td><div class="status" :class="`status${item.tagId}`">{{ item.tagName }}</div></td>

            <td>
              <!-- <input @change="(e) => updateTask(item.id, { startDate: e.target.value })" -->
              <input @change="(e) => checkDate(item.id, e.target.value, item.endDate)"
                     class="date-row"
                     type="date"
                     :value="item.startDate">
            </td>

            <td>
              <input @change="(e) => checkDate(item.id, item.startDate, e.target.value)"
                      class="date-row"
                      type="date"
                      :value="item.endDate">
            </td>
            
            <td>
              <div class="actions">
                <div class="actions__item bi"
                    :class="item.tagId === 1 ? 'bi-check-circle' : 'bi-check-circle-fill'"
                     @click="finishTask(item.id, item.tagId)">
                </div>

                <div class="actions__item bi bi-pencil-fill"
                     @mouseover="(e) => hovering(e, 'bi-pencil')"
                     @mouseout="(e) => hovering(e, 'bi-pencil-fill')"
                     @click="">
                </div>

                <div class="actions__item bi bi-trash3-fill"
                     @mouseover="(e) => hovering(e, 'bi-trash3')"
                     @mouseout="(e) => hovering(e, 'bi-trash3-fill')"
                     @click="deleteTask(item.id)">
                </div>
              </div>
            </td>
          </tr>

        </tbody>
      </table>
      </div>

      <div v-else class="loading">carregando...</div>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios';

export default {
  name: 'HomeView',

  components: {
    // HelloWorld
  },

  data() {
    return {
      hoveringPencil: false,
      hoveringTrash: false,
      taskName: '',
      query: '',
      tasks: [],
      listMenu: [
        { id: 0, name: 'TODOS' },
        { id: 1, name: 'EM PROGRESSO' },
        { id: 2, name: 'PENDENTES'},
        { id: 3, name: 'FINALIZADOS'}
      ],
      status: [
        {
          id: 1, color: '#EDE04D', //amarelo
          id: 2, color: '#ED4F32', //vermelho
          id: 3, color: '#15CD72' //verde
        }
      ]
    }
  },

  methods: {
    clickMenu(e, tag) {
      const menu = this.$refs.menu.children;
      for (let i = 0; i < menu.length; i++) {
        menu[i].classList.remove('activeItem');
      };

      e.target.classList.add('activeItem');

      this.getTasks(tag);
    },

    hovering(e, action) {
      e.target.classList.remove(e.target.classList[2]);
      e.target.classList.add(action);
    },

    async getTasks(tag) {
      if (tag && tag !== 0)
        this.query = `?tag=${tag}`;
      else if (tag === 0)
        this.query = '';

      await axios.get(`http://localhost:3001/tasks${this.query}`)
        .then(({ data }) => {
          this.tasks = data;
        })
        .catch(error => console.log(error.message))
    },

    async newTask() {
      if (!this.taskName)
        return alert('Insira uma tarefa');

      await axios.post('http://localhost:3001/tasks', { name: this.taskName })
        .then(() => {
          this.getTasks();
          this.taskName = '';
        })
        .catch(error => console.log(error));
    },

    async deleteTask(id) {
      await axios.delete(`http://localhost:3001/tasks/${id}`)
        .then(() => this.getTasks())
        .catch(error => console.log(error));
    },

    async updateTask(id, data) {
      await axios.put(`http://localhost:3001/tasks/${id}`, data)
        .then(() => this.getTasks())
        .catch(error => console.log(error));
    },

    finishTask(id, tagId) {
      let tag;
      if (tagId !== 3)
        tag = 3;
      else if (tagId === 3)
        tag = 1;

      this.updateTask(id, { tagId: tag })
    },

    checkDate(id, start, end) {
      const data = {};

      data.startDate = start;
      data.endDate = end;

      if (new Date(end) - new Date() < 0)
        data.tagId = 2

      this.updateTask(id, data);
    }
  },

  mounted() {
    this.$refs.menu.children[0].click();
    this.getTasks();
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

  input {
    background: transparent;
  }

  .loading {
    font-size: 1.5rem;
    padding: 1rem 0;
  }

  .status {
    padding: .5rem;
    font-weight: 600;
    border-radius: .3rem;
  }

  .status1 {
    background-color: #EDE04D;
  }

  .status2 {
    background-color: #ED4F32;
  }

  .status3 {
    background-color: #15CD72;
  }
</style>
