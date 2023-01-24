import React, { FunctionComponent } from "react"
import { breakpoints, offCanvasPlacements } from "../commons/constants"
import { LayerProps, OneOf } from "../commons/types"
import { Transition, TransitionStatus } from "react-transition-group"
import CloseBtn from "../basics/close-btn"
import { classnames } from "../utils"
import Backdrop from "../basics/backdrop"
import { layerCommonPropTypes } from "../commons/prop-types"
import { bool, node, oneOf } from "prop-types"
import { useZIndex } from "r-layers/hooks"
import bodyStyleStack from "r-layers/utils/body-style-stack"

interface OffCanvasProps extends LayerProps {
    header?: React.ReactNode
    placement?: OneOf<typeof offCanvasPlacements>
    scroll?: boolean
    breakpoint?: OneOf<typeof breakpoints>
}

const OffCanvas: FunctionComponent<OffCanvasProps> = ({
    closable = true,
    placement = "bottom",
    backdrop = true,
    keyboard = true,
    scroll = false,
    className,
    header,
    title,
    visible,
    children,
    style,
    breakpoint,
    onClose,
    onShow,
    onShown,
    onHide,
    onHidden,
    ...restProps
}) => {
    const PREFIX = "offcanvas"
    const handleClickClose = () => onClose?.("close")
    const [zIndex] = useZIndex()
    const nodeRef = React.useRef<HTMLDivElement>(null)
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

    if (keyboard) {
        const origOnKeyDown = restProps.onKeyDown
        restProps.onKeyDown = (
            ev: React.KeyboardEvent<HTMLDivElement>
        ) => {
            if (ev.key.toLocaleLowerCase() === "escape") {
                onClose?.("keyboard")
            }

            origOnKeyDown?.(ev)
        }
    }

    const render = (state: TransitionStatus) => {
        const classes = classnames(
            PREFIX,
            `${PREFIX}-${placement}`,
            breakpoint && `${PREFIX}-${breakpoint}`,
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
                ref={nodeRef}
                tabIndex={-1}
                {...restProps}>
                {_header}
                <div className={PREFIX + "-body"}>
                    {children}
                </div>
            </div>
        )
    }
    const handleClickBackdrop = () => {
        if (backdrop !== "static") {
            onClose?.("backdrop")
        }
    }
    const _backdrop = (
        backdrop ? (
            <Backdrop
                visible={!!visible}
                zIndex={zIndex}
                onClick={handleClickBackdrop} />
        ) : null
    )
    const handleEnter = () => {
        onShow?.()

        if (!scroll) {
            bodyStyleStack.push()
        }
    }
    const handleEntered = () => {
        nodeRef?.current?.focus()

        onShown?.()
    }
    const handleExited = () => {
        onHidden?.()

        if (!scroll) {
            bodyStyleStack.pop()
        }
    }

    return (
        <>
            <Transition
                in={visible}
                timeout={300}
                nodeRef={nodeRef}
                onEnter={handleEnter}
                onEntered={handleEntered}
                onExit={onHide}
                onExited={handleExited}>
                {render}
            </Transition>
            {_backdrop}
        </>
    )
}

OffCanvas.propTypes = {
    ...layerCommonPropTypes,
    header: node,
    scroll: bool,
    breakpoint: oneOf(breakpoints)
}

export default OffCanvas