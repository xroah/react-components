import * as React from "react";
import PropTypes from "prop-types";
import { classNames } from "../utils";

export interface MediaProps extends React.HTMLAttributes<HTMLElement> {
    img?: string | React.ReactNode;
    header?: string | React.ReactNode;
    imgSize?: number;
    imgRounded?: boolean;
    imgCircle?: boolean;
    alignment?: "top" | "center" | "bottom";
    imgPosition?: "right";
}

export default function Media(props: MediaProps) {
    const {
        img,
        header,
        className,
        children,
        imgSize,
        imgRounded,
        imgCircle,
        alignment,
        imgPosition,
        ...otherProps
    } = props;
    const alignmentMap: any = {
        top: "align-self-start",
        center: "align-self-center",
        bottom: "align-self-end"
    };
    let _img = img;
    let _header = header;
    let leftImg: any;
    let rightImg: any;

    if (img && typeof img === "string") {
        const imgClasses = classNames(
            imgCircle && "rounded-circle",
            imgRounded && "rounded",
            alignmentMap[alignment as string],
            imgPosition === "right" ? "ml-3" : "mr-3"
        );
        _img = (
            <img
                src={img}
                className={imgClasses}
                width={imgSize}
                height={imgSize} />
        );
    }

    if (imgPosition === "right") {
        rightImg = _img;
    } else {
        leftImg = _img;
    }

    if (header && typeof header === "string") {
        _header = <h5 className="mt-0">{header}</h5>;
    }

    return (
        <div
            className={classNames(className, "media")}
            {...otherProps}>
            {leftImg}
            <div className="media-body">
                {_header}
                {children}
            </div>
            {rightImg}
        </div>
    );
}

Media.defaultProps = {
    imgSize: 60
};
Media.propTypes = {
    img: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
    header:PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
    imgSize: PropTypes.number,
    imgRounded: PropTypes.bool,
    imgCircle: PropTypes.bool,
    alignment: PropTypes.oneOf(["top", "center", "bottom"]),
    imgPosition: PropTypes.oneOf(["right"])
};