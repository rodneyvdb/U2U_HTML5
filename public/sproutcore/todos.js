var Todos = SC.Application.create();

// Create the model
Todos.Todo = SC.Object.extend({
  title: null,
  isDone: false
});

// Create the controller
Todos.todosController = SC.ArrayProxy.create({
  // Initialize the array controller with an empty array.
  content: [],
 
  // Creates a new todo with the passed title, then adds it
  // to the array.
  createTodo: function(title) {
    var todo = Todos.Todo.create({ title: title });
    this.pushObject(todo);
  }
});

Todos.CreateTodoView = SC.TextField.extend({
  insertNewline: function() {
    var value = this.get('value');
 
    if (value) {
      Todos.todosController.createTodo(value);
      this.set('value', '');
    }
  }
});

