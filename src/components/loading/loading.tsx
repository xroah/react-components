import React, { FC, ReactNode } from "react"
import { ClosableProps, ToggleEvents } from "../commons/types"
import Spinner, { SpinnerProps } from "../basics/spinner"
import CloseBtn from "../basics/close-btn"
import { bool } from "prop-types"
import Fade from "../basics/fade"
import { classnames } from "../utils"

type Base = SpinnerProps & ClosableProps & ToggleEvents

export interface LoadingProps extends Base {
    visible?: boolean
    text?: ReactNode
}

const Loading: FC<LoadingProps> = ({
    visible,
    closable,
    className,
    animation,
    variant,
    size,
    text,
    onClose,
    onShow,
    onShown,
    onHidden,
    onHide,
    ...restProps
}) => {
    const classes = classnames(className, "r-loading")

    return (
        <Fade
            in={visible}
            timeout={150}
            onEnter={onShow}
            onEntered={onShown}
            onExit={onHide}
            onExited={onHidden}
            appear
            unmountOnExit>
            <div className={classes} {...restProps}>
                <Spinner
                    variant={variant}
                    size={size}
                    animation={animation} />
                {closable ? <CloseBtn onClick={onClose} /> : null}
                {text}
            </div>
        </Fade>
    )
}

Loading.propTypes = {
    visible: bool
}

export default Loading