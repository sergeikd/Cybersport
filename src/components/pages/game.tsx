import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { IUser, INews, IGame, IMatchParams } from "../../common/interfaces";
import { ListGroup } from "react-bootstrap";
import { getNews } from "../../actions/newsAction";
import { getGames } from "../../actions/gamesAction";

interface IGameProps extends RouteComponentProps<IMatchParams> {
    getNews: () => void;
    getGames: () => void;
    news: INews[];
    loggedUser: IUser;
    games: IGame[];
}

interface IGameState {
    currentGameId: number,
    games: {
        gamesList: IGame[],
    };
    news: {
        newsList: INews[],
    };
    users: {
        loggedUser: IUser,
    };
}

class Game extends React.Component<IGameProps & RouteComponentProps, IGameState> {
    constructor(props: IGameProps) {
        super(props);
        this.props.getNews();
        this.setGameToStateFromProps();
    }

    private setGameToStateFromProps = () => {
        this.props.getGames();
        const index = this.props.games.findIndex(game => game.nameUri === this.props.match.params.nameUri);
        if (index === -1) {
            this.props.history.push("/404");
        }

        this.setState({ currentGameId: index });
    }

    render(): React.ReactNode {
        console.log(this.state);
        // if (this.props.news instanceof Array) {
            return (
                <ListGroup className="page-container">
                    {this.props.match.params.nameUri.toUpperCase()}
                    {/* {this.props.news.filter(newsItem => newsItem.gameId === this.state.currentGameId).map(newsItem => { */}
                    {this.props.news.map(newsItem => {
                        return (
                            <ListGroup.Item className="news-list-item" key={newsItem.id}>
                                <label>{newsItem.title}</label><br />
                                {newsItem.text}
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            );
        // }
    }
}

const mapStateToProps = (state: IGameState) => {
    return {
        news: state.news.newsList,
        games: state.games.gamesList,
        loggedUser: state.users.loggedUser,
    };
};

export default connect(mapStateToProps, { getNews, getGames })(Game);