// Components
import { Drawer, SearchBar } from '@components';


const App = () => {
  return (
    <>
      <header className="header">
        <h1 className="header__heading primary__text">User Manager</h1>
      </header>
      <main className="main__container">
        <Drawer />

        <div className="content__wrapper">
          <SearchBar label='Users' placeholder='Search'/>
        </div>
      </main>
    </>
  );
};

export default App;
