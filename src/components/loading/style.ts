import { createGlobalStyle } from "styled-components"

const LoadingGlobalStyle = createGlobalStyle`
.r-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    padding: 10px;
    background-color: rgba(255, 255, 255, .5);

    .btn-close {
        position: absolute;
        top: 10px;
        right: 10px;
    }
}

.r-loading-fullscreen {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;

    .r-loading {
        width: 100%;
        height: 100%;

        .btn-close {
            top: 20px;
            right: 30px;
        }
    }
}
`

export default LoadingGlobalStyle