import React from "react";
import TextField from "@material-ui/core/TextField";

export const LoginForm = (): JSX.Element => {
    return (
        <div>
            LoginForm
            <form>
                <TextField
                    className = "text-primary"
                    id="standard-name"
                    label="Name"
                    // className={classes.textField}
                    // value={this.state.name}
                    // onChange={this.handleChange('name')}
                    margin="normal"
                />
            </form>
            {/* <Link to="/signin">Регистрация</Link> */}
        </div>
    );
};