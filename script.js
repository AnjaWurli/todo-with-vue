Vue.createApp({
  data() {
    return {
      todos: [
        { id: 1, description: "Learn Vue", done: false },
        { id: 2, description: "Dont get confused", done: true },
      ],
      newTodo: "",
      currentFilter: "",
      error: "",
    };
  },
  computed: {
    filterElements() {
      return this.todos.filter((todo) => {
        if (this.currentFilter === "done") {
          return todo.done === true;
        } else if (this.currentFilter === "open") {
          return todo.done === false;
        } else {
          return true;
        }
      });
    },
  },
  methods: {
    async addTodo() {
      this.error = "";

      this.todos.forEach((todo) => {
        if (this.newTodo === todo.description) {
          this.error = "double";
        }
      });
      if (this.newTodo.length >= 5 && this.error !== "double") {
        const newEntry = {
          description: this.newTodo,
          done: false,
        };

        const response = await fetch("http://localhost:4730/todos", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newEntry),
        });
        const data = await response.json();
        this.todos.push(data);

        this.newTodo = "";
      } else if (this.newTodo.length < 5) {
        this.error = "tooShort";
      }
    },
    async remove() {
      for (let i = this.todos.length - 1; i >= 0; i--) {
        if (this.todos[i].done === true) {
          await fetch(`http://localhost:4730/todos/${this.todos[i].id}`, {
            method: "DELETE",
          });
          this.todos.splice(i, 1);
        }
      }
    },
  },
  async created() {
    const response = await fetch("http://localhost:4730/todos");
    const data = await response.json();
    this.todos = data;
  },
}).mount("#app");
