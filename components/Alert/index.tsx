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
import omit from "reap-utils/lib/omit"

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: Variant
    fade?: boolean
    dismissible?: boolean
    visible?: boolean
    heading?: string | React.ReactNode
    onClose?: Function
    onClosed?: Function
    onCloseButtonClick?: Function
}

export default function Alert(props: AlertProps) {
    const {
        className,
        variant,
        fade,
        dismissible,
        children,
        heading,
        onClose,
        onClosed,
        onCloseButtonClick,
        ...restProps
    } = props
    const PREFIX = "alert"
    const classes = classNames(
        className,
        PREFIX,
        variant && `${PREFIX}-${variant}`,
        dismissible && `${PREFIX}-dismissible`
    )
    const controlled = "visible" in restProps
    const [_visible, updateVisible] = React.useState(true)
    const handleClick = () => {
        handleFuncProp(onCloseButtonClick)()

        if (controlled) {
            return
        }

        updateVisible(!_visible)
    }
    const handleExited = () => {
        handleFuncProp(onClosed)()
    }
    const handleExit = () => {
        //toggle visible, invoke onClose callback
        handleFuncProp(onClose)()
    }
    let closeBtn: React.ReactNode

    if (dismissible) {
        closeBtn = (
            <Button
                variant="link"
                type="button"
                className="btn-close"
                onClick={handleClick} />
        )
    }

    const getElement = (closeBtn?: React.ReactNode) => {
        const props = {...restProps}

        omit(props, ["visible"])

        return (
            <div className={classes} {...props}>
                {
                    !isUndef(heading) && (
                        <h4 className={`${PREFIX}-heading`}>{heading}</h4>
                    )
                }
                {children}
                {closeBtn}
            </div>
        )
    }

    if (!controlled && !dismissible) {
        return getElement()
    }

    const transitionProps = {
        in: controlled ? !!restProps.visible : _visible,
        unmountOnExit: true,
        onExit: handleExit,
        onExited: handleExited
    }
    const element = getElement(closeBtn)

    return (
        fade ?
            <Fade {...transitionProps}>{element}</Fade> :
            <NoTransition {...transitionProps}>{element}</NoTransition>
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
    fade: true
}

Alert.Link = function (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    return <a {...props} />
}