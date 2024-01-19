import { useContext } from 'react';
import { ContextStorage } from './store';
import Task from './Task';

const TaskList = () => {
  const { state } = useContext(ContextStorage);
  const { todos } = state;

  return (
    <ul className="list">
      {todos.length === 0 && 'No todo available'}
      {todos.map((todo) => (
        <Task key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TaskList;
