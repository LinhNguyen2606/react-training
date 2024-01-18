import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  SET_TODO,
  TOGGLE_TODO,
} from './constant';
import {
  AddTodoAction,
  DeleteTodoAction,
  EditTodoAction,
  SetTodoAction,
  ToggleTodoAction,
} from './interface';

export const setTodo = (title: string): SetTodoAction => {
  return {
    type: SET_TODO,
    payload: title,
  };
};

export const addTodo = (): AddTodoAction => {
  return {
    type: ADD_TODO,
  };
};

export const deleteTodo = (id: string): DeleteTodoAction => {
  return {
    type: DELETE_TODO,
    payload: id,
  };
};

export const toggleTodo = (id: string): ToggleTodoAction => {
  return {
    type: TOGGLE_TODO,
    payload: id,
  };
};

export const editTodo = (id: string, title: string): EditTodoAction => {
  return {
    type: EDIT_TODO,
    payload: { id, title },
  };
};
