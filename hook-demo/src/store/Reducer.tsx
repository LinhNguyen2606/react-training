import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  SET_TODO,
  TOGGLE_TODO,
} from '../constants';
import { saveTodosToLocalStorage } from '../helpers';
import {
  AddTodoAction,
  DeleteTodoAction,
  EditTodoAction,
  SetTodoAction,
  State,
  Todo,
  ToggleTodoAction,
} from '../interfaces';

type Action =
  | SetTodoAction
  | AddTodoAction
  | DeleteTodoAction
  | ToggleTodoAction
  | EditTodoAction;

const initialTodos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');

export const initialState: State = {
  todo: '',
  todos: initialTodos,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_TODO:
      return {
        ...state,
        todo: action.payload,
      };

    case ADD_TODO:
      if (state.todo === '') {
        alert('Please, fill in the input if you wanna add');
        return state;
      }

      const newTodo: Todo = {
        id: crypto.randomUUID(),
        title: state.todo,
        completed: false,
      };

      const todo = [...state.todos, newTodo];
      saveTodosToLocalStorage(todo);

      return {
        ...state,
        todos: [...state.todos, newTodo],
      };

    case DELETE_TODO:
      const deletedTodo = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      saveTodosToLocalStorage(deletedTodo);
      return {
        ...state,
        todos: deletedTodo,
      };

    case TOGGLE_TODO:
      const toggleTodo = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      return {
        ...state,
        todos: toggleTodo,
      };

    case EDIT_TODO:
      const updatedTodo = state.todos.map((todo) => {
        if (action.payload.title === '') {
          alert('Title cannot be empty');
          return todo;
        }
        if (todo.id === action.payload.id) {
          return { ...todo, title: action.payload.title };
        }
        return todo;
      });
      return {
        ...state,
        todos: updatedTodo,
      };
    default:
      throw new Error('Invalid action');
  }
};

export default reducer;
