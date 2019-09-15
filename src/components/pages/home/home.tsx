import React from "react";
import { connect } from "react-redux";
import { getGames } from "../../../actions/gamesAction";
import { IGame } from "../../../common/interfaces";
import { HomeGameItem } from "./homeGameItem";

interface IHomeProps {
    getGames: () => void;
    games: IGame[];
}

interface IHomeState {
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
                    return (
                        <HomeGameItem {...game} key={game.id} />
                    )
                })}
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