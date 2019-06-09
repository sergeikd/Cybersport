import React from "react";
import { connect } from "react-redux";
import { getGames, editGame } from "../../actions/gamesAction";
import { RouteComponentProps } from "react-router-dom";
import { Table, Form, Col, Button } from "react-bootstrap";
import { IUser, IGamesState, IGame, IApiProvider } from "../../common/interfaces";
import { ApiProvider } from "../../infrastructure/fakeApi";
import * as instances from "../../common/instances";

interface IMatchParams {
    nameUri: string;
}

interface IGameEditProps extends RouteComponentProps<IMatchParams> {
    getGames: () => void;
    editGame: (game: IGame) => void;
    games: IGame[];
    loggedUser: IUser;
}

interface IGameEditState {
    game: IGame;
}

class EditGame extends React.Component<IGameEditProps & RouteComponentProps, IGameEditState> {
    apiProvider: IApiProvider;
    wasChanged: boolean;
    constructor(props: IGameEditProps & RouteComponentProps) {
        super(props);
        this.wasChanged = false;
        this.apiProvider = new ApiProvider();
    }

    state = {
        game: {
            id: 0,
            name: "",
            nameUri: "",
            backgroundImage: ""
        }
    };

    private fileChangeHandler = (event: any) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
            if(reader.result) {
                this.setState(prevState => ({
                    game: {...prevState.game,
                    backgroundImage: reader.result as string
                }}));
            }
        };
        reader.readAsDataURL(file);
    }

    private saveButtonHandler = () => () => {
        const index = this.props.games.findIndex(game => game.id === this.state.game.id);
        const updatedGames = this.props.games;
        updatedGames[index] = this.state.game;
        this.apiProvider.save(instances.GAMES, updatedGames);
    }

    private handleChange = (field: string) => (event: any) => {
        const value: string = event.target.value;
        this.setState({ [field]: event.target.value } as Pick<IGameEditState, any>);
        this.setState(prevState => ({
            game: {...prevState.game,
            [field]: value
        }}));
    }

    componentDidMount(): void {
        if (this.props.loggedUser.roleId !== 0) {
            this.props.history.push("/403");
        }
        this.props.getGames();
        const index: number = this.getGameIndex();
        if (index === -1) {
            this.props.history.push("/404");
        }

        this.setState({ game: this.props.games[index] });
    }

    componentWillUpdate(prevProps: IGameEditProps, prevState: IGameEditState): void {
        this.handleGameFieldChanges(prevState.game);
    }

    private getGameIndex(): number {
        return this.props.games.findIndex(game => game.nameUri === this.props.match.params.nameUri);
    }

    private handleGameFieldChanges = (prevStateGame: IGame): void => {
        const originalGame: IGame = this.props.games[this.getGameIndex()];
        if(originalGame.name !== prevStateGame.name ||
            originalGame.nameUri !== prevStateGame.nameUri||
            originalGame.backgroundImage !== prevStateGame.backgroundImage) {
            this.wasChanged = true;
        } else {
            this.wasChanged = false;
        }
    }

    render(): React.ReactNode {
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
                                        onChange={this.handleChange("name")}
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
                                        onChange={this.handleChange("nameUri")}
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
                    <Button
                        className="margin-bottom-10"
                        disabled={!this.wasChanged}
                        onClick={this.saveButtonHandler()}>Сохранить</Button>
                    <br />
                </div>
            );
        }
}

const mapStateToProps = (state: IGamesState) => {
    return {
        games: state.games.gamesList,
        loggedUser: state.users.loggedUser,
    };
};

export default connect(mapStateToProps, { getGames, editGame })(EditGame);