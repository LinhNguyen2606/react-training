import { useEffect, useState } from 'react';
import AddTodo from './AddTodo';
import TaskList from './TaskList';

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

const App = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const localValue = localStorage.getItem('ITEMS');
    return localValue ? JSON.parse(localValue) : [];
  });

  useEffect(() => {
    localStorage.setItem('ITEMS', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    if (title === '') {
      alert('Please, fill in the input if you wanna add');
    } else {
      setTodos([
        ...todos,
        { id: crypto.randomUUID(), title, completed: false },
      ]);
    }
  };

  const deleteTodo = (id: string) =>
    setTodos(todos.filter((todo) => todo.id !== id));

  const onChangeTodo = (id: string, completed: boolean) =>
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) return { ...todo, completed };
        return todo;
      })
    );

  return (
    <>
      <AddTodo onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <TaskList
        todos={todos}
        setTodos={setTodos}
        onDelete={deleteTodo}
        onChangeTodo={onChangeTodo}
      />
    </>
  );
};

export default App;
