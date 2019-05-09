import React from "react";
import { connect } from "react-redux";
import { getGames } from "../../actions/gamesAction";
import { RouteComponentProps, Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { IUser, IGamesState, IGame } from "../../common/interfaces";

interface IGamesProps {
    getGames: () => void;
    games: IGame[];
    user: IUser;
}

class Games extends React.Component<IGamesProps & RouteComponentProps, {}> {
    constructor(props: IGamesProps & RouteComponentProps) {
        super(props);
    }

    componentDidMount():void {
        if (this.props.user.roleId !== 0) {
            this.props.history.push("/403");
        }
        this.props.getGames();
    }

    render(): React.ReactNode {
        if (this.props.games instanceof Array) {
            return (
                <div className="page-container">
                    <Table>
                        <thead>
                            <tr>
                                <th>Имя</th>
                                <th>Путь</th>
                                <th>Лого</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.games.map((game) => {
                                const path = `/edit-game/${game.nameUri}`;
                                return (
                                    <tr key={game.id}>
                                        <td>{game.name}</td>
                                        <td>{game.nameUri}</td>
                                        <td><img className="game-image-preview"src={game.backgroundImage}/></td>
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