import Drawer from './components/DataDisplay/Drawer';

const App = () => {
  return (
    <>
      <header className="header">
        <h1 className="header__heading primary__text">User Manager</h1>
      </header>
      <div className="content__wrapper">
        <Drawer />
      </div>
    </>
  );
};

export default App;
