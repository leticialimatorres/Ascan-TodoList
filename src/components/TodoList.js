import React from 'react';
import './icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux'; // Import connect
import { deleteTodo } from '../redux/todos'; // Verifique o caminho correto para o seu arquivo de ações
import { UseSelector, useDispatch } from 'react-redux/es/hooks/useSelector';
import {addTodo, toggleTodo} from '../redux/todos'
import store from '../redux/store';

class TodoList extends React.Component {
  state = {
    todos: [
      { id: 1, priority:'Alta', text: 'Arrumar a casa', description: 'Limpar e organizar a sala', datetime: '30/07/2023 12:00',  completed: false },
      { id: 2, priority:'Media', text: 'Comprar legumes e verduras', description: 'Ir ao mercado', datetime: '30/07/2023 09:30', completed: false },
      { id: 3, priority:'Baixa', text: 'Pagar Boletos', description: 'Conta de luz e água', datetime: '30/07/2023 15:45', completed: false }
    ],
    completedTodos: [],
    newTodoText: '',
    newTodoDescription: '',
    newTodoDatetime: '',
    newTodoPriority:'',
  };

  handleItemClick = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    }));
  };

  handleDeleteClick = (id) => {
    
    this.props.dispatch(deleteTodo({ id }));
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.addNewTodo();
    }
  };

  handleCheckboxClick = (id) => {
    this.props.dispatch(toggleTodo({ id }));
    this.setState((prevState) => {
      const updatedTodos = prevState.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );

      const completedTask = updatedTodos.find((todo) => todo.id === id);
      if (completedTask && completedTask.completed) {
        const updatedCompletedTodos = [...prevState.completedTodos, completedTask];
        return { todos: updatedTodos, completedTodos: updatedCompletedTodos };
      }

      return { todos: updatedTodos };
      
    });
  };
  

  addNewTodo = () => {
    const { newTodoText, newTodoDescription, newTodoDatetime, newTodoPriority} = this.state;
    if (newTodoText.trim() !== '' && newTodoDescription.trim() !== '' && newTodoDatetime.trim() !== ''
    && newTodoPriority.trim() !== ''
    ) {
      const newTodo = {
        id: Date.now(),
        text: newTodoText,
        description: newTodoDescription,
        datetime: newTodoDatetime,
        priority: newTodoPriority,
        completed: false
      };
     
      this.props.dispatch(addTodo(newTodo));

      this.setState((prevState) => ({
        todos: [...prevState.todos, newTodo],
        newTodoText: '',
        newTodoDescription: '',
        newTodoDatetime: '',
        newTodoPriority: '',
      }));
    }
  };


  render() {
    const { completedTodos, newTodoText, newTodoDescription, newTodoDatetime,newTodoPriority} = this.state;
    const todos = store.getState().todos.todos;

    return (
      <div id="box">
        
        <div id="add-todo-container">
          <h1>
            Nova Tarefa
          </h1>
          
          <input
            type="text"
            placeholder="Tarefa"
            name="newTodoText"
            value={newTodoText}
            onChange={this.handleInputChange}
            onKeyPress={this.handleInputKeyPress}
            ref={(input) => {
              this.input = input;
            }}
          />
          <input
            type="text"
            placeholder="Descrição"
            name="newTodoDescription"
            value={newTodoDescription}
            onChange={this.handleInputChange}
          />

          <div id="Add_data_priority">
          <input
            type="datetime-local"
            name="newTodoDatetime"
            value={newTodoDatetime}
            onChange={this.handleInputChange}
          />
          <select
            name="newTodoPriority"
            value={newTodoPriority}
            onChange={this.handleInputChange}
          >
            <option value="Selecione prioridade">Selecione prioridade</option>
            <option value="Alta">Alta</option>
            <option value="Media">Média</option>
            <option value="Baixa">Baixa</option>
          </select>
          </div>

          <button onClick={this.addNewTodo}>Adicionar Tarefa</button>
        </div>

        <div id="list-container">
        <h2>Minhas Tarefas</h2>
          <ul>
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={todo.completed ? 'completed' : ''}
                onClick={() => this.handleItemClick(todo.id)}
              >
          
        
                <div id="todo-delete-priority"> 
               <label className={`priority-tag ${todo.priority}-priority`}>
                  {todo.priority=="Media"?"Média":todo.priority}
                </label>

                <div id= "delete-check">
                <span onClick={() => this.handleDeleteClick(todo.id)}>
                  <FontAwesomeIcon icon="trash" />
                </span>
                  <input
                  type="checkbox"
                  className="completed-checkbox"
                  checked={todo.completed}
                  onChange={() => this.handleCheckboxClick(todo.id)}
                  />
                  </div>
                </div>
                
                <label>
                  {todo.text}
                </label>
                
                <div id="description-data-hora">
                <label>
                  {todo.description}
                </label>
                <label>
                  {todo.datetime}
                </label>
                </div>
              </li>
            ))}
          </ul>
          <ul>
            {completedTodos.map((todo) => (
              <li key={todo.id} className="completed">
                {/* Render completed todos here */}
                <div id="todo-delete-priority">
                  {/* ... JSX for displaying completed todo ... */}
                </div>
                <label>{todo.text}</label>
                <div id="description-data-hora">
                  {/* ... JSX for displaying description and date/time ... */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  todos: state.todos,
  // completedTodos: state.completedTodos, // You need to define this in your Redux store
});

const mapDispatchToProps = (dispatch) => ({
  addTodo: (newTodo) => dispatch(addTodo(newTodo)),
  toggleTodo: (id) => dispatch(toggleTodo(id)),
});

export default connect()(TodoList); 
