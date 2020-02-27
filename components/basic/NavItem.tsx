import * as React from "react";
import PropTypes from "prop-types";
import { classNames } from "../utils";
import { CommonProps } from "../CommonPropsInterface";

export default function NavItem(props: CommonProps<HTMLDivElement>) {
    const {
        className,
        ...otherProps
    } = props;

    return (
        <div className={
            classNames(
                className,
                "nav-item"
            )
        } {...otherProps} />
    );
}


NavItem.propTypes = {
    tag: PropTypes.string
}