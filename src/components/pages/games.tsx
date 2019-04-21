import React from "react";
import { connect } from "react-redux";
import { getGames } from "../../actions/gamesAction";
import { RouteComponentProps, Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { LocalStorageProvider } from "../../infrastructure/localStorage";
import { IUser, IGamesState, ILocalStorageProvider, IGame } from '../../common/interfaces';

interface IGamesProps {
    getGames: () => void;
    games: IGame[];
    user: IUser;
}

class Games extends React.Component<IGamesProps & RouteComponentProps, {}> {
    localStorageProvider: ILocalStorageProvider;
    constructor(props: IGamesProps & RouteComponentProps) {
        super(props);
        this.localStorageProvider = new LocalStorageProvider();
    }

    componentDidMount() {
        if (this.props.user.roleId !== 0) {
            this.props.history.push("/403");
        }
        this.props.getGames();
    }

    handleEditClick = (gameId: number) => () => {
        this.setState({
            wasChanged: true
        });
    }

    render(): React.ReactNode {
        if (this.props.games instanceof Array) {
            return (
                <div className="page-container">
                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Имя</th>
                                <th>Лого</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.games.map((game) => {
                                const path = `/editGame/${game.id}`;
                                return (
                                    <tr key={game.id}>
                                        <td>{game.id}</td>
                                        <td>{game.name}</td>
                                        <td>{game.backgroundImageId}</td>
                                        <td>
                                            <Link to={path}>Изменить</Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            );
        }
    }
}

const mapStateToProps = (state: IGamesState) => {
    return {
        games: state.games.gamesList,
        user: state.users.loggedUser,
    };
};

export default connect(mapStateToProps, { getGames })(Games);