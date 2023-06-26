import React, {
    FC,
    ReactNode,
    useRef,
    useState
} from "react"
import { DivProps, Variant } from "../commons/types"
import Fade from "../basics/fade"
import { classnames, isUndef } from "../utils"
import CloseBtn from "../basics/close-btn"
import NoTransition from "../basics/no-transition"
import { bool, func, node, oneOf } from "prop-types"
import { variants } from "../commons/constants"

interface AlertProps extends DivProps {
    dismissible?: boolean
    fade?: boolean
    variant?: Variant
    visible?: boolean
    defaultVisible?: boolean
    heading?: ReactNode
    onClose?: VoidFunction
}

const Alert: FC<AlertProps> = (
    {
        variant = "primary",
        dismissible,
        fade = true,
        className,
        heading,
        visible: propVisible,
        defaultVisible = true,
        children,
        onClose,
        ...restProps
    }: AlertProps
) => {
    const PREFIX = "alert"
    const classes = classnames(
        className,
        PREFIX,
        `${PREFIX}-${variant}`,
        dismissible && `${PREFIX}-dismissible`
    )
    const nodeRef = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(defaultVisible)
    const controlled = !isUndef(propVisible)
    const finalVisible = controlled ? propVisible : visible
    const transitionProps = {
        in: finalVisible,
        unmountOnExit: true
    }
    const handleClose = () => {
        onClose?.()

        if (!controlled) {
            setVisible(false)
        }
    }
    const el = (
        <div
            ref={nodeRef}
            className={classes}
            {...restProps}>
            {heading ? <h4 className="alert-heading">{heading}</h4> : null}
            {children}
            {
                dismissible ?
                    <CloseBtn onClick={handleClose} /> : null
            }
        </div>
    )
    
    return (
        fade ? (
            <Fade nodeRef={nodeRef} {...transitionProps}>
                {el}
            </Fade>
        ) : <NoTransition {...transitionProps}>{el}</NoTransition>
    )
}

Alert.propTypes = {
    dismissible: bool,
    fade: bool,
    variant: oneOf(variants),
    visible: bool,
    defaultVisible: bool,
    heading: node,
    onClose: func
}

export default Alert