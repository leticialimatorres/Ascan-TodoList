import React from 'react';

class TodoList extends React.Component {
  state = {
    todos: [
      { id: 1, text: 'Arrumar a casa', completed: false },
      { id: 2, text: 'Comprar legumes e verduras', completed: false },
      { id: 3, text: 'Pagar Boletos', completed: false }
    ]
  };

  handleItemClick = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    }));
  };

  handleDeleteClick = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== id)
    }));
  };

  handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      const todoText = event.target.value;
      event.target.value = '';

      const newTodo = {
        id: Date.now(),
        text: todoText,
        completed: false
      };

      this.setState((prevState) => ({
        todos: [...prevState.todos, newTodo]
      }));
    }
  };

  handlePlusClick = () => {
    this.input.classList.toggle('fade-toggle');
  };

  handleCheckboxChange = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    }));
  };

  render() {
    const { todos } = this.state;

    return (
      <div id="container">
        <h1>
          Minhas Tarefas
          <i className="fa fa-plus" onClick={this.handlePlusClick}></i>
        </h1>
        <input
          type="text"
          placeholder="Adicionar tarefa"
          onKeyPress={this.handleInputKeyPress}
          ref={(input) => {
            this.input = input;
          }}
        />

        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={todo.completed ? 'completed' : ''}
              onClick={() => this.handleItemClick(todo.id)}
            >
              <span onClick={() => this.handleDeleteClick(todo.id)}>
                <i className="fa fa-trash"></i>
              </span>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => this.handleCheckboxChange(todo.id)}
                />
                {todo.text}
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoList;
