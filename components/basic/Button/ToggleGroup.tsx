import * as React from "react";
import ButtonGroup from "./ButtonGroup";
import { CommonProps } from "../../CommonPropsInterface";
import { ToggleButtonGroupContext } from "../../contexts";
import { classNames } from "../../utils";
import PropTypes from "prop-types";

export interface ToggleGroupProps extends CommonProps<HTMLDivElement> {
    type?: "checkbox" | "radio";
}

export default function ToggleGroup(props: ToggleGroupProps) {
    const {
        type,
        children,
        className,
        ...otherProps
    } = props;

    return (
        <ToggleButtonGroupContext.Provider value={{ type: type as string }}>
            <ButtonGroup className={
                classNames(
                    className,
                    "btn-group-toggle"
                )
            } {...otherProps}>
                {children}
            </ButtonGroup>
        </ToggleButtonGroupContext.Provider>
    );
}

ToggleGroup.propTypes = {
    type: PropTypes.oneOf(["checkbox", "radio"])
}