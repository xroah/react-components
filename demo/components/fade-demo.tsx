import * as React from "react"
import Fade from "../../src/react/transition/Fade"

export const callbacks = {
    onEnter: () => console.log("onenter"),
    onEntering: () => console.log("entering"),
    onEntered: () => console.log("entered"),
    onExit: () => console.log("exit"),
    onExiting: () => console.log("exiting"),
    onExited: () => console.log("exited"),
}

export default function () {
    const [visible, update] = React.useState(false)
    const handleClick = () => update(!visible)

    return (
        <>
            <p>Fade demo</p>
            <button onClick={handleClick}>toggle</button>
            <Fade
                in={visible}
                {...callbacks}
                unmountOnExit>
                <div className="div" style={{lineHeight: 2}}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, labore maiores expedita at magnam perspiciatis consequuntur architecto voluptas quo quos eum repellendus repellat rerum officia accusamus odio nesciunt consectetur. Dignissimos.
                </div>
            </Fade>
            <div className="div">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam facilis nobis dignissimos optio quae. Temporibus saepe molestiae fugit cumque laudantium iure obcaecati sunt architecto atque suscipit quibusdam, eaque pariatur quas.
            </div>
        </>
    )
}