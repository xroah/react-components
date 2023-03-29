import React, {
    isValidElement,
    RefObject,
    useRef,
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
    inline,
    Placement
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
import { DivProps } from "r-layers/commons/types"

// const triggers = ["hover", "focus", "click"] as const
// type Trigger = OneOf<typeof triggers>

export interface PopupProps
    extends Pick<DivProps, "className" | "style"> {
    anchorRef: RefObject<HTMLElement | null>
    overlay: ReactElement
    children: ReactElement
    offset?: number | number[]
    flip?: boolean
    transition?: boolean
    transitionClass?: string
    timeout?: number
    placement?: Placement
    visible?: boolean
    fallbackPlacements?: Placement[]
}

const Popup: FC<PopupProps> = (
    {
        visible,
        transitionClass,
        offset,
        anchorRef,
        children,
        overlay,
        timeout,
        fallbackPlacements,
        flip = true,
        placement = "bottom",
        style,
        className
    }: PopupProps
) => {
    if (!isValidElement(children)) {
        return children
    }

    const rootRef = useRef<HTMLDivElement>(null)
    const [pos, setPos] = useState<CSSProperties>({
        position: "absolute"
    })
    const getOverlayElement = () => {
        return rootRef.current?.firstElementChild
    }
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
        const overlayElement = getOverlayElement()
        const offset = getOffset()

        computePosition(
            anchorRef.current!,
            overlayElement as HTMLElement,
            {
                middleware: [
                    offset && offsetMiddleware({
                        mainAxis: offset[0],
                        crossAxis: offset[1]
                    }),
                    inline(),
                    flip && flipMiddleware({
                        fallbackPlacements
                    })
                ],
                placement
            }
        ).then(({ x, y }) => {
            setPos({
                ...pos,
                transform: `translateX(${x}px) translateY(${y}px)`
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
            const overlayElement = getOverlayElement()

            if (visible) {
                if (overlayElement && anchorRef.current) {
                    cleanup = autoUpdate(
                        anchorRef.current,
                        overlayElement as HTMLElement,
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
            nodeRef={rootRef}
            fadeClass={transitionClass}
            appear
            unmountOnExit>
            <div
                ref={rootRef}
                style={{
                    ...style,
                    position: "absolute",
                    left: "0",
                    top: "0"
                }}
                className={className}>
                {newOverlay}
            </div>
        </Fade>
    )

    return (
        <>
            {children}
            {createPortal(fade, document.body)}
        </>
    )
}
Popup.propTypes = {
    anchorRef: shape({
        current: instanceOf(HTMLElement) as Validator<HTMLElement | null>
    }).isRequired,
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