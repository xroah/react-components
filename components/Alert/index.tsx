import * as React from "react"
import PropTypes from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {AnchorAttrs, WithVariantProp} from "../Commons/consts-and-types"
import Button from "../Button"
import {isUndef} from "reap-utils/lib"
import {
    Fade,
    NoTransition,
    createComponent,
    isValidNode
} from "reap-utils/lib/react"
import {getPrefixFunc} from "../Commons/utils"
import {variantPropType} from "../Commons/prop-types"

type BtnClickEvt = React.MouseEvent<HTMLButtonElement>

export interface AlertProps extends WithVariantProp<HTMLDivElement> {
    fade?: boolean
    dismissible?: boolean
    heading?: string | React.ReactNode
    onClose?: () => void
    onClosed?: () => void
}

interface AlertComponent<T> extends React.FunctionComponent<T> {
    Link: React.FunctionComponent<AnchorAttrs>
}

const Alert: AlertComponent<AlertProps> = (
    {
        className,
        variant,
        fade,
        dismissible,
        children,
        heading,
        onClose,
        onClosed,
        ...restProps
    }
) => {
    const prefix = getPrefixFunc("alert")
    const classes = classNames(
        className,
        prefix(),
        variant && prefix(variant),
        dismissible && prefix("dismissible")
    )
    const getElement = (closeBtn?: React.ReactNode) => {
        const props = {...restProps}

        return (
            <div
                className={classes}
                {...props}>
                {
                    !isUndef(heading) && isValidNode(heading) && (
                        <h4 className={prefix("heading")}>
                            {heading}
                        </h4>
                    )
                }
                {children}
                {closeBtn}
            </div>
        )
    }

    if (!dismissible) {
        return getElement()
    }

    const [visible, updateVisible] = React.useState(true)
    const handleClick = () => updateVisible(false)
    const closeBtn = (
        <Button
            variant="link"
            type="button"
            className="btn-close"
            onClick={handleClick} />
    )

    const transitionProps = {
        in: visible,
        unmountOnExit: true,
        onExit: onClose,
        onExited: onClosed,
        children: getElement(closeBtn)
    }

    return fade ?
        <Fade {...transitionProps} /> :
        <NoTransition {...transitionProps} />
}

Alert.propTypes = {
    variant: variantPropType,
    fade: PropTypes.bool,
    heading: PropTypes.node,
    dismissible: PropTypes.bool,
    onClose: PropTypes.func,
    onClosed: PropTypes.func
}
Alert.defaultProps = {
    fade: true
}

Alert.Link = createComponent({
    tag: "a",
    displayName: "AlertLink",
    className: "alert-link"
})

export default Alert