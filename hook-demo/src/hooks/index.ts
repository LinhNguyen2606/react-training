import useSWR, { mutate } from 'swr';
import { API_BASE_URL, TODO_API_ENDPOINT } from '../constants';
import { fetcher } from '../helpers';
import { Todo } from '../interfaces';
import { addTodo, deleteTodo, editTodo } from '../services';

export const useTodos = () => {
  const API_URL = `${API_BASE_URL}/${TODO_API_ENDPOINT}`;
  const { data, error } = useSWR<Todo[]>(API_URL, fetcher);

  const todos = data ?? [];
  const isLoading = !data && !error;
  const isError = error;

  const handleAddTodo = async (newTodo: Todo) => {
    const res = await addTodo(newTodo);
    if (res && res.data) mutate(API_URL);
  };

  const handleDeleteTodo = async (id: string) => {
    const res = await deleteTodo(id);
    if (res && res.data) mutate(API_URL);
  };

  const handleUpdateTodo = async (id: string, title: string) => {
    const res = await editTodo(id, title);
    if (res && res.data) mutate(API_URL);
  };

  return {
    todos,
    isLoading,
    isError,
    handleAddTodo,
    handleDeleteTodo,
    handleUpdateTodo,
  };
};
