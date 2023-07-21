import React, { FC } from "react"
import Loading, { LoadingProps } from "./loading"
import { classnames } from "../utils"

const NestedLoading: FC<LoadingProps> = ({
    variant,
    closable,
    size,
    visible,
    animation,
    children,
    className,
    onClose,
    onShow,
    onShown,
    onHidden,
    onHide,
    ...restProps
}) => {
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
        <div
            className={classnames(className, "r-loading-nested")}
            {...restProps}>
            <Loading {...loadingProps} />
            {children}
        </div>
    )
}

export default NestedLoading