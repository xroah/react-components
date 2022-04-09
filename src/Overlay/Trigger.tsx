import * as React from "react"
import {
    getNextNodeByRef,
    only,
    Placeholder
} from "reap-utils/lib/react"
import {ElProps, Trigger as TriggerType} from "../Commons/common-types"
import {handleActions} from "../Commons/utils"
import Overlay, {OverlayCommonProps} from "./Overlay"

export interface TriggerProps extends OverlayCommonProps {
    overlayRef?: React.RefObject<HTMLElement>
    nodeRef?: React.RefObject<HTMLElement>
    action?: TriggerType | TriggerType[]
    overlay: React.ReactElement
    unmountOnOverlayExit?: boolean
}

export default function Trigger(
    {
        overlay,
        overlayRef,
        nodeRef,
        action,
        children,
        unmountOnOverlayExit,
        ...restProps
    }: TriggerProps
) {
    const child = only(children)
    const {
        onClick: cOnClick,
        onFocus: cOnFocus,
        onBlur: cOnBlur,
        onMouseEnter: cOnMouseEnter,
        onMouseLeave: cOnMouseLeave
    } = child.props
    const placeholderRef = React.useRef<HTMLDivElement>(null)
    const childRef = React.useRef<HTMLElement>(null)
    const [visible, update] = React.useState(false)
    const onClick = React.useCallback(
        (evt: React.MouseEvent) => {
            cOnClick?.(evt)
            update(!visible)
        },
        [cOnClick, visible]
    )
    const onFocus = React.useCallback(
        (evt: React.FocusEvent) => {
            cOnFocus?.(evt)
            update(true)
        },
        [cOnFocus]
    )
    const onBlur = React.useCallback(
        (evt: React.FocusEvent) => {
            cOnBlur?.(evt)
            update(false)
        },
        [cOnBlur]
    )
    const onMouseEnter = React.useCallback(
        (evt: React.MouseEvent) => {
            cOnMouseEnter?.(evt)
            update(true)
        },
        [cOnMouseEnter]
    )
    const onMouseLeave = React.useCallback(
        (evt: React.MouseEvent) => {
            cOnMouseLeave?.(evt)
            update(false)
        },
        [cOnMouseLeave]
    )
    const getNode = () => {
        const node = getNextNodeByRef(placeholderRef)

        if (node) {
            (childRef as any).current = node
        }
    }
    const callbacks = React.useMemo(
        () => {
            const listeners: ElProps = {
                onClick,
                onMouseEnter,
                onMouseLeave,
                onFocus,
                onBlur
            }
            const ret: ElProps = {}
            const actions = handleActions(action)

            for (let a of actions) {
                if (listeners.hasOwnProperty(a)) {
                    ret[a] = listeners[a]
                }
            }

            return ret
        },
        [
            action,
            onClick,
            onMouseEnter,
            onMouseLeave,
            onBlur,
            onFocus
        ]
    )
    const c = React.cloneElement(
        child,
        {
            ...callbacks
        }
    )

    React.useEffect(
        () => {
            if (!childRef.current) {
                getNode()
            }
        },
        [visible]
    )

    return (
        <>
            {!nodeRef && <Placeholder ref={placeholderRef} />}
            {c}
            <Overlay
                targetRef={childRef}
                visible={visible}
                unmountOnExit={unmountOnOverlayExit}
                {...restProps}>
                {overlay}
            </Overlay>
        </>
    )
}

Trigger.defaultProps = {
    action: "click"
}