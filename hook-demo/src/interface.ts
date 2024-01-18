import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  SET_TODO,
  TOGGLE_TODO,
} from './constant';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export interface State {
  todo: string;
  todos: Todo[];
}

export interface SetTodoAction {
  type: typeof SET_TODO;
  payload: string;
}

export interface AddTodoAction {
  type: typeof ADD_TODO;
}

export interface DeleteTodoAction {
  type: typeof DELETE_TODO;
  payload: string;
}

export interface ToggleTodoAction {
  type: typeof TOGGLE_TODO;
  payload: string;
}

export interface EditTodoAction {
  type: typeof EDIT_TODO;
  payload: { id: string; title: string };
}
