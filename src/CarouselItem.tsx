import * as React from "react";
import PropTypes from "prop-types";
import {classNames} from "./utils";

export interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
    caption?: React.ReactNode;
}

export default function CarouselItem(props: ItemProps) {
    const {
        caption,
        className,
        children,
        ...otherProps
    } = props;

    return (
        <div className={
            classNames(
                className,
                "carousel-item"
            )
        } {...otherProps}>
            {children}
            {
                caption && (
                    <div className="carousel-caption">
                        {caption}
                    </div>
                )
            }
        </div>
    );
}

CarouselItem.propTypes = {
    caption: PropTypes.node
};