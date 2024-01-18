import { useEffect, useRef, useState } from 'react';
import { TaskListProps } from './TaskList';

type TaskProps = TaskListProps & {
  id: string;
  title: string;
  completed: boolean;
};

const Task = ({
  id,
  title,
  completed,
  onDelete,
  onToggle,
  onUpdate,
}: TaskProps) => {
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const [editTitle, setEditTitle] = useState('');
  const [error, setError] = useState<boolean | string>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    editId && inputRef.current?.focus();
  }, [editId]);

  const handleDeleteTodo = () => onDelete(id);

  const handleOnChangeTodo = () => onToggle(id);

  const handleEditTodo = () => {
    setEditId(id);
    setEditTitle(title);
    setError('');
  };

  const handleSaveEdit = () => {
    onUpdate(id, editTitle);
    setEditId(undefined);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {editId === id ? (
        <>
          <div style={{ display: 'flex', gap: 4 }}>
            <input
              ref={inputRef}
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <button
              onClick={() => {
                setEditId(undefined);
                setEditTitle('');
                setError('');
              }}
            >
              Cancel
            </button>
            <button onClick={handleSaveEdit}>Save</button>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
      ) : (
        <>
          <li key={id}>
            <label>
              <input
                checked={completed}
                onChange={handleOnChangeTodo}
                type="checkbox"
              />
              {title}
            </label>
            <button className="btn btn-danger" onClick={handleDeleteTodo}>
              Delete
            </button>
            <button className="btn btn-warning" onClick={handleEditTodo}>
              Edit
            </button>
          </li>
        </>
      )}
    </div>
  );
};

export default Task;
