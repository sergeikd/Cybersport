import React, { Component } from 'react';
import './App.css';
import { LoginProvider } from './infrastructure/login.ts';
import { LocalStorageProvider } from './infrastructure/localStorage.ts';
import { data } from './appData/defaultData';
import { MainMenu } from './components/mainMenu';

class App extends Component {
  localStorageProvider;
  loginProvider;
  constructor() {
    super();
    this.localStorageProvider = new LocalStorageProvider();
    this.loginProvider = new LoginProvider();
  }
  componentDidMount() {
    for (const key in data) {
      this.localStorageProvider.putObject(key, data[key]);
    }
    if (!this.loginProvider.isLogged()) {
      this.loginProvider.login("User1");
    } else {
      this.loginProvider.logout();
    }
  }

  render() {
    // console.log(this.loginProvider.isLogged());
    return (
      <MainMenu />
    );
  }
}

export default App;
