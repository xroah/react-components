import React, { FC, ReactNode, useMemo, useRef, useState } from "react"
import { DivProps, Variant } from "../commons/types"
import Fade from "../basics/fade"
import { classnames } from "../utils"
import CloseBtn from "r-components/basics/close-btn"
import NoTransition from "r-components/basics/no-transition"

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
    const controlled = "visible" in restProps
    const finalVisible = useMemo(
        () => {
            let v: boolean

            if (controlled) {
                v = !!restProps.visible
            } else {
                v = visible
            }

            return v
        },
        [restProps, controlled, visible]
    )

    delete restProps.visible

    const transitionProps = {
        in: finalVisible,
        unmountOnExit: true
    }
    const handleClose = () => {
        onClose?.()

        if (!controlled) {
            setVisible(() => false)
        }
    }
    const el = (
        <div
            ref={nodeRef}
            className={classes}
            {...restProps}>
            {
                heading ?
                    <h4 className="alert-heading">{heading}</h4> : null
            }
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

export default Alert