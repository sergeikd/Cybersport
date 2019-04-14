import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import { LocalStorageProvider } from "./infrastructure/localStorage";
import { data } from "./appData/defaultData";
import { ILocalStorageProvider, IUser } from "./common/interfaces";
import { Header } from "./components/header/header";
import LoginForm from "./components/forms/loginForm";
import Logout from "./components/logout";
import Users from "./components/pages/users";
import Game from "./components/pages/game";
import { Page404 } from "./components/pages/404";
import { Page403 } from "./components/pages/403";
import { logIn } from "./actions/userAction";

interface IData {
  [key: string]: any;
}

interface IProps {
  logIn: (user: IUser) => void;
}

class App extends Component<IProps> {
  localStorageProvider: ILocalStorageProvider;
  constructor(props: IProps) {
    super(props);
    this.localStorageProvider = new LocalStorageProvider();
  }

  componentDidMount(): void {
    const initData: IData = { ...data };
    for (const key in data as IData) {
      this.localStorageProvider.putObject(key, initData[key]);
    }

    const admin: IUser = {
      id: 0,
      name: "aaa", // admin
      roleId: 0,
      isActive: true,
    };
    this.props.logIn(admin);
  }

  render(): React.ReactNode {
    return (
      <Router>
        <>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/users" component={Users} />
            <Route path="/game" component={Game} />
            <Route path="/403" component={Page403} />
            <Route component={Page404} />
          </Switch>
        </>
      </Router>
    );
  }
}

export default connect(null, { logIn })(App);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);