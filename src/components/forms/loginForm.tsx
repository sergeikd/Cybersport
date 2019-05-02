import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { Validation } from "./validation";
import { logIn } from "../../actions/userAction";
import * as instances from "../../common/instances";
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
  handleClick = () => async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.persist();
    const form: HTMLFormElement = event.currentTarget.form as HTMLFormElement;

    if (form.checkValidity() === true) {
      const inputElement = form[0] as HTMLInputElement;
      const userName = inputElement.value;
      const user = await this.localStorageProvider.getSingle<IUser>(instances.USERS, "name", userName);
      if (user && user.isActive) {
        this.props.logIn(user);
        this.props.history.push("/");
      }
    }
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