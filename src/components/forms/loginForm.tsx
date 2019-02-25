import React from "react";
import { connect } from "react-redux";
import { logIn } from "../../actions/user";
import { RouteComponentProps } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { Validation } from "./validation";
import { LocalStorageProvider } from "../../infrastructure/localStorage";
import { IUser, ILocalStorageProvider } from "../../common/interfaces";

interface ILoginFormState {
  validated: boolean;
}

interface IProps {
  logIn: (user: IUser) => void;
}

class LoginForm extends React.Component<IProps & RouteComponentProps, ILoginFormState> {
  localStorageProvider: ILocalStorageProvider;
  constructor(props: IProps & RouteComponentProps) {
    super(props);
    this.state = {
      validated: true,
    };
    this.localStorageProvider = new LocalStorageProvider();
  }
  handleClick = () => (event: React.MouseEvent<HTMLButtonElement>) => {
    const form: HTMLFormElement = event.currentTarget.form as HTMLFormElement;

    if (form.checkValidity() === true) {
      const inputElement = form[0] as HTMLInputElement;
      const userName = inputElement.value;
      const user = this.localStorageProvider.getUser(userName);
      if (user && user.isActive) {
        this.props.logIn(user);
        this.props.history.push("/");
      }
    }
    event.preventDefault();
    event.stopPropagation();
    this.setState({ validated: false });
  }

  render(): React.ReactNode {
    const { validated } = this.state;
    const invalidMsg = "Такого пользователя не существует";
    return (
      <>
        <br />
        <Form className="form-container">
          <Form.Group>
            <Form.Label className="main-text">Вход</Form.Label>
            <Form.Control type="text" placeholder="Введите имя" required />
            <Validation isValid={validated} msg={invalidMsg} />
          </Form.Group>
          <Button onClick={ this.handleClick() }>Войти</Button>
        </Form>
      </>
    );
  }
}

export default connect(null, { logIn })(LoginForm);

  // handleSubmit = () => (event: React.FormEvent<HTMLFormElement>) => {// event: MouseEvent<HTMLButtonElement, MouseEvent>
  //   const form: HTMLFormElement = event.currentTarget;
  //   console.log(form.action);
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //     this.setState({ validated: false });
  //   }
  //   if (form.checkValidity() === true) {
  //     const inputElement = form[0] as HTMLInputElement;
  //     const userName: string = inputElement.value;
  //     console.log(this.loginProvider.isUserExists(userName));
  //     if (this.loginProvider.isUserExists(userName)) {
  //       this.loginProvider.login(userName);
  //       const user: IUser = {
  //         name: "test",
  //         id: 1,
  //         roleId: 1
  //       };
  //       this.props.logIn(user);
  //       // return <Redirect to="/"/>;
  //       form.action = "/";
  //     } else {
  //       event.preventDefault();
  //       event.stopPropagation();
  //       this.setState({ validated: false });
  //     }
  //   }
  // }