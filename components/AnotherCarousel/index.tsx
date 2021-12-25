import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import {PREFIX} from "../Carousel/constants"
import Carousel from "../Carousel"
import {getPrefixFunc} from "../Commons/utils"
import Item from "./Item"
import {Direction} from "../Carousel/types"
import {reflow} from "reap-utils/lib/dom"

const DURATION = 600
const DURATION_PADDING = 20
const transition = `transform ${DURATION}ms`

let uid = 0

class AnotherCarousel extends Carousel {
    static Item = Item

    transitionTimer: number | null = null
    innerRef = React.createRef<HTMLDivElement>()
    state = {
        activeIndex: 0,
        next: null,
        dir: ""
    }

    cloneItem(c: React.ReactElement, i: number) {
        return React.cloneElement(
            c,
            {
                active: this.state.activeIndex === i
            }
        )
    }

    cloneNode(i: number) {
        const {children} = this.props

        if (!Array.isArray(children)) {
            return null
        }

        const child = children[i]

        return child ?
            React.cloneElement(
                child,
                {
                    key: `bsCarouselCloned${uid++}`
                }
            ) : null
    }

    toggleTransitionStyle(add = true) {
        const {current: inner} = this.innerRef

        if (inner) {
            inner.style.transition = add ? transition : ""
        }
    }

    updateTransform(translate: number | string) {
        const {current: inner} = this.innerRef

        if (inner) {
            inner.style.transform = `translateX(${translate}%)`
        }
    }

    performSlide(i: number, dir: Direction) {
        const total = this.getTotal()
        const update = (distance: number) => {
            this.toggleTransitionStyle()
            this.updateTransform(distance)
            this.startTransition()
        }

        /**
         * current is last and next is first,
         * append the first item as last,  translate after update
         */
        if (dir === "next" && i === 0) {
            this.setState(
                {next: this.cloneNode(i)},
                () => update(-total * 100)
            )
        } else if (dir === "prev" && i === total - 1) {
            /**
             * current is first and prev is last,
             * prepend the last item as first,
             * current transform is 0%, so the item is visible already,
             * translate -100% and then translate 0% to perform the transition
             */
            this.updateTransform(-100)
            reflow(this.innerRef.current!)
            this.setState(
                {next: this.cloneNode(i)},
                () => update(0)
            )
        } else {
            update(-i * 100)
        }
    }

    slide(i: number, dir: Direction) {
        if (this.innerRef.current) {
            super.slide(
                i,
                dir,
                () => this.performSlide(i, dir)
            )
        }
    }

    startTransition() {
        this.transitionTimer = window.setTimeout(
            this.handleTransitionEnd,
            DURATION + DURATION_PADDING
        )

        this.handleEnter()
    }

    handleTransitionEnd = () => {
        const {dir, activeIndex: i} = this.state
        const total = this.getTotal()

        if (this.transitionTimer) {
            window.clearTimeout(this.transitionTimer)

            this.transitionTimer = null
        }

        // remove transition
        this.toggleTransitionStyle(false)

        if (
            (dir === "prev" && i === total - 1) ||
            (dir === "next" && i === 0)
        ) {
            // remove next element and translate to correction position
            this.setState(
                {next: null},
                () => {
                    if (dir === "prev") {
                        this.updateTransform(-(total - 1) * 100)
                    } else {
                        this.updateTransform(0)
                    }

                    this.handleEntered()
                }
            )
        } else {
            this.handleEntered()
        }
    }

    render() {
        const {
            className,
            variant,
            ...restProps
        } = this.props
        const {next, dir} = this.state
        const prefix = getPrefixFunc(PREFIX)
        const classes = classNames(
            className,
            "slide",
            prefix(),
            variant === "dark" && prefix("dark")
        )
        const children = this.renderChildren()
        const newProps = {
            ...this.omitProps(restProps),
            ...this.getEventCallbacks()
        }
        const innerStyle: React.CSSProperties = {
            display: "flex",
            flexWrap: "nowrap",
            overflow: "visible"
        }

        return (
            <div
                tabIndex={this.getTabIndex()}
                className={classes}
                {...newProps}>
                {children[1]}
                <div style={{overflow: "hidden"}}>
                    <div
                        ref={this.innerRef}
                        style={innerStyle}
                        className={prefix("inner")}
                        onTransitionEnd={this.handleTransitionEnd}>
                        {next && dir === "prev" && next}
                        {children[0]}
                        {next && dir === "next" && next}
                    </div>
                </div>
                {this.renderControls()}
            </div>
        )
    }
}

export default AnotherCarousel