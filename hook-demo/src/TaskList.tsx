import { Todo } from './interface';
import Task from './Task';

export type TaskListProps = {
  todos: Todo[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
};

const TaskList = ({
  todos,
  onDelete,
  onToggle,
  onUpdate
}: TaskListProps) => {
  return (
    <ul className="list">
      {todos.length === 0 && 'No todo available'}
      {todos.map((todo) => (
        <Task
          {...todo}
          key={todo.id}
          todos={todos}
          onDelete={onDelete}
          onToggle={onToggle}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
};

export default TaskList;
