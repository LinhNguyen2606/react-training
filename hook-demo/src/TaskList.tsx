import { Todo } from './App';
import Task from './Task';

export type TaskListProps = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  onDelete: (id: string) => void;
  onChangeTodo: (id: string, completed: boolean) => void;
};

const TaskList = ({
  todos,
  setTodos,
  onDelete,
  onChangeTodo,
}: TaskListProps) => {
  return (
    <ul className="list">
      {todos.length === 0 && 'No todo available'}
      {todos.map((todo) => (
        <Task
          {...todo}
          key={todo.id}
          todos={todos}
          setTodos={setTodos}
          onDelete={onDelete}
          onChangeTodo={onChangeTodo}
        />
      ))}
    </ul>
  );
};

export default TaskList;
