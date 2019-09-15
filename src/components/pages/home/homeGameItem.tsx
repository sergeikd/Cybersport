import React from "react";
import { IGame } from "../../../common/interfaces";
import { Link } from "react-router-dom";

export const HomeGameItem: (props: IGame) => JSX.Element = (game) => {
    const path = `/game/${game.nameUri}`;
    return (
        <div className="home-item" key={game.id}>
            <img className="game-image-max home-image" src={game.backgroundImage} />
            <div className="home-item-button">
                <Link className="home-item-button-link" to={path}>Подробнее</Link>
            </div>
        </div>
    );
};