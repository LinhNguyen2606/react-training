import { useEffect, useRef } from 'react';
import { Todo } from './interface';

type AddTodoProps = {
  onSubmit: (title: string) => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  todos: Todo[];
};

const AddTodo = ({
  onSubmit,
  value,
  onChange,
  todos
}: AddTodoProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [todos]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input
          ref={inputRef}
          value={value}
          onChange={onChange}
          type="text"
          id="item"
        />
      </div>
      <button className="btn">Add</button>
    </form>
  );
};

export default AddTodo;
