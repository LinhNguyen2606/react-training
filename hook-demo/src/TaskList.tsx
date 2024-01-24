import { useTodos } from './hooks';
import Task from './Task';

const TaskList = () => {
  const { todos, isError } = useTodos();

  if (isError) return <p>Have an error when loading the todo list.</p>;

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
