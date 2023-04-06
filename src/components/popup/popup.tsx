import React, {
    isValidElement,
    RefObject,
    FC,
    ReactElement,
    useState,
    CSSProperties,
    cloneElement,
    useLayoutEffect,
    useRef,
    useEffect,
} from "react"
import { createPortal } from "react-dom"
import {
    computePosition,
    autoUpdate,
    flip as flipMiddleware,
    offset as offsetMiddleware,
    arrow as arrowMiddleWare,
    shift,
    inline,
    Placement,
    ComputePositionReturn,
    limitShift
} from "@floating-ui/dom"
import Fade from "../basics/fade"
import { classnames, noop } from "../utils"
import {
    arrayOf,
    bool,
    element,
    instanceOf,
    number,
    oneOfType,
    shape,
    string,
    Requireable,
    Validator,
    oneOf
} from "prop-types"
import NoTransition from "../basics/no-transition"
import { ToggleEvents } from "../commons/types"
import warning from "warning"
import GetDomNode from "r-layers/utils/get-dom-node"

export interface PopupProps extends ToggleEvents {
    overlay: ReactElement
    anchorRef?: RefObject<HTMLElement>
    flipAlignment?: boolean
    className?: string
    arrowRef?: RefObject<HTMLElement>
    children: ReactElement
    offset?: number | number[]
    flip?: boolean
    transition?: boolean
    transitionClass?: string
    timeout?: number
    placement?: Placement
    visible?: boolean
    fallbackPlacements?: Placement[]
    unmountOnHidden?: boolean
    forceRender?: boolean
    onClickOutSide?: (e: MouseEvent) => void
    onUpdate?: (data: ComputePositionReturn) => void
}

type CommonProps = { [index: string]: unknown }
type PropsType = Partial<PopupProps> & CommonProps

export function extractPopupProps(props: PropsType) {
    const keys = new Set([
        "visible",
        "transition",
        "transitionClass",
        "offset",
        "anchorRef",
        "children",
        "overlay",
        "timeout",
        "fallbackPlacements",
        "arrowRef",
        "flipAlignment",
        "flip",
        "placement",
        "unmountOnHidden",
        "forceRender",
        "className",
        "onUpdate",
        "onShow",
        "onShown",
        "onHide",
        "onHidden"
    ])
    const popupProps: Partial<PopupProps> = {}
    const otherProps: CommonProps = {}
    const realKeys = Object.keys(props)
    type PopupKey = keyof PopupProps

    for (const key of realKeys) {
        if (keys.has(key)) {
            (
                popupProps[key as PopupKey] as PopupProps[PopupKey]
            ) = props[key as PopupKey]
        } else {
            otherProps[key] = props[key]
        }
    }

    return {
        popupProps: popupProps as PopupProps,
        otherProps
    }
}

function getOffset(offset?: number | number[]) {
    if (offset) {
        if (Array.isArray(offset)) {
            if (!offset.length) {
                return false
            }

            if (offset.length === 1) {
                return [offset[0], offset[0]]
            }

            return offset
        }

        return [offset, offset]
    }

    return false
}

const Popup: FC<PopupProps> = (
    {
        visible,
        transition = true,
        transitionClass,
        offset,
        anchorRef,
        children,
        overlay,
        timeout,
        fallbackPlacements,
        arrowRef,
        flipAlignment = true,
        flip = true,
        placement = "bottom",
        unmountOnHidden = true,
        forceRender,
        className,
        onClickOutSide,
        onUpdate,
        onShow,
        onShown,
        onHide,
        onHidden
    }: PopupProps
) => {

    if (!isValidElement(children)) {
        return children
    }

    const rendered = useRef(false)
    const PREFIX = "r-popup"
    const localAnchorRef = useRef<unknown>(null)
    const floatingRef = useRef<HTMLDivElement>(null)
    const [pos, setPos] = useState<CSSProperties>({
        position: "absolute",
        left: 0,
        top: 0
    })
    const [
        finalPlacement,
        setFinalPlacement
    ] = useState(placement)
    const classes = classnames(
        className,
        PREFIX,
        `${PREFIX}-${finalPlacement}`
    )
    const getFloatingEl = () => {
        const el = floatingRef.current?.firstElementChild

        return el as (HTMLElement | null)
    }
    const getLocalAnchor = (el: Element | null) => {
        localAnchorRef.current = el
    }
    const getAnchorEl = () => {
        return anchorRef?.current ?? localAnchorRef.current
    }
    const updatePosition = () => {
        const finalOffset = getOffset(offset)
        const floatingEl = getFloatingEl()
        const anchorEl = getAnchorEl()

        computePosition(
            anchorEl as Element,
            floatingEl!,
            {
                middleware: [
                    finalOffset && offsetMiddleware({
                        mainAxis: finalOffset[0],
                        crossAxis: finalOffset[1]
                    }),
                    inline(),
                    flip && flipMiddleware({
                        fallbackPlacements,
                        flipAlignment
                    }),
                    shift({
                        limiter: limitShift()
                    }),
                    arrowRef?.current && arrowMiddleWare({
                        element: arrowRef.current
                    }),
                ],
                placement
            }
        ).then(data => {
            setPos({
                ...pos,
                left: data.x,
                top: data.y
            })
            setFinalPlacement(data.placement)
            onUpdate?.(data)
        })
    }
    const finalOverlay = (
        <div ref={floatingRef} className={classes}>
            {
                cloneElement(
                    overlay,
                    {
                        style: {
                            ...overlay.props.style,
                            ...pos
                        }
                    }
                )
            }
        </div>
    )
    const transitionProps = {
        in: visible,
        unmountOnExit: unmountOnHidden,
        onEnter: onShow,
        onEntered: onShown,
        onExit: onHide,
        onExited: onHidden
    }
    const el = (
        transition ? (
            <Fade
                timeout={timeout}
                nodeRef={floatingRef}
                fadeClass={transitionClass}
                appear
                {...transitionProps}>
                {finalOverlay}
            </Fade>
        ) : (
            <NoTransition {...transitionProps}>
                {finalOverlay}
            </NoTransition>
        )
    )
    const handleClickOutSide = (ev: MouseEvent) => {
        const target = ev.target as HTMLElement
        const anchorEl = getAnchorEl() as HTMLElement
        const floatingEl = getFloatingEl()

        if (!anchorEl || !floatingEl) {
            return
        }

        if (
            target !== anchorEl &&
            !anchorEl.contains(target) &&
            target !== floatingEl &&
            !floatingEl.contains(target)
        ) {
            onClickOutSide?.(ev)
        }
    }

    useEffect(
        () => {
            if (visible) {
                document.addEventListener(
                    "click",
                    handleClickOutSide
                )
            } else {
                document.removeEventListener(
                    "click",
                    handleClickOutSide
                )
            }
        },
        [visible]
    )

    useLayoutEffect(
        () => {
            let cleanup = noop

            if (visible) {
                const floatingEl = getFloatingEl()
                const anchorEl = getAnchorEl()

                if (!rendered.current) {
                    rendered.current = true
                }

                if (!floatingEl) {
                    warning(
                        false,
                        "Can not find the overlay element."
                    )
                }

                if (!anchorEl) {
                    warning(
                        false,
                        "Can not find the anchor element"
                    )
                }

                if (floatingEl && anchorEl) {
                    cleanup = autoUpdate(
                        anchorEl as Element,
                        floatingEl,
                        updatePosition
                    )
                }
            }

            return cleanup
        },
        [visible]
    )

    if (!forceRender && !rendered.current && !visible) {
        return children
    }

    return (
        <>
            {
                anchorRef ? children : (
                    <GetDomNode getRef={getLocalAnchor}>
                        {children}
                    </GetDomNode>
                )
            }
            {createPortal(el, document.body)}
        </>
    )
}

Popup.propTypes = {
    anchorRef: shape({
        current: instanceOf(HTMLElement) as Validator<HTMLElement>
    }),
    overlay: element.isRequired,
    children: element.isRequired,
    offset: oneOfType([
        number,
        arrayOf(number) as (Requireable<number[]>)
    ]),
    flip: bool,
    transition: bool,
    transitionClass: string,
    timeout: number,
    visible: bool,
    forceRender: bool,
    unmountOnHidden: bool,
    placement: oneOf([
        "top",
        "bottom",
        "left",
        "right",
        "top-start",
        "top-end",
        "bottom-start",
        "bottom-end",
        "left-start",
        "left-end",
        "right-start",
        "right-end"
    ])
}

export default Popup