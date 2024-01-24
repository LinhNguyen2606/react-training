import { useEffect, useRef, useState } from 'react';
import { useTodos } from './hooks';

const AddTodo = () => {
  const [todo, setTodo] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { isLoading, handleAddTodo, todos } = useTodos();

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [todos]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTodo(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    handleAddTodo({ id: crypto.randomUUID(), title: todo });
    setTodo('');
  };

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input
          ref={inputRef}
          value={todo}
          onChange={handleOnChange}
          type="text"
          id="item"
        />
      </div>
      <button className="btn">Add</button>
    </form>
  );
};

export default AddTodo;
