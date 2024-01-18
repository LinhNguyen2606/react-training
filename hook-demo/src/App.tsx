import { useReducer } from 'react';
import { addTodo, deleteTodo, editTodo, setTodo, toggleTodo } from './actions';
import AddTodo from './AddTodo';
import reducer, { initialState } from './reducer';
import TaskList from './TaskList';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { todo, todos } = state;

  const setTodoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTodo(e.target.value));
  };

  const addTodoHandler = () => {
    dispatch(addTodo());
    dispatch(setTodo(''));
  };

  const deleteTodoHandler = (id: string) => dispatch(deleteTodo(id));

  const toggleTodoHandler = (id: string) => dispatch(toggleTodo(id));

  const editTodoHandler = (id: string, title: string) =>
    dispatch(editTodo(id, title));

  return (
    <>
      <AddTodo
        onSubmit={addTodoHandler}
        value={todo}
        onChange={setTodoHandler}
        todos={todos}
      />
      <h1 className="header">Todo List</h1>
      <TaskList
        todos={todos}
        onDelete={deleteTodoHandler}
        onToggle={toggleTodoHandler}
        onUpdate={editTodoHandler}
      />
    </>
  );
};

export default App;
