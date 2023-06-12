import React, {
    Children,
    FC,
    ReactElement,
    cloneElement,
    isValidElement,
    useState
} from "react"
import { DivProps } from "../commons/types"
import { classnames } from "../utils"
import Item, { PREFIX } from "./item"
import CarouselContext from "./context"
import ControlBtn from "./control-btn"

interface CarouselProps extends DivProps {
    controls?: boolean
    indicators?: boolean
    slide?: boolean
    fade?: boolean
    interval?: number
    wrap?: boolean
    keyboard?: boolean
    touch?: boolean
    ride?: boolean
}

const Carousel: FC<CarouselProps> = (
    {
        className,
        controls = true,
        indicators = true,
        slide = true,
        interval = 5000,
        ride = false,
        wrap = true,
        keyboard = true,
        touch = true,
        fade = false,
        children,
        ...restProps
    }: CarouselProps
) => {
    const classes = classnames(
        className,
        PREFIX,
        slide && "slide",
        fade && `${PREFIX}-fade`
    )
    const [activeIndex, setActiveIndex] = useState(0)
    const newChildren = Children.toArray(children).filter(
        c => isValidElement(c) && c.type === Item
    ).map((c, index) => cloneElement(
        c as ReactElement,
        {
            className: classnames(
                (c as ReactElement).props.className,
                activeIndex === index ? "active" : ""
            )
        }
    ))

    return (
        <CarouselContext.Provider value={{ slide }}>
            <div className={classes} {...restProps}>
                <div className={`${PREFIX}-inner`}>
                    {newChildren}
                </div>
                {
                    controls ? (
                        <>
                            <ControlBtn prefix={PREFIX} variant="prev" />
                            <ControlBtn prefix={PREFIX} variant="next" />
                        </>
                    ) : null
                }
            </div>
        </CarouselContext.Provider>
    )
}

export default Carousel