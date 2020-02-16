import * as React from "react";
import PropTypes from "prop-types";
import { classNames } from "../utils";

export interface MediaProps extends React.HTMLAttributes<HTMLElement> {
    img?: string | React.ReactNode;
    alt?: string;
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
        alt,
        ...otherProps
    } = props;
    const alignmentMap: any = {
        top: "align-self-start",
        center: "align-self-center",
        bottom: "align-self-end"
    };
    let _img = img;
    const imgClasses = classNames(
        imgCircle && "rounded-circle",
        imgRounded && "rounded",
        alignmentMap[alignment as string],
        imgPosition === "right" ? "ml-3" : "mr-3"
    );

    if (typeof img === "string") {
        _img = (
            <img
                src={img}
                alt={alt}
                className={imgClasses}
                width={imgSize}
                height={imgSize} />
        );
    } else if (React.isValidElement(img)) {
        _img = React.cloneElement<any>(
            img,
            {
                className: classNames(
                    (img.props as any).className,
                    imgClasses
                ),
                alt,
                width: imgSize,
                height: imgSize
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
    header: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
    imgSize: PropTypes.number,
    imgRounded: PropTypes.bool,
    imgCircle: PropTypes.bool,
    alignment: PropTypes.oneOf(["top", "center", "bottom"]),
    imgPosition: PropTypes.oneOf(["right"])
};