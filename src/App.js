import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { LoginProvider } from './infrastructure/login.ts';
import { LocalStorageProvider } from './infrastructure/localStorage.ts';
import { data } from './appData/defaultData';

class App extends Component {
  localStorageProvider;
  loginProvider;
  constructor() {
    super()
    this.localStorageProvider = new LocalStorageProvider();
    this.loginProvider = new LoginProvider();
  }
  componentDidMount() {
    for (const key in data) {
      this.localStorageProvider.putObject(key, data[key]);
    }
  };

  render() {
    console.log(this.loginProvider.isLogged());
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
