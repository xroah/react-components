import * as React from "react"
import handleFuncProp from "reap-utils/lib/react/handle-func-prop"
import {PopupContext} from "./contexts"

export default (props: any) => {
    const {
        arrowPos,
        placement,
        children,
        elRef
    } = props
    const handleMouseEvent = (evt: React.MouseEvent<HTMLElement>) => {
        const {
            onMouseLeave,
            onMouseEnter
        } = props

        handleFuncProp(
            evt.type === "mouseenter" ? onMouseEnter : onMouseLeave
        )(evt)
    }
    const context: any = {
        arrowLeft: arrowPos.left,
        arrowTop: arrowPos.top,
        placement
    }
    const mouseEvent: any = {
        onMouseEnter: handleMouseEvent,
        onMouseLeave: handleMouseEvent
    }

    return (
        <div
            className="reap-popup-body"
            ref={elRef}
            style={{overflow: "hidden"}}
            {...mouseEvent}>
            <PopupContext.Provider value={context}>
                {children}
            </PopupContext.Provider>
        </div>
    )
}