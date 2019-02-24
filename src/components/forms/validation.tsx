import React from "react";

interface IValidation {
    isValid: boolean;
    msg: string;
}
export const Validation = (props: IValidation): JSX.Element | null => {
    const { isValid, msg } = props;
    if (!isValid) {
        return (
            <div className="validation-error">{msg}</div>
        );
    }
    return (null);
};