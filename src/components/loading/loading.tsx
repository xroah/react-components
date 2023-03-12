import React, { FC } from "react"
import { ClosableProps, ToggleEvents } from "../commons/types"
import Spinner, { SpinnerProps } from "../basics/spinner"
import CloseBtn from "../basics/close-btn"
import { bool } from "prop-types"
import Fade from "../basics/fade"
import { classnames } from "../utils"

type Base = SpinnerProps & ClosableProps & ToggleEvents

export interface LoadingProps extends Base {
    loading?: boolean
}

const Loading: FC<LoadingProps> = ({
    loading,
    closable,
    className,
    animation,
    variant,
    size,
    onClose,
    onShow,
    onShown,
    onHidden,
    onHide,
    ...restProps
}) => {
    const classes = classnames(
        className,
        "r-loading-wrapper"
    )

    return (
        <Fade
            in={loading}
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
            </div>
        </Fade>
    )
}

Loading.propTypes = {
    loading: bool
}

export default Loading