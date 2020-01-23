import * as React from "react";
import PropTypes from "prop-types";
import { variantType, classNames, variantArray } from "../utils";

export type colorType = variantType | "white" | "muted" | "white-50" | "black-50";

export interface CardTitleProps extends React.HTMLAttributes<HTMLDivElement> {
    subtitle?: string;
    subTitleColor?: colorType;
    color: colorType;
}

export default function CardTitle(props: CardTitleProps) {
    const {
        subtitle,
        children,
        className,
        subTitleColor,
        color,
        ...otherProps
    } = props;

    return (
        <div className={classNames(
            className,
            "card-title-wrapper"
        )} {...otherProps}>
            <div className={
                classNames(
                    "card-title",
                    color && `text-${color}`
                )
            }>{children}</div>
            {
                subtitle != undefined && (
                    <div className={`card-subtitle mb-2 text-${subTitleColor}`}>
                        {subtitle}
                    </div>
                )
            }
        </div>
    );
}

export const color = [...variantArray, "white", "muted", "white-50", "black-50"];

CardTitle.propTypes = {
    color: PropTypes.oneOf(color),
    subtitle: PropTypes.string,
    subTitleColor: PropTypes.oneOf(color)
};
CardTitle.defaultProps = {
    subTitleColor: "muted"
};