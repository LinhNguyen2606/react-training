import AddTodo from './AddTodo';
import TaskList from './TaskList';

const App = () => {
  return (
    <>
      <AddTodo />
      <h1 className="header">Todo List</h1>
      <TaskList />
    </>
  );
};

export default App;
