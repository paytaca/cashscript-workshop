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

<script>
export default {
  name: "TodoApp",

  // Reactive State
  data() {
    return {
      title: "Todo App",
      newTodo: "",
      todos: [
        { text: "Learn Vue basics", done: false },
        { text: "Build a Todo app", done: true },
      ],
      lastAction: "None yet",
    };
  },

  // Derived State
  computed: {
    completedCount() {
      return this.todos.filter((t) => t.done).length;
    },
  },

  // Methods (actions)
  methods: {
    addTodo() {
      if (this.newTodo.trim() !== "") {
        this.todos.push({ text: this.newTodo.trim(), done: false });
        this.newTodo = "";
        this.lastAction = "Added a todo";
      }
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
      this.lastAction = "Deleted a todo";
    },
    toggleDone(index) {
      this.todos[index].done = !this.todos[index].done;
      this.lastAction = this.todos[index].done
        ? "Marked as done"
        : "Marked as not done";
    },
  },

  // Watchers
  watch: {
    todos: {
      handler(newVal) {
        console.log("Todos changed:", newVal);
      },
      deep: true, // so it reacts to changes inside the array
    },
  },
};
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
