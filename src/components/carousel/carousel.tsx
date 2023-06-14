import React, {
    Children,
    FC,
    KeyboardEvent,
    ReactElement,
    cloneElement,
    isValidElement,
    useEffect,
    useMemo,
    useRef,
    useState
} from "react"
import { DivProps } from "../commons/types"
import { classnames } from "../utils"
import Item, { PREFIX } from "./item"
import carouselContext from "./context"
import ControlBtn from "./control-btn"
import Indicators from "./indicators"
import { useSwipe } from "../hooks"

interface CarouselProps extends DivProps {
    slide?: boolean
    controls?: boolean
    indicators?: boolean
    fade?: boolean
    interval?: number
    wrap?: boolean
    keyboard?: boolean
    touch?: boolean
    ride?: boolean
    onSlide?: VoidFunction
    onSlid?: VoidFunction
}

const Carousel: FC<CarouselProps> = (
    {
        className,
        controls = true,
        slide = true,
        indicators = true,
        interval = 5000,
        ride = false,
        wrap = true,
        keyboard = true,
        touch = true,
        fade = false,
        children,
        onSlid,
        onSlide,
        onKeyDown,
        onTouchStart,
        onTouchMove,
        onTouchEnd,
        ...restProps
    }: CarouselProps
) => {
    const classes = classnames(
        className,
        PREFIX,
        fade && `${PREFIX}-fade`
    )
    const [activeIndex, setActiveIndex] = useState(0)
    const [dir, setDir] = useState("")
    const [sliding, setSliding] = useState(false)
    const currentChildPropsRef = useRef<CarouselProps | null>(null)
    const [newChildren, count] = useMemo(
        () => {
            const newChildren = Children.toArray(children).filter(
                c => isValidElement(c) && c.type === Item
            ).map((c, index) => cloneElement(
                c as ReactElement,
                { __active: index === activeIndex }
            ))

            return [newChildren, newChildren.length]
        },
        [children, activeIndex]
    )
    const to = (index: number) => {
        if (sliding || index === activeIndex) {
            return
        }

        setDir(index > activeIndex ? "next" : "prev")

        if (wrap) {
            index = (index + count) % count
        }

        index = Math.max(0, Math.min(index, count - 1))

        setActiveIndex(index)
    }
    const next = () => to(activeIndex + 1)
    const prev = () => to(activeIndex - 1)
    const {
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd
    } = useSwipe(40, {
        onTouchEnd,
        onTouchMove,
        onTouchStart,
        onPrev: prev,
        onNext: next
    })
    const handleSlid = () => {
        onSlid?.()
        setSliding(false)
        setDir("")
    }
    const handleSlide = () => {
        onSlide?.()
        setSliding(true)
    }
    const handleKeyDown = (ev: KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(ev)

        if (keyboard) {
            const key = ev.key.toLowerCase()

            if (key === "arrowleft") {
                prev()
            } else if (key === "arrowright") {
                next()
            }
        }
    }
    const touchHandlers = {
        onTouchEnd,
        onTouchStart,
        onTouchMove
    }

    if (touch) {
        touchHandlers.onTouchEnd = handleTouchEnd
        touchHandlers.onTouchMove = handleTouchMove
        touchHandlers.onTouchStart = handleTouchStart
    }

    useEffect(
        () => {
            currentChildPropsRef.current = newChildren[activeIndex].props
            console.log(currentChildPropsRef.current)
        },
        [newChildren, activeIndex]
    )

    return (
        <carouselContext.Provider value={{
            dir,
            slide,
            onSlid: handleSlid,
            onSlide: handleSlide
        }}>
            <div
                className={classes}
                tabIndex={keyboard ? -1 : undefined}
                onKeyDown={handleKeyDown}
                {...touchHandlers}
                {...restProps}>
                <div className={`${PREFIX}-inner`}>
                    {newChildren}
                </div>
                {
                    controls ? (
                        <>
                            <ControlBtn
                                prefix={PREFIX}
                                variant="prev"
                                onClick={prev} />
                            <ControlBtn
                                prefix={PREFIX}
                                variant="next"
                                onClick={next} />
                        </>
                    ) : null
                }
                {
                    indicators ? (
                        <Indicators
                            count={count}
                            current={activeIndex}
                            onSelect={to} />
                    ) : null
                }
            </div>
        </carouselContext.Provider>
    )
}

export default Carousel