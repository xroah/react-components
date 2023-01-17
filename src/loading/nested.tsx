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
    const loadingProps = {
        animation,
        loading,
        variant,
        closable,
        onClose,
        size,
        onShow,
        onShown,
        onHide,
        onHidden,
        children
    }

    return (
        <div className={classes} {...restProps}>
            <Loading {...loadingProps} />
            {children}
        </div>
    )
}

export default NestedLoading