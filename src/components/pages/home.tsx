import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { INewsState } from "../../common/interfaces";
import { ListGroup } from "react-bootstrap";
import { getGames } from "../../actions/gamesAction";
import { IUser, IGamesState, IGame, IApiProvider } from "../../common/interfaces";

interface IHomeProps {
    getGames: () => void;
    games: IGame[];
    loggedUser: IUser;
}

interface IHomeState {
    //wasChanged: boolean;
    games: {
        gamesList: IGame[],
    };
}

class Home extends React.Component<IHomeProps, {}> {
    constructor(props: IHomeProps) {
        super(props);
        this.props.getGames();
    }

    render(): React.ReactNode {
        return (
            <div className="page-container">
                {this.props.games.map(game => {
                    const path = `/game/${game.nameUri}`;
                    return (
                        <div className="home-item">
                            <img className="game-image-max home-image" src={game.backgroundImage} />
                            <div className="home-item-button">
                                <Link className="home-item-button-link" to={path}>Подробнее</Link>
                            </div>                            
                        </div>
                )})}
            </div>
        );
    }
}

const mapStateToProps = (state: IHomeState) => {
    return {
        games: state.games.gamesList,
    };
};

export default connect(mapStateToProps, { getGames })(Home);