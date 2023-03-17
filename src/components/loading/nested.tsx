import React, { FC } from "react"
import { classnames } from "../utils"
import Loading, { LoadingProps } from "./loading"

const NestedLoading: FC<LoadingProps> = ({
    variant,
    closable,
    size,
    visible,
    className,
    animation,
    children,
    onClose,
    onShow,
    onShown,
    onHidden,
    onHide,
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
        size,
        children,
        onClose,
        onShow,
        onShown,
        onHide,
        onHidden
    }

    return (
        <div className={classes} {...restProps}>
            <Loading {...loadingProps} />
            {children}
        </div>
    )
}

export default NestedLoading