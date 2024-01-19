import { useContext, useEffect, useRef } from 'react';
import { addTodo, setTodo } from './actions';
import { ContextStorage } from './store';

const AddTodo = () => {
  const { state, dispatch } = useContext(ContextStorage);
  const { todo, todos } = state;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [todos]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setTodo(e.target.value));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addTodo());
    dispatch(setTodo(''));
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
