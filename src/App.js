import React, { Component } from 'react';
import './App.css';
import Home from './pages/Home.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Home/>
        </header>
      </div>
    );
  }
}

export default App;
