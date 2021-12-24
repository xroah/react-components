import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import Carousel from "../Carousel"

export default class AnotherCarousel extends Carousel {
    render() {
        return (
            <div
            tabIndex={this.getTabIndex()}>

            </div>
        )
    }
}