import * as React from "react";
import PropTypes from "prop-types";
import { classNames } from "../utils";

export interface JumbotronProps extends React.HTMLAttributes<HTMLElement> {
    fluid?: boolean;
}

export default function Jumbotron(props: JumbotronProps) {
    const {
        className,
        fluid,
        ...otherProps
    } = props;


    return <div className={
        classNames(
            className,
            "jumbotron",
            fluid && "jumbotron-fluid"
        )
    } {...otherProps}/>;
}

Jumbotron.propTypes = {
    fluid: PropTypes.bool
};
Jumbotron.defaultProps = {
    fluid: false
};