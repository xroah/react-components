import * as React from "react";
import PropTypes from "prop-types";
import {classNames, FormGroupContext} from "../utils";

export interface FormGroupProps extends React.HTMLAttributes<HTMLElement> {
    horizontal?: boolean;
}

export default function FormGroup(props: FormGroupProps) {
    const {
        horizontal,
        className,
        ...otherProps
    } = props;

    return (
        <FormGroupContext.Provider value={!!horizontal}>
            <div className={
            classNames(
                className,
                "form-group",
                horizontal && "row"
            )
        } {...otherProps}/>
        </FormGroupContext.Provider>
    );
}

FormGroup.propTypes = {
    horizontal: PropTypes.bool
};