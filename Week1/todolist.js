class Todo {
    constructor() {
      this.todos = [];
    }
  
    add(todo) {
      this.todos.push(todo);
    }
  
    remove(indexOfTodo) {
      if (indexOfTodo >= 0 && indexOfTodo < this.todos.length) {
        this.todos.splice(indexOfTodo, 1);
      } else {
        console.log("Index out of range");
      }
    }
  
    update(index, updatedTodo) {
      if (index >= 0 && index < this.todos.length) {
        this.todos[index] = updatedTodo;
      } else {
        console.log("Index out of range");
      }
    }
  
    getAll() {
      return this.todos;
    }
  
    get(indexOfTodo) {
      if (indexOfTodo >= 0 && indexOfTodo < this.todos.length) {
        return this.todos[indexOfTodo];
      } else {
        console.log("Index out of range");
        return null;
      }
    }
  
    clear() {
      this.todos = [];
    }
  }
  
  // Testing the Todo class
  
  // Create an instance of Todo
  const myTodoList = new Todo();
  
  // Add todos
  myTodoList.add("Buy groceries");
  myTodoList.add("Walk the dog");
  myTodoList.add("Do laundry");
  
  // Get all todos
  console.log("All todos:", myTodoList.getAll());
  
  // Get a specific todo
  console.log("Todo at index 1:", myTodoList.get(1));
  
  // Update a specific todo
  myTodoList.update(1, "Walk the dog in the park");
  console.log("Updated todo at index 1:", myTodoList.get(1));
  
  // Remove a specific todo
  myTodoList.remove(0);
  console.log("All todos after removal:", myTodoList.getAll());
  
  // Clear all todos
  myTodoList.clear();
  console.log("All todos after clearing:", myTodoList.getAll());
  