<template>
  <ContainerPanel title="Minhas Tarefas">

      <!-- div home task -->
      <div class="new-task">
        <input v-model="taskName" @keydown.enter="newTask" type="text" placeholder="Nova tarefa...">
        <button @click="newTask">{{ updateMode ? 'atualizar' : 'adicionar' }}</button>
        <button v-if="updateMode" @click="cancelUpdate">cancelar</button>
      </div>

      <!-- nav bar -->
      <div class="menu">
        <ul ref="menu">
          <li @click="(e) => clickMenu(e, 0)">todos</li>
          <li v-for="menu in tags" :key="menu.id" @click="(e) => clickMenu(e, menu.id)">
            {{ menu.name }}
          </li>
          <!-- <li v-for="menu in listMenu" :key="menu.id" @click="(e) => clickMenu(e, menu.id)">
            {{ menu.name }}
          </li> -->
        </ul>
      </div>

      <Search></Search>

      <!-- list em forma de tabela -->
      <div v-if="tasks.length">
        <table class="table table-hover align-middle">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Tarefa</th>
              <th scope="col">Status</th>
              <th scope="col">Prazo</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>

          <tr v-for="item in tasks" :key="item.id">

            <template v-if="!item.page">

            <th scope="row">{{ item.id }}</th>
            <td>{{ item.name }}</td>
            <td><div class="status" :style="{'background-color': item.tagColor}" :class="`status${item.tagId}`">{{ item.tagName }}</div></td>

            <td>
              <input @change="(e) => updateDate(item.id, e.target.value, item.tagId)"
                     class="date-row"
                     type="date"
                     :value="item.deadline">
            </td>
            
            <td>
              <div class="actions">
                <div class="actions__item bi"
                    :class="(item.tagId === 1 || item.tagId === 2) ? 'bi-check-circle' : 'bi-check-circle-fill'"
                     @click="finishTask(item.id, item.tagId, item.deadline)">
                </div>

                <div class="actions__item bi bi-pencil-fill"
                     @mouseover="(e) => hovering(e, 'bi-pencil')"
                     @mouseout="(e) => hovering(e, 'bi-pencil-fill')"
                     @click="updateTaskName(item.id, item.name)">
                </div>

                <div class="actions__item bi bi-trash3-fill"
                     @mouseover="(e) => hovering(e, 'bi-trash3')"
                     @mouseout="(e) => hovering(e, 'bi-trash3-fill')"
                     @click="deleteTask(item.id)">
                </div>
              </div>
            </td>

            </template>

          </tr>

        </tbody>
      </table>
      </div>

      <!-- <div v-else class="loading">carregando...</div> -->
      <div v-else class="loading">{{ loading.message }}</div>

      <Pagination></Pagination>

    </ContainerPanel>
</template>

<script>
import ContainerPanel from '@/components/ContainerPanel.vue';
import Pagination from '@/components/Pagination.vue';
import Search from '@/components/Search.vue';

export default {
  name: 'HomeView',

  components: {
    ContainerPanel,
    Pagination,
    Search
},

  data() {
    return {
      taskName: '',
      query: '',
      updateMode: 0
    }
  },

  computed: {
    tags() {
      return this.$store.state.tags;
    },

    tasks() {
      return this.$store.state.tasks;
    },

    loading() {
      return this.$store.state.loading;
    },

    menu() {
      return this.$store.state.menu;
    }
  },

  methods: {
    clickMenu(e, menuId) {
      const menu = this.$refs.menu.children;
      for (let i = 0; i < menu.length; i++) {
        menu[i].classList.remove('activeItem');
      };

      e.target.classList.add('activeItem');

      this.menu.curr = menuId;
      this.$store.dispatch('getTasks');
    },

    hovering(e, action) {
      e.target.classList.remove(e.target.classList[2]);
      e.target.classList.add(action);
    },

    newTask() {
      if (!this.taskName)
        return alert('Insira uma tarefa');

      const data = { name: this.taskName };
      let method = 'addTask';
      if (this.updateMode) {
        data.id = this.updateMode;
        method = 'updateTask';

        this.updateMode = 0;
      } else {
        this.$refs.menu.children[0].click();
      };

      this.$store.dispatch(method, data);
      this.taskName = '';
    },

    deleteTask(id) {
      this.$store.dispatch('deleteTask', id);
    },

    finishTask(id, tagId, date) {
      let newTag;
      if (tagId !== 3)
        newTag = 3;
      else if (tagId === 3 && this.checkDate(date) === 'pending')
        newTag = 2;
      else if (tagId === 3)
        newTag = 1;

      this.$store.dispatch('updateTask', { id: id, tagId: newTag });
    },

    checkDate(date) {
      const now = new Date();
      const deadline = new Date(date);

      return (deadline - now <= -86400000) ? 'pending' : 'valid';
    },

    updateDate(id, date, tagId) {
      const data = { id: id, deadline: date };
      if (this.checkDate(date) === 'pending')
        data.tagId = 2;
      else if ((this.checkDate(date) === 'valid') && (tagId !== 3))
        data.tagId = 1;

      this.$store.dispatch('updateTask', data);
    },

    updateTaskName(id, name) {
      this.updateMode = id;
      this.taskName = name;
    },

    cancelUpdate() {
      this.updateMode = 0;
      this.taskName = '';
    }
  },

  mounted() {
    this.$store.dispatch('getTags');
    this.$store.dispatch('getTasks');

    this.$refs.menu.children[0].click();
  }
}
</script>

<style src="@/assets/scss/home.scss" lang="scss" scoped />
