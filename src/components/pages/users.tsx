import React from "react";
import { connect } from "react-redux";
import { updateUserStatus, getUsers } from "../../actions/user";
import { RouteComponentProps } from "react-router-dom";
import { Table, Form, Button } from "react-bootstrap";
import { LocalStorageProvider } from "../../infrastructure/localStorage";
import { IUser, IState, ILocalStorageProvider } from "../../common/interfaces";

interface IProps {
    getUsers: () => void;
    updateUserStatus: (userId: number) => void;
    user: IUser;
    users: IUser[];
}

interface IUsersState {
    wasChanged: boolean;
}
class Users extends React.Component<IProps & RouteComponentProps, IUsersState> {
    localStorageProvider: ILocalStorageProvider;
    constructor(props: IProps & RouteComponentProps) {
        super(props);
        this.state = {
            wasChanged: false,
        };
        this.localStorageProvider = new LocalStorageProvider();
    }

    componentDidMount() {
        if (this.props.user.roleId !== 0) {
            this.props.history.push("/403");
        }
        this.props.getUsers();
    }

    handleClick = (userId: number) => () => {
        this.setState({
            wasChanged: true
        });
        this.props.updateUserStatus(userId);
    }

    handleSaveClick = () => () => {
        this.localStorageProvider.saveUsers(this.props.users);
    }

    render(): React.ReactNode {
        if (this.props.users instanceof Array) {
            return (
                <div className="page-container">
                    <br />
                    <Button
                        className="margin-bottom-10"
                        disabled={!this.state.wasChanged}
                        onClick={this.handleSaveClick()}>Сохранить</Button>
                    <br />
                    <Table>
                        <thead>
                            <tr>
                                <th>Имя</th>
                                <th>Роль</th>
                                <th>Активен</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.users.map((user) => {
                                if (this.props.user.id !== user.id) {
                                    return (
                                        <tr key={user.id}>
                                            <td>{user.name}</td>
                                            <td>{user.roleId}</td>
                                            <td>
                                                <Form.Check checked={user.isActive} onChange={this.handleClick(user.id)} />
                                            </td>
                                        </tr>
                                    );
                                }
                            })}
                        </tbody>
                    </Table>
                </div>
            );
        }
        return null;
    }
}

const mapStateToProps = (state: IState) => {
    return {
        user: state.users.loggedUser,
        users: state.users.userList,
    };
};

export default connect(mapStateToProps, { getUsers, updateUserStatus })(Users);