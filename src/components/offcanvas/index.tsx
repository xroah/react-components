import React, { FC, useRef } from "react"
import { breakpoints, offCanvasPlacements } from "../commons/constants"
import { LayerProps, OneOf } from "../commons/types"
import { Transition, TransitionStatus } from "react-transition-group"
import CloseBtn from "../basics/close-btn"
import { classnames } from "../utils"
import Backdrop from "../basics/backdrop"
import { layerCommonPropTypes } from "../commons/prop-types"
import { bool, node, oneOf } from "prop-types"
import { useActive, useKeyboardClose } from "../hooks"
import bodyStyleStack from "../utils/body-style-stack"
import { getNullableNode } from "../utils/react"

interface OffCanvasProps extends LayerProps {
    header?: React.ReactNode
    placement?: OneOf<typeof offCanvasPlacements>
    scroll?: boolean
    breakpoint?: OneOf<typeof breakpoints>
}

const OffCanvas: FC<OffCanvasProps> = ({
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
    breakpoint,
    onClose,
    onShow,
    onShown,
    onHide,
    onHidden,
    onKeyDown,
    ...restProps
}) => {
    const PREFIX = "offcanvas"
    const handleClickClose = () => onClose?.("close")
    const nodeRef = useRef<HTMLDivElement>(null)
    const [setActive, focus] = useActive()
    const handleKeyDown = useKeyboardClose({
        onClose,
        keyboard,
        onKeyDown
    })
    const handleClickBackdrop = () => {
        if (backdrop !== "static") {
            onClose?.("backdrop")
        }
    }
    const _backdrop = (
        backdrop ? (
            <Backdrop
                visible={!!visible}
                className="offcanvas-backdrop"
                onClick={handleClickBackdrop} />
        ) : null
    )
    const handleEnter = () => {
        setActive()
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
        focus()
        onHidden?.()
        
        if (!scroll) {
            bodyStyleStack.pop()
        }
    }
    let _header = getNullableNode(header)

    if (_header === false) {
        _header = (
            <div className={PREFIX + "-header"}>
                <h5 className={PREFIX + "-title"}>
                    {title}
                </h5>
                {closable && <CloseBtn onClick={handleClickClose} />}
            </div>
        )
    }

    const render = (state: TransitionStatus) => {
        const classes = classnames(
            className,
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
                ref={nodeRef}
                tabIndex={-1}
                onKeyDown={handleKeyDown}
                {...restProps}>
                {_header}
                <div className={PREFIX + "-body"}>
                    {children}
                </div>
            </div>
        )
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