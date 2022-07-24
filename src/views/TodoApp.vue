<script setup>
import { filter } from 'lodash';
import { ref, computed } from 'vue';

const todos = ref([
  { id: 1, title: 'Vue', completed: false },
  { id: 2, title: 'React', completed: false },
  { id: 3, title: 'Angular', completed: false },
]);

const filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter(todo => !todo.completed),
  completed: (todos) => todos.filter(todo => todo.completed),
};

const visibility = ref('all');
const filterTodos = computed(() => filters[visibility.value](todos.value));

function capitalize(letters) {
  return letters.charAt(0).toUpperCase() + letters.slice(1);
}

function addTodo(event) {
  const value = event.target.value.trim();
  if (value) {
    todos.value.push({
      id: Date.now(),
      title: value, 
      completed: false,
    });
    event.target.value = '';
  }
}

function removeTodo(todo) {
  const index = todos.value.indexOf(todo);
  if (index !== -1) {
    todos.value.splice(index, 1);
  }
}
</script>

<template>
  <section class="todo-app">
    <header class="header">
      <h1 class="title">TODO</h1>
      <input class="todo-input" @keyup.enter="addTodo" placeholder="todo..." autofocus />
    </header>
    <section class="main">
      <ul class="todo-list" v-if="filterTodos.length">
        <li class="todo-item" v-for="todo of filterTodos" :key="todo.id">
          <input type="checkbox" :checked="todo.completed" v-model="todo.completed" />
          <span class="content">{{ todo.title }}</span>
          <span class="remove-todo" @click="removeTodo(todo)">x</span>
        </li>
      </ul>
      <div class="no-data" v-else>No Data</div>
    </section>
    <footer class="footer">
      <span class="todo-count">{{ todos.length }} items left</span>
      <ul class="filters">
        <li 
          v-for="item of ['all', 'active', 'completed']"
          :class="{ active: visibility === item }"
          :key="item"
          @click="visibility = item"
        >
          {{ capitalize(item) }}
        </li>
      </ul>
    </footer>
  </section>
</template>

<style lang="scss" scoped>
.todo-app {
  width: 600px;
  font-family: 'Monaco', Courier, monospace;
  margin: 40px auto;
}
.header {
  .title {
    text-align: center;
  }
  .todo-input {
    width: 100%;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 15px;
    font-size: 20px;
    box-sizing: border-box;
  }
}
.no-data {
  margin-top: 20px;
  text-align: center;
  color: #666;
}
.todo-list {
  padding-left: 8px;
}
.todo-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  font-size: 20px;
  .content {
    flex: 1;
    margin-left: 7px;
  }
  .remove-todo {
    text-align: right;
    padding-right: 20px;
    cursor: pointer;
  }
}
.footer {
  display: flex;
  align-items: center;
  padding-left: 10px;
  .todo-count {
    color: #999;
  }
  .filters {
    display: flex;
    padding-left: 30px;
    li {
      list-style-type: none;
      cursor: pointer;
      padding: 2px 0;
    }
    li.active {
      border-bottom: 2px solid #409EFF;
    }
    li + li {
      margin-left: 30px;
    }
  }
}
</style>