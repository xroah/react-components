import React, {
    isValidElement,
    FC,
    useState,
    CSSProperties,
    cloneElement,
    useLayoutEffect,
    useRef,
    useEffect
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
import warning from "warning"
import GetDomNode from "../utils/get-dom-node"
import Overlay from "./overlay"
import { PopupProps, getOffset } from "./misc"

export { extractPopupProps } from "./misc"
export type { PopupProps } from "./misc"

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
    const transitionProps = {
        in: visible,
        unmountOnExit: unmountOnHidden,
        onEnter: onShow,
        onEntered: onShown,
        onExit: onHide,
        onExited: onHidden
    }
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
    const finalOverlay = (
        <Overlay ref={floatingRef} className={classes}>
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
        </Overlay>
    )

    useEffect(
        () => {
            if (visible) {
                document.addEventListener(
                    "click",
                    handleClickOutSide
                )

                if (!rendered.current) {
                    rendered.current = true
                }
            }

            return () => {
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
            {
                createPortal(
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
                    ),
                    document.body
                )
            }
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