<template>
  <div class="my-container">
    <h1>{{ title }}</h1>

    <!-- Two-way binding (v-model) -->
    <input
      v-model="newTodo"
      placeholder="Enter a todo"
      @keyup.enter="addTodo"
    />

    <!-- Event Handling -->
    <button @click="addTodo">Add</button>

    <!-- Conditional Rendering -->
    <p v-if="todos.length === 0">No todos yet. Add one above 👆</p>
    <p v-else-if="completedCount == todos.length">
      You have completed your todo list! 🎉
    </p>

    <!-- List Rendering -->
    <ol>
      <li v-for="(todo, index) in todos" :key="index" class="list-item">
        <input :checked="todo.done" type="checkbox" @input="() => toggleDone(index)"/>
        <span :class="todo.done ? 'done' : ''">{{ todo.text }}</span>
        <button @click="deleteTodo(index)" class="delete-todo">❌</button>
      </li>
    </ol>

    <!-- Computed Property -->
    <p class="mt-4">
      Completed: {{ completedCount }} / {{ todos.length }}
    </p>

    <!-- Watcher effect -->
    <p>Last action: {{ lastAction }}</p>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const title = ref('TodoApp')

const todos = ref([
  { text: "Learn Vue basics", done: false },
  { text: "Build a Todo app", done: true },
])
const completedCount = computed(() => todos.value.filter(t => t.done).length)
const newTodo = ref('')
function addTodo() {
  if (newTodo.value.trim() !== '') {
    todos.value.push({ text: newTodo.value.trim(), done: false });
    newTodo.value = '';
    lastAction.value = "Added a todo";
  }
}

function deleteTodo(index) {
  todos.value.splice(index, 1);
  lastAction.value = "Deleted a todo";
}

function toggleDone(index) {
  todos.value[index].done = !todos.value[index].done;
  lastAction.value = todos.value[index].done ? "Marked as done" : "Marked as not done"
}

watch(todos, (newVal) => {
  console.log("Todos changed:", newVal);
}, { deep: true })

const lastAction = ref('')
</script>
<style scoped>
h1 {
  font-size: 1.5rem;
  line-height: 1.5em;
}
input {
  border: 1px solid #ddd;
  padding: 0.5rem;
}
button {
  padding: 0.3rem 0.7rem;
  margin-left: 0.5rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background: #339972;
}

.done {
  text-decoration: line-through;
  color: gray;
}

button.delete-todo {
  background: none;
}

.my-container {
  max-width: min(300px, 75vw);
  margin-left: auto;
  margin-right: auto;
}

.todo-list-card {
  padding: 0.5rem;
  border: 1px solid grey;
  border-radius: 4px;
}

li.list-item > *:not(:first-child) {
  margin-left: 8px;
}
</style>
