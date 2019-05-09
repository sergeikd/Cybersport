import React from "react";
import { connect } from "react-redux";
import { getGames } from "../../actions/gamesAction";
import { RouteComponentProps, Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { IUser, IGamesState, IGame } from "../../common/interfaces";

interface MatchParams {
    nameUri: string;
}

interface IGameEditProps extends RouteComponentProps<MatchParams> {
    getGames: () => void;
    saveGame: () => void;
    games: IGame[];
    loggedUser: IUser;
}

class EditGame extends React.Component<IGameEditProps & RouteComponentProps, {}> {
    game: IGame | undefined;
    isChanged: boolean;
    constructor(props: IGameEditProps & RouteComponentProps) {
        super(props);
        this.isChanged = false;
    }


    componentDidMount():void {
        if (this.props.loggedUser.roleId !== 0) {
            this.props.history.push("/403");
        }
        this.props.getGames();
        const index = this.props.games.findIndex(game => game.nameUri === this.props.match.params.nameUri);
        console.log(index);
        if (index === -1) {
            this.props.history.push("/404");
        }
        this.game = this.props.games[index];
    }

    render(): React.ReactNode {
        if (this.game !== undefined) {
            return (
                <div className="page-container">
                    {this.game.name}
                </div>
            );
        }
        return null;
    }
}

const mapStateToProps = (state: IGamesState) => {
    return {
        games: state.games.gamesList,
        loggedUser: state.users.loggedUser,
    };
};

export default connect(mapStateToProps, { getGames })(EditGame);