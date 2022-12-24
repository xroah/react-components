import React, { FunctionComponent } from "react"
import classNames from "classnames"
import { breakpoints, offCanvasPlacements } from "../commons/constants"
import { LayerProps, OneOf } from "../commons/types"
import { Transition, TransitionStatus } from "react-transition-group"
import CloseBtn from "../commons/close-btn"
import { getZIndex } from "../commons/utils"
import Backdrop from "../commons/backdrop"
import { layerCommonPropTypes } from "../commons/prop-types"
import { bool, node, oneOf } from "prop-types"

interface OffCanvasProps extends LayerProps {
    header?: React.ReactNode
    placement?: OneOf<typeof offCanvasPlacements>
    scroll?: boolean
    breakpoint?: OneOf<typeof breakpoints>
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
    onKeyDown,
    breakpoint,
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
                onClick={handleClickBackdrop}/>
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

OffCanvas.propTypes = {
    ...layerCommonPropTypes,
    header: node,
    scroll: bool,
    breakpoint: oneOf(breakpoints)
}

export default OffCanvas