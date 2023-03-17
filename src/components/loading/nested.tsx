import React, { FC } from "react"
import { classnames } from "../utils"
import Loading, { LoadingProps } from "./loading"

const NestedLoading: FC<LoadingProps> = ({
    variant,
    closable,
    onClose,
    onShow,
    onShown,
    onHidden,
    onHide,
    size,
    visible,
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
        visible,
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