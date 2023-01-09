import React, { FunctionComponent } from "react";
import { ClosableProps, ToggleEvents } from "../commons/types";
import Spinner, { SpinnerProps } from "../spinner";
import CloseBtn from "../commons/close-btn";
import { bool } from "prop-types";
import Fade from "../commons/Fade";

type Base = SpinnerProps & ClosableProps & ToggleEvents

export interface LoadingProps extends Base {
    loading?: boolean
}

const Loading: FunctionComponent<LoadingProps> = ({
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
    const classes = [
        className,
        "r-loading-wrapper"
    ].join(" ").trim()

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