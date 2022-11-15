import React, { FunctionComponent } from "react"
import classNames from "classnames"
import { OffCanvasPlacements } from "../commons/constants"
import { DivProps, OneOf, ToggleEvents } from "../commons/types"
import { Transition, TransitionStatus } from "react-transition-group"
import { CloseType } from "../modal/types"
import CloseBtn from "../commons/close-btn"
import { getZIndex } from "../commons/utils"
import Backdrop from "../commons/backdrop"

interface OffCanvasProps extends DivProps, ToggleEvents {
    visible?: boolean
    closable?: boolean
    onClose?: (type?: CloseType) => unknown
    header?: React.ReactNode
    title?: string
    placement?: OneOf<typeof OffCanvasPlacements>
    backdrop?: boolean | "static"
    scroll?: boolean
    keyboard?: boolean
}

const OffCanvas: FunctionComponent<OffCanvasProps> = ({
    className,
    closable = true,
    header,
    title,
    placement = "bottom",
    backdrop = true,
    scroll,
    keyboard = true,
    visible,
    onClose,
    children,
    style,
    ...restProps
}) => {
    const PREFIX = "offcanvas"
    const handleClickClose = () => onClose?.("close")
    const [zIndex] = React.useState(getZIndex())
    const _header = (
        header === null ? null :
            header ? header : (
                <div className={PREFIX + "-header"}>
                    <div className={PREFIX + "-title"}>
                        {title}
                    </div>
                    <CloseBtn onClick={handleClickClose} />
                </div>
            )
    )
    const render = (state: TransitionStatus) => {
        const classes = classNames(
            PREFIX,
            `${PREFIX}-${placement}`,
            state === "entering" && "showing",
            (state === "entered" || state === "exiting") && "show",
            state === "exiting" && "hiding"
        )

        return (
            <div
                className={classes}
                style={{
                    ...style,
                    zIndex: zIndex + 1
                }}
                {...restProps}>
                {_header}
                <div className={PREFIX + "body"}>
                    {children}
                </div>
            </div>
        )
    }
    const _backdrop = (
        backdrop ? (
            <Backdrop
                visible={!!visible}
                zIndex={zIndex} />
        ) : null
    )

    return (
        <>
            <Transition
                in={visible}
                timeout={300}>
                {render}
            </Transition>
            {_backdrop}
        </>
    )
}

export default OffCanvas