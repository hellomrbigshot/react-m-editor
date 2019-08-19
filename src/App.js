import React from 'react';
import logo from './logo.svg';
import './App.css';
import MEditor from './components/index';
import text from './example/example.md';
console.log(text)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div style={{maxWidth: '1000px', width: '90%', margin: '30px auto'}}>
          <MEditor value={text} />
        </div>
      </header>
    </div>
  );
}

export default App;
