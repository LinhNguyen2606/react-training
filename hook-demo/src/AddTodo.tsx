import { useState } from 'react';

type AddTodoProps = {
  onSubmit: (title: string) => void;
};

const AddTodo = ({ onSubmit }: AddTodoProps) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          id="item"
        />
      </div>
      <button className="btn">Add</button>
    </form>
  );
};

export default AddTodo;
