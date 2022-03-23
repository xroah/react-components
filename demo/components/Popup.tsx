import * as React from "react"
import Popup from "../../src/Popup"

export default () => {
    const btnRef = React.useRef<HTMLButtonElement>(null)
    const [visible, updateVisible] = React.useState(false)
    const handleClick = () => updateVisible(!visible)

    return (
        <div>
            <button ref={btnRef} onClick={handleClick}>popup</button>
            <Popup targetRef={btnRef} visible={visible}>
                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus repudiandae aperiam eius quaerat veritatis qui esse alias. Voluptate quis ad pariatur? Est, ea dolorem accusantium incidunt accusamus laudantium nobis suscipit!</div>
            </Popup>
        </div>
    )
}