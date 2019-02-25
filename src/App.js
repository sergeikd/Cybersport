import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { LocalStorageProvider } from "./infrastructure/localStorage.ts";
import { data } from "./appData/defaultData";
import { Header } from "./components/header/header";
import LoginForm from "./components/forms/loginForm";
import Logout from "./components/logout";

class App extends Component {
  localStorageProvider;
  constructor() {
    super();
    this.localStorageProvider = new LocalStorageProvider();
  }

  componentDidMount() {
    for (const key in data) {
      this.localStorageProvider.putObject(key, data[key]);
    }
  }

  render() {
    return (
      <Router>
        <>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
        </>
      </Router>
    );
  }
}

export default App;

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);