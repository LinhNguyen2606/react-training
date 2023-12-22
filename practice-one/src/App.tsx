import { Sidebar } from './components/Common';

const App = () => {
  return (
    <>
      <header className="header">
        <h1 className="header__heading primary__text">User Manager</h1>
      </header>
      <div className="content__wrapper">
        <Sidebar />
      </div>
    </>
  );
};

export default App;
