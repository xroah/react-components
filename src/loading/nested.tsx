import React, { FunctionComponent } from "react";
import { classnames } from "../commons/utils";
import Loading, { LoadingProps } from "./loading";

const NestedLoading: FunctionComponent<LoadingProps> = ({
    variant,
    closable,
    onClose,
    onShow,
    onShown,
    onHidden,
    onHide,
    size,
    loading,
    className,
    animation,
    children,
    ...restProps
}) => {
    const classes = classnames(
        className,
        "r-loading-nested"
    )

    return (
        <div className={classes} {...restProps}>
            <Loading
                loading={loading}
                variant={variant}
                closable={closable}
                onClose={onClose}
                size={size}
                onShow={onShow}
                onShown={onShow}
                onHide={onHide}
                onHidden={onHidden}
                animation={animation} />
            {children}
        </div>
    )
}

export default NestedLoading