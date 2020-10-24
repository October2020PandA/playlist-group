import React from 'react';
import './App.css';
import Header from './components/Header';
import styles from './modules/App.module.css';
import Main from './components/Main';
// import Results from './components/Results';

function App() {
  return (
    <div className="App">
      <div className={`container-fluid ${styles.background}`}>
        <Header/>
        <div className="row mt-5">
          <Main className="col-4"/>
          {/* <Results className="col-8"/>                  */}
        </div>

        
      </div>
    </div>
  );
}

export default App;
