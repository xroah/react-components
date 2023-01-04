import React, { FunctionComponent } from "react";
import { ClosableProps, ToggleEvents } from "../commons/types";
import Spinner, { SpinnerProps } from "../spinner";
import { Transition, TransitionStatus } from "react-transition-group";
import CloseBtn from "../commons/close-btn";
import classNames from "classnames";
import { bool } from "prop-types";

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
    const render = (state: TransitionStatus) => {
        const show = state === "entering" || state === "entered"
        const classes = classNames(
            className,
            "r-loading-wrapper",
            "fade",
            show && "show"
        )

        return (
            <div className={classes} {...restProps}>
                <Spinner
                    variant={variant}
                    size={size}
                    animation={animation} />
                {closable ? <CloseBtn onClick={onClose} /> : null}
            </div>
        )
    }

    return (
        <Transition
            in={loading}
            timeout={150}
            onEnter={onShow}
            onEntered={onShown}
            onExit={onHide}
            onExited={onHidden}
            appear
            unmountOnExit>
            {render}
        </Transition>
    )
}

Loading.propTypes = {
    loading: bool
}

export default Loading