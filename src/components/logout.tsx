import React from "react";
import { connect } from "react-redux";
import { logOut } from "../actions/userAction";
import { RouteComponentProps } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

interface IProps {
    logOut: () => void;
}

class Logout extends React.Component<IProps & RouteComponentProps> {
    handleLogout = () => () => {
        this.props.logOut();
        this.props.history.push("/");
    }

    render(): React.ReactNode {
        return (
            <>
                <br />
                <Form className="form-container">
                    <Form.Group>
                        <Form.Label className="main-text">Вы уверены?</Form.Label>
                    </Form.Group>
                    <Button onClick={this.handleLogout()}>Выйти</Button>
                </Form>
            </>
        );
    }
}

export default connect(null, { logOut })(Logout);