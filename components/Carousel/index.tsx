import * as React from "react"
import {isUndef, omit} from "reap-utils/lib"
import classNames from "reap-utils/lib/class-names"
import {getPrefixFunc, map} from "../Commons/utils"
import CarouselItem from "./Item"
import Indicator from "./Indicator"
import CarouselContext from "./context"
import {
    CarouselProps,
    CarouselState,
    Direction
} from "./types"
import ControlBtn from "./ControlBtn"
import {PREFIX} from "./constants"
import {DivAttrs} from "../Commons/consts-and-types"
import {defaultProps, propsTypes} from "./props"

class Carousel extends React.Component<CarouselProps, CarouselState> {
    sliding = false
    queue: Function[] = []
    timer: number | null = null
    state = {
        activeIndex: 0
    }

    static Item = CarouselItem
    static defaultProps = defaultProps
    static propTypes = propsTypes

    componentDidMount() {
        if (!this.props.ride) {
            this.cycle()
        }
    }

    handleIndicatorClick = (i: number) => {
        this.to(i)
    }

    getTotal() {
        const {children} = this.props

        return React.Children.count(children)
    }

    prev = () => {
        if (this.queue.length) {
            return
        }

        let {activeIndex} = this.state

        if (activeIndex === 0) {
            if (this.props.wrap) {
                activeIndex = this.getTotal() - 1
            }
        } else {
            activeIndex--
        }

        this.slide(activeIndex, "prev")
    }

    next = () => {
        if (this.queue.length) {
            return
        }

        let {activeIndex} = this.state

        if (activeIndex === this.getTotal() - 1) {
            if (this.props.wrap) {
                activeIndex = 0
            }
        } else {
            activeIndex++
        }

        this.slide(activeIndex, "next")
    }

    nextWhenVisible = () => {
        if (document.hidden) {
            this.cycle()
        } else {
            this.next()
        }
    }

    pause = () => {
        if (this.timer !== null) {
            window.clearTimeout(this.timer)

            this.timer = null
        }
    }

    cycle = () => {
        const {children, interval} = this.props
        const {activeIndex} = this.state

        if (
            !Array.isArray(children) ||
            !interval ||
            interval < 0
        ) {
            return
        }

        this.pause()

        const currentChild = children[activeIndex]
        this.timer = window.setTimeout(
            this.nextWhenVisible,
            currentChild.props.interval || interval
        )
    }

    handleKeydown = (evt: React.KeyboardEvent) => {
        switch (evt.key.toLowerCase()) {
            case "arrowleft":
                this.prev()
                break
            case "arrowright":
                this.next()
                break
            default:
            // do nothing
        }
    }

    slide(i: number, dir: Direction, cb?: () => void) {
        if (i === this.state.activeIndex) {
            return this.cycle()
        }

        if (!this.sliding) {
            this.pause()
            this.setState(
                {
                    activeIndex: i,
                    dir
                },
                cb
            )
        }
    }

    // for indicators
    to(i: number) {
        const {activeIndex} = this.state

        if (i < 0 || i >= this.getTotal()) {
            return
        }

        if (this.sliding) {
            return this.queue.push(() => this.to(i))
        }

        this.slide(i, activeIndex < i ? "next" : "prev")
    }

    handleEnter = () => {
        this.sliding = true

        this.props.onSlide?.(this.state.activeIndex)
    }

    handleEntered = () => {
        this.sliding = false

        this.props.onSlid?.(this.state.activeIndex)

        if (this.queue.length) {
            setTimeout(this.queue.shift()!, 20)
        } else {
            this.cycle()
        }
    }

    getTabIndex() {
        const {tabIndex, keyboard} = this.props

        return tabIndex === undefined && keyboard ? -1 : tabIndex
    }

    cloneItem(c: React.ReactElement, i: number) {
        return React.cloneElement(
            c,
            {
                __index__: i,
                __onEnter__: this.handleEnter,
                __onEntered__: this.handleEntered
            }
        )
    }

    getEventCallbacks() {
        const {keyboard, pause} = this.props
        const props: DivAttrs = {}

        if (pause === "hover") {
            props.onMouseEnter = this.pause
            props.onMouseLeave = this.cycle
        }

        if (keyboard) {
            props.onKeyDown = this.handleKeydown
        }

        return props
    }

    renderChildren() {
        const {children, indicators} = this.props
        const indicatorEls: React.ReactElement[] = []
        let indicatorWrapper: React.ReactElement | undefined
        let childrenEl = map(
            children,
            (c, i) => {
                // @ts-ignore: 'Item' does not exist on type 'Function'
                if (c.type !== this.constructor.Item) {
                    throw new TypeError(
                        "The children of the Carousel must be CarouselItem"
                    )
                }

                const k = String(isUndef(c.key) ? i : c.key)

                if (indicators) {
                    indicatorEls.push(
                        <Indicator
                            key={k}
                            index={i}
                            active={this.state.activeIndex === i}
                            onClick={this.handleIndicatorClick} />
                    )
                }

                return this.cloneItem(c, i)
            }
        )

        if (indicatorEls.length) {
            indicatorWrapper = (
                <div className={`${PREFIX}-indicators`}>
                    {indicatorEls}
                </div>
            )
        }

        return [childrenEl, indicatorWrapper]
    }

    renderControls() {
        const ctrlPrefix = `${PREFIX}-control`

        return this.props.controls ? (
            <>
                <ControlBtn
                    onClick={this.prev}
                    prefix={`${ctrlPrefix}-prev`} />
                <ControlBtn
                    onClick={this.next}
                    prefix={`${ctrlPrefix}-next`} />
            </>
        ) : null
    }

    omitProps(props: Partial<CarouselProps>) {
        return omit(
            props,
            [
                "interval",
                "wrap",
                "touch",
                "ride",
                "onSlide",
                "onSlid",
                "tabIndex",
                "keyboard",
                "pause",
                "children",
                "indicators",
                "controls",
                "slide",
                "fade"
            ]
        )
    }

    render() {
        const {
            className,
            fade,
            variant,
            slide,
            ...restProps
        } = this.props
        const prefix = getPrefixFunc(PREFIX)
        const classes = classNames(
            className,
            prefix(),
            slide && "slide",
            fade && prefix("fade"),
            variant === "dark" && prefix("dark")
        )
        const children = this.renderChildren()
        const newProps = {
            ...this.omitProps(restProps),
            ...this.getEventCallbacks()
        }

        return (
            <div
                tabIndex={this.getTabIndex()}
                className={classes}
                {...newProps}>
                {children[1]}
                <div className={prefix("inner")}>
                    <CarouselContext.Provider
                        value={{...this.state, slide}}>
                        {children[0]}
                    </CarouselContext.Provider>
                </div>
                {this.renderControls()}
            </div>
        )
    }
}

export default Carousel