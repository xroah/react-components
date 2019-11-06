import * as React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { createComponentByClass } from "./utils";

type bgType = "primary" |
    "secondary" |
    "success" |
    "danger" |
    "warning" |
    "info" |
    "dark" |
    "light";

type colorType = bgType | "white" | "muted";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    header?: React.ReactNode;
    footer?: React.ReactNode;
    title?: string;
    subtitle?: string;
    img?: React.ReactElement;
    imgPosition?: "top" | "bottom";
    isImgOverlay?: boolean;
    align?: "left" | "center" | "right";
    bg?: bgType;
    border?: bgType;
    color?: colorType;
    headerClass?: string;
    bodyClass?: string;
    footerClass?: string;
}

export default function Card(props: CardProps) {
    const {
        header,
        footer,
        title,
        subtitle,
        img,
        imgPosition,
        className,
        children,
        isImgOverlay,
        align,
        bg,
        color,
        border,
        headerClass,
        bodyClass,
        footerClass,
        ...otherProps
    } = props;

    let topImg;
    let bottomImg;

    if (img) {
        let _img = React.cloneElement(
            img,
            {
                className: `card-img-${imgPosition}`
            }
        );

        if (imgPosition === "top") {
            topImg = _img;
        } else {
            bottomImg = _img;
        }
    }

    return (
        <div className={
            classNames(
                className,
                "card",
                align && `text-${align}`,
                bg && `bg-${bg}`,
                border && `border-${border}`,
                color && `text-${color}`
            )
        } {...otherProps}>
            {
                header && (
                    <div className={
                        classNames(
                            headerClass,
                            "card-header"
                        )
                    }>{header}</div>
                )
            }
            {topImg}
            <div className={
                classNames(
                    bodyClass,
                    isImgOverlay && !!img ? "card-img-overlay" : "card-body"
                    )
            }>
                {
                    title && (
                        <h5 className="card-title">{title}</h5>
                    )
                }
                {
                    subtitle && (
                        <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
                    )
                }
                {children}
            </div>
            {bottomImg}
            {
                footer && (
                    <div className={
                        classNames(
                            footerClass,
                            "card-footer"
                        )
                    }>{footer}</div>
                )
            }
        </div>
    );
}

const bg = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "dark",
    "light"
];

const color = [...bg, "white", "muted"];

Card.propTypes = {
    header: PropTypes.node,
    footer: PropTypes.node,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    img: PropTypes.element,
    imgPosition: PropTypes.oneOf(["top", "bottom"]),
    isImgOverlay: PropTypes.bool,
    align: PropTypes.oneOf(["left", "center", "right"]),
    bg: PropTypes.oneOf(bg),
    border: PropTypes.oneOf(bg),
    color: PropTypes.oneOf(color),
    subtitleColor: PropTypes.oneOf(color),
    headerClass: PropTypes.string,
    bodyClass: PropTypes.string,
    footerClass: PropTypes.string
};

Card.defaultProps = {
    imgPosition: "top",
    isImgOverlay: false,
    subtitleColor: "muted"
};

Card.Deck = createComponentByClass({
    className: "card-deck",
    displayName: "CardDeck"
});

Card.Column = createComponentByClass({
    className: "card-column",
    displayName: "CardColumn"
});