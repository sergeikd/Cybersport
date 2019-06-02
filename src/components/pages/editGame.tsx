import React from "react";
import { connect } from "react-redux";
import { getGames } from "../../actions/gamesAction";
import { RouteComponentProps, Link } from "react-router-dom";
import { Table, Form, Col } from "react-bootstrap";
import { IUser, IGamesState, IGame } from "../../common/interfaces";

interface IMatchParams {
    nameUri: string;
}

interface IGameEditProps extends RouteComponentProps<IMatchParams> {
    getGames: () => void;
    saveGame: () => void;
    games: IGame[];
    loggedUser: IUser;
}

interface IGameEditState {
    game: IGame;
}

class EditGame extends React.Component<IGameEditProps & RouteComponentProps, IGameEditState> {
    isChanged: boolean;
    constructor(props: IGameEditProps & RouteComponentProps) {
        super(props);
        this.isChanged = false;
    }

    state = {
        game: {
            id: 0,
            name: "",
            nameUri: "",
            backgroundImage: ""
        }
    };

    fileChangeHandler = (event: any) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
            if(reader.result) {
                const updatedGame = {...this.state.game};
                updatedGame.backgroundImage =  reader.result as string;
                this.setState({game: updatedGame});
            }
        };
        reader.readAsDataURL(file);
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
        this.setState({ game: this.props.games[index] });
    }

    render(): React.ReactNode {
        if (this.state.game !== undefined) {
            return (
                <div className="page-container">
                    <Table>
                        <tbody>
                            <tr>
                                <td>Имя</td>
                                <td>
                                    <Form.Group as={Col} md="12" controlId="validationCustom02">
                                        <Form.Control
                                        required
                                        type="text"
                                        value={this.state.game.name}
                                        />
                                    </Form.Group>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Путь</td>
                                <td>
                                    <Form.Group as={Col} md="12" controlId="validationCustom02">
                                        <Form.Control
                                        required
                                        type="text"
                                        value={this.state.game.nameUri}
                                        />
                                    </Form.Group>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Лого</td>
                                <td>
                                    <img className="game-image-max"src={this.state.game.backgroundImage}/>
                                </td>
                                <td>
                                    <Form.Control
                                        type="file"
                                        accept=".jpg,.png"
                                        onChange={this.fileChangeHandler}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </Table>
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