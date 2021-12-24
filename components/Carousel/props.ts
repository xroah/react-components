import PropTypes from "prop-types"
import {CarouselProps} from "./types";

export const defaultProps: CarouselProps = {
    slide: true,
    keyboard: true,
    wrap: true,
    interval: 5000,
    pause: "hover"
}

export const intervalPropType = {
    interval: PropTypes.number
}

export const propsTypes = {
    ...intervalPropType,
    keyboard: PropTypes.bool,
    pause: PropTypes.oneOf([
        false,
        "hover"
    ]),
    ride: PropTypes.bool,
    wrap: PropTypes.bool,
    touch: PropTypes.bool,
    controls: PropTypes.bool,
    indicators: PropTypes.bool,
    fade: PropTypes.bool,
    variant: PropTypes.oneOf(["dark"]),
    onSlide: PropTypes.func,
    onSlid: PropTypes.func
}

export const itemPropsTypes = {
    ...intervalPropType,
    caption: PropTypes.node,
    captionClasses: PropTypes.string
}