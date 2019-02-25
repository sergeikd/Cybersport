import React from "react";
import { Link } from "react-router-dom";

export const Page404 = (): JSX.Element => {
    return (
        <div id="notfound">
		<div className="notfound">
			<div className="notfound-404">
				<h1>404</h1>
				<h2>Page not found</h2>
			</div>
			<Link to="/">Homepage</Link>
		</div>
	</div>
    );
};
