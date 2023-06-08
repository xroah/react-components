import React, { FC } from "react"
import Loading, { LoadingProps } from "./loading"
import { styled } from "styled-components"

const NestedLoading: FC<LoadingProps> = ({
    variant,
    closable,
    size,
    visible,
    animation,
    children,
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
        <div {...restProps}>
            <Loading {...loadingProps} />
            {children}
        </div>
    )
}

export default styled(NestedLoading)`
position: relative;

& .r-loading {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
}
`