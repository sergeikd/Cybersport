import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const styles: any = {
    root: {
        border: 0,
        color: "white",
        height: 48,
    },
    input: {
        color: "white",
    },

};

export function LoginForm(props: any) {
    const { classes } = props;
    return (
        <form>
            <TextField classes={{
                root: classes.root,
                input: classes.input,
            }}>
            </TextField>
        </form>
    );
}

export default withStyles(styles)(LoginForm);