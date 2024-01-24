import { useEffect, useRef, useState } from 'react';
import { useTodos } from './hooks';
import { Todo } from './interfaces';

type TaskProps = {
  todo: Todo;
};

const Task = ({ todo }: TaskProps) => {
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const [editTitle, setEditTitle] = useState('');
  const [error, setError] = useState<boolean | string>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const { id, title } = todo;
  const { handleDeleteTodo, handleUpdateTodo } = useTodos();

  useEffect(() => {
    editId && inputRef.current?.focus();
  }, [editId]);

  const handleDelete = () => handleDeleteTodo(id);


  const handleEditTodo = () => {
    setEditId(id);
    setEditTitle(title);
    setError('');
  };

  const handleSaveEdit = () => {
    handleUpdateTodo(id, editTitle);
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
              {title}
            </label>
            <button className="btn btn-danger" onClick={handleDelete}>
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
