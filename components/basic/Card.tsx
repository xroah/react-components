import * as React from "react";
import PropTypes from "prop-types";
import {
    createComponentByClass,
    classNames,
    variantType,
    variantArray
} from "../utils";
import CardTitle, {colorType, color} from "./CardTitle";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    header?: React.ReactNode;
    footer?: React.ReactNode;
    headerStyle?: React.CSSProperties;
    bodyStyle?: React.CSSProperties;
    footerStyle?: React.CSSProperties;
    img?: React.ReactElement | string;
    imgPosition?: "top" | "bottom";
    isImgOverlay?: boolean;
    align?: "left" | "center" | "right";
    bg?: variantType;
    border?: variantType;
    color?: colorType;
}

export default function Card(props: CardProps) {
    const {
        header,
        footer,
        img,
        imgPosition,
        className,
        children,
        isImgOverlay,
        align,
        bg,
        color,
        border,
        headerStyle,
        bodyStyle,
        footerStyle,
        ...otherProps
    } = props;

    let topImg;
    let bottomImg;

    if (img) {
        let _img: React.ReactElement;
        let cls = `card-img-${imgPosition}`;

        if (React.isValidElement(img)) {
            _img = React.cloneElement(
                img,
                {
                    className: cls
                }
            );
        } else {
            _img = (
                <img
                    className={cls}
                    src={img} />
            );
        }

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
                    <div style={headerStyle} className="card-header">{header}</div>
                )
            }
            {topImg}
            <div
                style={bodyStyle}
                className={isImgOverlay && !!img ? "card-img-overlay" : "card-body"}>
                {children}
            </div>
            {bottomImg}
            {
                footer && (
                    <div style={footerStyle} className="card-footer">{footer}</div>
                )
            }
        </div>
    );
}

Card.propTypes = {
    header: PropTypes.node,
    footer: PropTypes.node,
    headerStyle: PropTypes.object,
    bodyStyle: PropTypes.object,
    footerStyle: PropTypes.object,
    img: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    imgPosition: PropTypes.oneOf(["top", "bottom"]),
    isImgOverlay: PropTypes.bool,
    align: PropTypes.oneOf(["left", "center", "right"]),
    bg: PropTypes.oneOf(variantArray),
    border: PropTypes.oneOf(variantArray, ),
    color: PropTypes.oneOf(color),
};

Card.defaultProps = {
    imgPosition: "top",
    isImgOverlay: false
};

Card.Title = CardTitle;
Card.Text = createComponentByClass({
    className: "card-text",
    tag: "p",
    displayName: "CardText"
});
Card.Link = createComponentByClass({
    className: "card-link",
    tag: "a",
    displayName: "CardLink"
});
Card.Deck = createComponentByClass({
    className: "card-deck",
    displayName: "CardDeck"
});
Card.Column = createComponentByClass({
    className: "card-column",
    displayName: "CardColumn"
});