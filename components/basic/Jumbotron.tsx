import * as React from "react";
import PropTypes from "prop-types";
import { classNames } from "../utils";
import { CommonProps } from "../CommonPropsInterface";

export interface JumbotronProps extends CommonProps<HTMLDivElement> {
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