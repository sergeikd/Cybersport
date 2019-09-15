import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import { ApiProvider } from "./infrastructure/fakeApi";
import { IApiProvider, IUser } from "./common/interfaces";
import { Header } from "./components/header/header";
import LoginForm from "./components/forms/loginForm";
import Logout from "./components/logout";
import Home from "./components/pages/home";
import Users from "./components/pages/users";
import Games from "./components/pages/games";
import Game from "./components/pages/game";
import EditGame from "./components/pages/editGame";
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
  apiProvider: IApiProvider;
  constructor(props: IProps) {
    super(props);
    this.apiProvider = new ApiProvider();
    this.apiProvider.initLocalStorage();
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
            <Route path="/admin/users" component={Users} />
            <Route path="/admin/games" component={Games} />
            <Route path="/game" component={Game} />
            <Route path="/admin/edit-game/:nameUri" component={EditGame} />
            <Route path="/403" component={Page403} />
            <Route component={Page404} />
          </Switch>
        </>
      </Router>
    );
  }
}

export default connect(null, { logIn })(App);