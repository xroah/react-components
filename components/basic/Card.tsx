import * as React from "react";
import PropTypes from "prop-types";
import {
    createComponentByClass,
    classNames,
    variantType,
    variantArray
} from "../utils";
import CardTitle, { colorType, color } from "./CardTitle";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    header?: React.ReactNode;
    footer?: React.ReactNode;
    headerStyle?: React.CSSProperties;
    footerStyle?: React.CSSProperties;
    body?: boolean;
    img?: React.ReactElement | string;
    imgAlt?: string;
    imgPosition?: "top" | "bottom";
    isImgOverlay?: boolean;
    alignment?: "left" | "center" | "right";
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
        imgAlt,
        alignment,
        bg,
        color,
        border,
        headerStyle,
        body,
        footerStyle,
        ...otherProps
    } = props;

    let topImg;
    let bottomImg;

    if (img) {
        let _img: React.ReactElement;
        let cls = `card-img-${imgPosition}`;

        if (React.isValidElement(img)) {
            _img = React.cloneElement<any>(
                img,
                {
                    className: classNames((img.props as any).className, cls),
                    alt: imgAlt
                }
            );
        } else {
            _img = (
                <img
                    className={cls}
                    src={img as string}
                    alt={imgAlt} />
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
                alignment && `text-${alignment}`,
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
            {isImgOverlay && !!img ? (
                <div className="card-img-overlay">
                    {children}
                </div>
            ) : body ? (
                <Card.Body>
                    {children}
                </Card.Body>
            ) : children}
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
    footerStyle: PropTypes.object,
    body: PropTypes.bool,
    img: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    imgAlt: PropTypes.string,
    imgPosition: PropTypes.oneOf(["top", "bottom"]),
    isImgOverlay: PropTypes.bool,
    align: PropTypes.oneOf(["left", "center", "right"]),
    bg: PropTypes.oneOf(variantArray),
    border: PropTypes.oneOf(variantArray),
    color: PropTypes.oneOf(color),
};

Card.defaultProps = {
    imgPosition: "top",
    isImgOverlay: false,
    body: false
};

Card.Title = CardTitle;
Card.Body = createComponentByClass({
    className: "card-body",
    displayName: "CardBody"
});
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
Card.Group = createComponentByClass({
    className: "card-group",
    displayName: "CardGroup"
});