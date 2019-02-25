import React from "react";
import { connect } from "react-redux";
import { logIn } from "../../actions/user";
import { RouteComponentProps } from "react-router-dom";
import { ListGroup, Button } from "react-bootstrap";
import { LocalStorageProvider } from "../../infrastructure/localStorage";
import { IUser, IState, ILocalStorageProvider } from "../../common/interfaces";

interface IUsersState {

}

interface IProps {
    getUsers: () => IUser[];
    user: IUser;
}

class Users extends React.Component<IProps & RouteComponentProps, IUsersState> {
    localStorageProvider: ILocalStorageProvider;
    constructor(props: IProps & RouteComponentProps) {
        super(props);
        this.state = {
        };
        this.localStorageProvider = new LocalStorageProvider();
    }

    componentDidMount() {
        if (this.props.user.roleId !== 0) {
            this.props.history.push("/403");
        }
    }

    handleClick = () => (event: React.MouseEvent<HTMLButtonElement>) => {
        const form: HTMLFormElement = event.currentTarget.form as HTMLFormElement;

        if (form.checkValidity() === true) {
            const inputElement = form[0] as HTMLInputElement;
            const userName = inputElement.value;
            const user = this.localStorageProvider.getUser(userName);
            if (user && user.isActive) {

                this.props.history.push("/");
            }
        }
        event.preventDefault();
        event.stopPropagation();
        this.setState({ validated: false });
    }

    render(): React.ReactNode {
        return (
            <>
                <br />
                <h1>{this.props.user.name}</h1>
                <ListGroup variant="flush">
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                    <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                </ListGroup>;
      </>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(Users);