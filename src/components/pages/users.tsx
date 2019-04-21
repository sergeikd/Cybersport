import React from "react";
import { connect } from "react-redux";
import { getUsers, getRoles,updateUserStatus, updateUserRole } from "../../actions/userAction";
import { RouteComponentProps } from "react-router-dom";
import { Table, Form, Button } from "react-bootstrap";
import { LocalStorageProvider } from "../../infrastructure/localStorage";
import { IUser, IRole, IUserState, ILocalStorageProvider } from "../../common/interfaces";

interface IUsersProps {
    getUsers: () => void;
    getRoles: () => void;
    updateUserStatus: (userId: number) => void;
    updateUserRole: (user: Partial<IUser>) => void;
    user: IUser;
    users: IUser[];
    roles: IRole[];
}

interface IUsersState {
    wasChanged: boolean;
}
class Users extends React.Component<IUsersProps & RouteComponentProps, IUsersState> {
    localStorageProvider: ILocalStorageProvider;
    constructor(props: IUsersProps & RouteComponentProps) {
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
        this.props.getRoles();
    }

    handleClick = (userId: number) => () => {
        this.setState({
            wasChanged: true
        });
        this.props.updateUserStatus(userId);
    }

    handleChangeRole = () => (e: React.FormEvent<HTMLSelectElement> & React.FormEvent<HTMLOptionsCollection>) => {
        console.log(e.currentTarget);
        console.log(e.currentTarget.value);
        console.log(e.currentTarget.id);
        const updatedUser: Partial<IUser> =  {
            id: Number(e.currentTarget.id),
            roleId: this.props.roles.filter(x => x.role === e.currentTarget.value)[0].id,
        };
        this.props.updateUserRole(updatedUser);
        this.setState({
            wasChanged: true
        });
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
                                            <td>
                                                <Form.Control as="select" id={user.id.toString()} onChange={this.handleChangeRole()}>
                                                    <option  key={user.roleId}>
                                                        {this.props.roles.filter(x => x.id === user.roleId)[0].role}
                                                    </option>
                                                    {this.props.roles.filter(x => x.id !== user.roleId).map((role) => {
                                                        return <option key={role.id}>{role.role}</option>;
                                                    })}
                                                </Form.Control>
                                            </td>
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

const mapStateToProps = (state: IUserState) => {
    return {
        user: state.users.loggedUser,
        users: state.users.userList,
        roles: state.users.roles,
    };
};

export default connect(mapStateToProps, { getUsers, getRoles, updateUserStatus, updateUserRole })(Users);