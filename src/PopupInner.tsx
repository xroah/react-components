import * as React from "react"
import omit from "reap-utils/lib/omit"

const PopupInner = React.forwardRef(
    (props: any, ref: React.ForwardedRef<HTMLDivElement>) => {
        const {
            placement,
            children,
            elRef,
            style,
            ...otherProps
        } = props

        return (
            <div
                className="reap-popup"
                ref={ref}
                style={{
                    ...style,
                    position: "absolute",
                    willChange: "transform"
                }}
                {...omit(otherProps, [
                    "onClickOutside",
                    "onShow",
                    "onShown",
                    "onHidden",
                    "onHide",
                    "onAlign"
                ])}>
                <div
                    className="reap-popup-body"
                    ref={elRef}
                    style={{overflow: "hidden"}}>
                    {children}
                </div>
            </div>
        )
    }
)

PopupInner.displayName = "PopupInner"

export default PopupInner