import { createGlobalStyle } from "styled-components"

const ToastGlobalStyle = createGlobalStyle`
.r-toast {
    position: fixed;
    z-index: 1000;
    pointer-events: none;
}

.r-toast-top,
.r-toast-bottom {
    display: flex;
    align-items: center;
    flex-direction: column;
    left: 0;
    width: 100%;
}

.r-toast-top {
    top: 0;
}

.r-toast-bottom {
    bottom: 0;
}

.r-toast-top-left {
    top: 0;
    left: 0;
}

.r-toast-top-right {
    top: 0;
    right: 0;
}

.r-toast-bottom-left {
    bottom: 0;
    left: 0;
}

.r-toast-bottom-right {
    bottom: 0;
    right: 0;
}

.r-toast-item {
    margin: 10px;
    pointer-events: auto;
    transition: transform .3s cubic-bezier(.21, .66, .49, 1.32),
        opacity .3s, height .3s linear;
}
`

export default ToastGlobalStyle