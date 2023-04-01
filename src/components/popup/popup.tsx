import React, {
    isValidElement,
    RefObject,
    FC,
    useEffect,
    ReactElement,
    useState,
    CSSProperties,
    cloneElement,
    useCallback,
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
    ComputePositionReturn
} from "@floating-ui/dom"
import Fade from "../basics/fade"
import { noop } from "r-layers/utils"
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

export interface PopupProps {
    floatingRef: RefObject<HTMLElement>
    overlay: ReactElement
    flipAlignment?: boolean
    anchorRef: RefObject<HTMLElement>
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
    onUpdate?: (data: ComputePositionReturn) => void
}

const Popup: FC<PopupProps> = (
    {
        visible,
        transitionClass,
        offset,
        anchorRef,
        floatingRef,
        children,
        overlay,
        timeout,
        fallbackPlacements,
        arrowRef,
        flipAlignment = true,
        flip = true,
        placement = "bottom",
        onUpdate
    }: PopupProps
) => {
    if (!isValidElement(children)) {
        return children
    }

    const [pos, setPos] = useState<CSSProperties>({
        position: "absolute",
        left: 0,
        top: 0
    })
    const getOffset = useCallback(
        () => {
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
        },
        [offset]
    )
    const updatePosition = () => {
        const offset = getOffset()

        computePosition(
            anchorRef.current!,
            floatingRef.current!,
            {
                middleware: [
                    offset && offsetMiddleware({
                        mainAxis: offset[0],
                        crossAxis: offset[1]
                    }),
                    inline(),
                    flip && flipMiddleware({
                        fallbackPlacements,
                        flipAlignment
                    }),
                    shift(),
                    arrowRef?.current && arrowMiddleWare({
                        element: arrowRef.current
                    }),
                ],
                placement
            }
        ).then(({ x, y, ...rest }) => {
            setPos({
                ...pos,
                transform: `translateX(${x}px) translateY(${y}px)`
            })
            onUpdate?.({
                x,
                y,
                ...rest
            })
        })
    }
    const newOverlay = cloneElement(
        overlay,
        {
            style: {
                ...overlay.props.style,
                ...pos
            }
        }
    )

    useEffect(
        () => {
            let cleanup = noop

            if (visible) {
                if (floatingRef.current && anchorRef.current) {
                    cleanup = autoUpdate(
                        anchorRef.current,
                        floatingRef.current,
                        updatePosition
                    )
                }
            }

            return cleanup
        },
        [visible]
    )
    const fade = (
        <Fade
            in={visible}
            timeout={timeout}
            nodeRef={floatingRef}
            fadeClass={transitionClass}
            appear
            unmountOnExit>
            {newOverlay}
        </Fade>
    )

    return (
        <>
            {children}
            {createPortal(fade, document.body)}
        </>
    )
}

const refType = shape({
    current: instanceOf(HTMLElement) as Validator<HTMLElement | null>
}).isRequired

Popup.propTypes = {
    anchorRef: refType,
    floatingRef: refType,
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