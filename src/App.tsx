import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import { ApiProvider } from "./infrastructure/fakeApi";
import { data } from "./appData/defaultData";
import { IApiProvider, IUser } from "./common/interfaces";
import { Header } from "./components/header/header";
import LoginForm from "./components/forms/loginForm";
import Logout from "./components/logout";
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
  }

  componentDidMount(): void {
    const initData: IData = { ...data };
    for (const key in data as IData) {
      this.apiProvider.save(key, initData[key]);
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
            <Route path="/games" component={Games} />
            <Route path="/game" component={Game} />
            <Route path="/edit-game/:nameUri" component={EditGame} />
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