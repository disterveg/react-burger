import React from 'react';
import AppHeader from '../../components/app-header/app-header.jsx';

const Main = ({children}) => {
  return (
    <div className="App">
      <AppHeader />
      <main className="main pt-2">
        { children }
      </main>
    </div>
  );
}

export default Main;
