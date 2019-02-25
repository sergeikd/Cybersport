import React from "react";
import { Link } from "react-router-dom";

export const Page403 = (): JSX.Element => {
    return (
        <div id="notfound">
		<div className="notfound">
			<div className="notfound-404">
				<h1>403</h1>
				<h2>Access denied</h2>
			</div>
			<Link to="/">Homepage</Link>
		</div>
	</div>
    );
};
