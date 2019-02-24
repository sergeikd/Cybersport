import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import { LoginProvider } from "./infrastructure/loginProvider";
import { LocalStorageProvider } from "./infrastructure/localStorage.ts";
import { data } from "./appData/defaultData";
import { Header } from "./components/header/header";
import LoginForm from "./components/forms/loginForm";

class App extends Component {
  localStorageProvider;
  // loginProvider;
  constructor() {
    super();
    this.localStorageProvider = new LocalStorageProvider();
    // this.loginProvider = new LoginProvider();
  }
  componentDidMount() {
    for (const key in data) {
      this.localStorageProvider.putObject(key, data[key]);
    }
    // if (!this.loginProvider.isLogged()) {
    //   this.loginProvider.login("User1");
    // } else {
    //   this.loginProvider.logout();
    // }
  }

  render() {
    // console.log(this.loginProvider.isLogged());
    return (
      <Router>
        <>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/login" component={LoginForm} />
          <Route path="/topics" component={Topics} />
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

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);
