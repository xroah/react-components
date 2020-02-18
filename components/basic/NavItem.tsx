import * as React from "react";
import PropTypes from "prop-types";
import { classNames } from "../utils";

export default function NavItem(props: React.HTMLAttributes<HTMLElement>) {
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