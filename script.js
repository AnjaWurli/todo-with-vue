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
    addTodo() {
      this.error = "";

      this.todos.forEach((todo) => {
        if (this.newTodo === todo.description) {
          this.error = "double";
        }
      });
      if (this.newTodo.length >= 5 && this.error !== "double") {
        this.todos.push({
          id: +new Date(),
          description: this.newTodo,
          done: false,
        });
        this.newTodo = "";
      } else if (this.newTodo.length < 5) {
        this.error = "tooShort";
      }
    },
    remove() {
      this.todos = this.todos.filter((todo) => {
        return todo.done === false;
      });
    },
  },
}).mount("#app");
