import * as React from "react"
import CSSTransition from "../../src/CSSTransition"

export default () => {
    const [visible, toggle] = React.useState(false)
    const handleClick = () => toggle(!visible)

    return (
        <div style={{width: 200}}>
            <button onClick={handleClick}>
                toggle css
            </button>
            <CSSTransition
                timeout={300}
                in={visible}
                name="slide-fade">
                <p style={{color: "red"}}>hello</p>
            </CSSTransition>
        </div >
    )
}