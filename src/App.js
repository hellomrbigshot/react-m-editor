import React from 'react';
import logo from './logo.svg';
import './App.css';
import MEditor from './components';
import defaultValue from './example/example.md';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div style={{ width: '90%', margin: '20px auto' }}>
        <MEditor value={defaultValue} />
      </div>
    </div>
  );
}

export default App;
