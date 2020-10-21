import React from 'react';
import './App.css';
import Header from './components/Header';
import styles from './modules/App.module.css';
import Main from './components/Main';

function App() {
  return (
    <div className="App">
      <div className={`container-fluid ${styles.background}`}>
        <Header/>
        <Main/>
      </div>
    </div>
  );
}

export default App;
