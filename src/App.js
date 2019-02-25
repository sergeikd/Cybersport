import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { LocalStorageProvider } from "./infrastructure/localStorage.ts";
import { data } from "./appData/defaultData";
import { Header } from "./components/header/header";
import LoginForm from "./components/forms/loginForm";
import Logout from "./components/logout";
import Users from "./components/pages/users";
import { Page404 } from "./components/pages/404";
import { Page403 } from "./components/pages/403";

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
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/users" component={Users} />
            <Route path="/403" component={Page403} />
            <Route component={Page404} />
          </Switch>
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