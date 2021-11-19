import * as React from "react"
import CSSTransition from "../../src/react/transition/CSSTransition"
import {callbacks} from "./fade-demo"

export default () => {
    const [visible, toggle] = React.useState(false)
    const handleClick = () => toggle(!visible)

    return (
        <div style={{width: 200}}>
            <button onClick={handleClick}>
                toggle css
            </button>
            <CSSTransition
                in={visible}
                name="slide-fade"
                {...callbacks}>
                <p style={{color: "red"}}>hello</p>
            </CSSTransition>
        </div >
    )
}