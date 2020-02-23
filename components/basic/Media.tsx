import * as React from "react";
import PropTypes from "prop-types";
import { classNames } from "../utils";

export interface MediaProps extends React.HTMLAttributes<HTMLElement> {
    img?: string | React.ReactNode;
    imgAlt?: string;
    imgTitle?: string;
    header?: string | React.ReactNode;
    imgSize?: number;
    imgBorder?: "rounded" | "circle";
    imgPosition?: "left" | "right";
    alignment?: "top" | "middle" | "bottom";
}

export default function Media(props: MediaProps) {
    const {
        img,
        header,
        className,
        children,
        imgSize,
        imgBorder,
        alignment,
        imgPosition,
        imgAlt,
        imgTitle,
        ...otherProps
    } = props;
    const alignmentMap: any = {
        top: "align-self-start",
        middle: "align-self-center",
        bottom: "align-self-end"
    };
    let _img = img;
    const imgClasses = classNames(
        imgBorder && (imgBorder === "rounded" ? "rounded" : "rounded-circle"),
        alignmentMap[alignment as string],
        imgPosition === "right" ? "ml-3" : "mr-3"
    );

    if (typeof img === "string") {
        _img = (
            <img
                src={img}
                alt={imgAlt}
                title={imgTitle}
                className={imgClasses}
                width={imgSize}
                height={imgSize} />
        );
    } else if (React.isValidElement(img)) {
        const {
            className,
            width,
            height
        } = img.props as any;

        _img = React.cloneElement<any>(
            img,
            {
                className: classNames(
                    className,
                    imgClasses
                ),
                alt: imgAlt,
                title: imgTitle,
                width: width == undefined ? imgSize : width,
                height: height == undefined ? imgSize : height
            }
        );
    }

    const body = (
        <div className="media-body">
            {
                header && (
                    <h5 className="mt-0 mb-1">{header}</h5>
                )
            }
            {children}
        </div>
    );

    return (
        <div
            className={classNames(className, "media")}
            {...otherProps}>
            {
                imgPosition === "right" ?
                    <>{body}{_img}</> :
                    <>{_img}{body}</>
            }
        </div>
    );
}

Media.defaultProps = {
    imgSize: 64
};
Media.propTypes = {
    img: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
    imgAlt: PropTypes.string,
    header: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
    imgSize: PropTypes.number,
    imgBorder: PropTypes.oneOf(["rounded", "circle"]),
    imgPosition: PropTypes.oneOf(["left", "right"]),
    alignment: PropTypes.oneOf(["top", "middle", "bottom"])
};