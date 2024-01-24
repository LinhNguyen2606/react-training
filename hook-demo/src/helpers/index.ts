import { Todo } from "../interfaces";

export const saveTodosToLocalStorage = (todos: Todo[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
}

export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('An error occurred while fetching the data.');
  }
  return response.json();
};