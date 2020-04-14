import * as React from "react";
import PropTypes from "prop-types";
import { classNames } from "../utils";
import { NavbarContext } from "../Common/contexts";
import { CommonProps } from "../Common/CommonPropsInterface";

export interface NavProps extends CommonProps<HTMLElement> {
    alignment?: "left" | "center" | "right";
    minWidth?: "sm" | "md" | "lg" | "xl";
    vertical?: boolean;
    variant?: "tab" | "pill";
    fill?: boolean;
    navbar?: boolean;
    equalWidth?: boolean;
}

export default function Nav(props: NavProps) {
    const {
        className,
        alignment,
        vertical,
        fill,
        variant,
        navbar,
        minWidth,
        equalWidth,
        ...otherProps
    } = props;
    const alignmentMap: any = {
        center: "justify-content-center",
        right: "justify-content-end"
    };
    const variantMap: any = {
        tab: "nav-tabs",
        pill: "nav-pills"
    };

    return (
        <NavbarContext.Consumer>
            {
                value => React.createElement(
                    value ? "div" : "nav",
                    {
                        className: classNames(
                            className,
                            value || navbar ? "navbar-nav" : "nav",
                            variant && variantMap[variant],
                            alignment && alignmentMap[alignment],
                            vertical ? (minWidth ? `flex-${minWidth}-column` : "flex-column") : "",
                            fill && "nav-fill",
                            equalWidth && "nav-justified"
                        ),
                        ...otherProps
                    }
                )
            }
        </NavbarContext.Consumer>
    );
}

Nav.propTypes = {
    alignment: PropTypes.oneOf(["left", "right", "center"]),
    vertical: PropTypes.bool,
    fill: PropTypes.bool,
    navbar: PropTypes.bool,
    equalWidth: PropTypes.bool,
    variant: PropTypes.oneOf(["tab", "pill"])
};
Nav.defaultProps = {
    vertical: false,
    fill: false,
    navbar: false,
    equalWidth: false
};