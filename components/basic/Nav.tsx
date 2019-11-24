import * as React from "react";
import PropTypes from "prop-types";
import NavItem from "./NavItem";
import { classNames } from "../utils";

export interface NavProps extends React.HTMLAttributes<HTMLElement> {
    alignment?: "center" | "right";
    vertical?: boolean;
    pills?: boolean;
    fill?: boolean;
}

export default function Nav(props: NavProps) {
    const {
        className,
        alignment,
        vertical,
        pills,
        fill,
        ...otherProps
    } = props;
    const alignmentMap: any = {
        center: "justify-content-center",
        right: "justify-content-end"
    };

    return (
        <nav className={
            classNames(
                className,
                "nav",
                pills && "nav-pills",
                alignment && alignmentMap[alignment],
                vertical && "flex-column",
                fill && "nav-fill"
            )
        } {...otherProps} />
    );
}

Nav.propTypes = {
    alignment: PropTypes.oneOf(["right", "center"]),
    vertical: PropTypes.bool,
    pills: PropTypes.bool,
    fill: PropTypes.bool
};
Nav.Item = NavItem;