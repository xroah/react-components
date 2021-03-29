import * as React from "react"
import handleFuncProp from "reap-utils/lib/react/handle-func-prop"
import {PopupContext} from "./contexts"

export default (props: any) => {
    const {
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

    return (
        <div
            className="reap-popup-body"
            ref={elRef}
            style={{overflow: "hidden"}}
            onMouseEnter={handleMouseEvent}
            onMouseLeave={handleMouseEvent}>
            <PopupContext.Provider value={{placement}}>
                {children}
            </PopupContext.Provider>
        </div>
    )
}