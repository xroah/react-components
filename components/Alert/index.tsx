import * as React from "react"
import PropTypes from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {Variant, variants} from "../Commons/consts-and-types"
import Button from "../Button"
import isUndef from "reap-utils/lib/is-undef"
import Fade from "../Commons/Fade"
import NoTransition from "../Commons/NoTransition"
import omit from "reap-utils/lib/omit"
import handleFuncProp from "reap-utils/lib/react/handle-func-prop"
import {getPrefixFunc} from "../Commons/utils"

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: Variant
    fade?: boolean
    dismissible?: boolean
    visible?: boolean
    heading?: string | React.ReactNode
    onClose?: Function
    onClosed?: Function
    onCloseButtonClick?: (evt: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Alert(
    {
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
    }: AlertProps
) {
    const prefix = getPrefixFunc("alert")
    const classes = classNames(
        className,
        prefix(),
        variant && prefix(variant),
        dismissible && prefix("dismissible")
    )
    const controlled = "visible" in restProps
    const [_visible, updateVisible] = React.useState(true)
    const handleClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
        if (!controlled) {
            updateVisible(!_visible)
        }

        if (typeof onCloseButtonClick === "function") {
            onCloseButtonClick(evt)
        }
    }
    const handleExited = () => {
        handleFuncProp(onClosed)()
    }
    const handleExit = () => {
        handleFuncProp(onClose)()
    }
    const getElement = (closeBtn?: React.ReactNode) => {
        const props = {...restProps}

        return (
            <div className={classes} {...omit(props, "visible")}>
                {
                    !isUndef(heading) && (
                        <h4 className={prefix("heading")}>{heading}</h4>
                    )
                }
                {children}
                {closeBtn}
            </div>
        )
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

    if (!controlled && !dismissible) {
        return getElement()
    }

    const transitionProps = {
        in: controlled ? !!restProps.visible : _visible,
        unmountOnExit: true,
        onExit: handleExit,
        onExited: handleExited,
        children: getElement(closeBtn)
    }

    return React.createElement(
        fade ? Fade : NoTransition,
        transitionProps
    )
}

Alert.propTypes = {
    variant: PropTypes.oneOf(variants),
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