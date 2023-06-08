import { createGlobalStyle } from "styled-components"

const PopupGlobalStyle = createGlobalStyle`
.r-popup {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 1000;
}

.r-popup-dropdown {
    >* {
        transition: transform .15s cubic-bezier(.9, .24, .14, .92);
        transform-origin: center top;
    }

    &:not(.show)>* {
        transform: scaleY(.5);
    }

    &.r-popup-top,
    &.r-popup-top-start,
    &.r-popup-top-end {
        >* {
            transform-origin: center bottom;
        }
    }
}
`

export default PopupGlobalStyle