import * as React from "react"
import PropTypes from "prop-types"
import handleFuncProp from "reap-utils/lib/react/handle-func-prop"
import classNames from "reap-utils/lib/class-names"
import {CommonProps} from "../Commons/CommonPropsInterface"
import {Variant, Variants} from "../Commons/Variants"
import Button from "../Button"
import isUndef from "reap-utils/lib/is-undef"
import Fade from "../Commons/Fade"
import NoTransition from "../Commons/NoTransition"

export interface AlertProps extends CommonProps<HTMLDivElement> {
    variant?: Variant
    fade?: boolean
    dismissible?: boolean
    visible?: boolean
    heading?: string | React.ReactNode
    onClose?: Function
    onClosed?: Function
}

export default function Alert(props: AlertProps) {
    const {
        className,
        variant,
        fade,
        dismissible,
        visible,
        children,
        heading,
        onClose,
        onClosed,
        ...otherProps
    } = props
    const PREFIX = "alert"
    const classes = classNames(
        className,
        PREFIX,
        variant && `${PREFIX}-${variant}`,
        dismissible && `${PREFIX}-dismissible`
    )
    const handleClick = () => {
        handleFuncProp(onClose)()
    }
    const handleExited = () => {
        handleFuncProp(onClosed)()
    }
    const handleExit = () => {
        //toggle visible, invoke onClose callback
        if (!dismissible) {
            handleClick()
        }
    }
    let button: React.ReactNode

    if (dismissible) {
        button = (
            <Button
                variant="link"
                type="button"
                className="btn-close"
                onClick={handleClick} />
        )
    }

    const child = (
        <div className={classes} {...otherProps}>
            {
                !isUndef(heading) && (
                    <h4 className={`${PREFIX}-heading`}>{heading}</h4>
                )
            }
            {children}
            {button}
        </div>
    )
    const transitionProps = {
        in: !!visible,
        unmountOnExit: true,
        onExit: handleExit,
        onExited: handleExited
    }

    return (
        fade ?
            <Fade {...transitionProps}>{child}</Fade> :
            <NoTransition {...transitionProps}>{child}</NoTransition>
    )
}

Alert.propTypes = {
    variant: PropTypes.oneOf(Variants),
    fade: PropTypes.bool,
    heading: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    dismissible: PropTypes.bool,
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onClosed: PropTypes.func
}
Alert.defaultProps = {
    dismissible: false,
    fade: true,
    visible: true
}

Alert.Link = function (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    return <a {...props} />
}