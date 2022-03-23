import * as React from "react"
import {
    getNextNodeByRef,
    only,
    Placeholder
} from "reap-utils/lib/react"
import {
    AnimProps,
    DivProps,
    Placement,
    Trigger
} from "../Commons/common-types"
import {
    computePosition,
    flip,
    shift
} from "@floating-ui/dom"

interface PopupProps extends DivProps, AnimProps {
    nodeRef?: React.RefObject<HTMLElement>
    placement?: Placement
    trigger?: Trigger
    visible?: boolean
    children: React.ReactElement
    container?: string | HTMLElement | Node
    targetRef?: React.RefObject<HTMLElement>
}

const Popup: React.FC<PopupProps> = (
    {
        nodeRef,
        placement,
        animation,
        children,
        trigger,
        onClick,
        onFocus,
        onBlur,
        onMouseEnter,
        onMouseLeave,
        container,
        visible,
        targetRef,
        style = {},
        ...restProps
    }
) => {
    const child = only(children)
    const ref = React.useRef<HTMLDivElement>(null)
    const [newStyle, updateStyle] = React.useState({
        ...style,
        position: "absolute",
        left: 0,
        top: 0
    })
    const getChild = () => {
        if (!nodeRef) {
            return getNextNodeByRef(ref) as HTMLElement
        }

        return nodeRef.current
    }

    React.useEffect(
        () => {
            if (visible) {
                const childEl = getChild()

                if (
                    !targetRef ||
                    !targetRef.current ||
                    !childEl
                ) {
                    return
                }

                computePosition(
                    targetRef.current,
                    childEl,
                    {
                        middleware: [shift(), flip()]
                    }
                )
                    .then(({x, y}) => {
                        updateStyle({
                            ...newStyle,
                            transform: `translate3d(${x}px, ${y}px, 0)`
                        })
                    })
            }
        },
        [visible]
    )

    return (
        <>
            {!nodeRef && <Placeholder ref={ref} />}
            {
                React.cloneElement(
                    child,
                    {
                        ...restProps,
                        style: newStyle
                    })
            }
        </>
    )
}

export default Popup