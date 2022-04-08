import * as React from "react"
import Popup from "../../src/Popup"

export default () => {
    const btnRef = React.useRef<HTMLButtonElement>(null)
    const [visible, updateVisible] = React.useState(false)
    const handleClick = () => updateVisible(!visible)
    const nodeRef = React.useRef<HTMLDivElement>(null)

    return (
        <div>
            <button ref={btnRef} onClick={handleClick}>popup</button>
            <Popup
                targetRef={btnRef}
                nodeRef={nodeRef}
                visible={visible}
                offset={[10, 20]}>
                <div ref={nodeRef} style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    maxWidth: 300,
                    backgroundColor: "skyblue"
                }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus repudiandae aperiam eius quaerat veritatis qui esse alias. Voluptate quis ad pariatur? Est, ea dolorem accusantium incidunt accusamus laudantium nobis suscipit!
                </div>
            </Popup>
        </div>
    )
}