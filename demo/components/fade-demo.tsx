import React, {useState} from "react"
import Fade from "../../src/Fade"

export default function () {
    const [visible, update] = useState(false)
    const handleClick = () => update(!visible)

    return (
        <>
            <p>Fade demo</p>
            <button onClick={handleClick}>toggle</button>
            <Fade in={visible} timeout={300}>
                <div className="div">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, labore maiores expedita at magnam perspiciatis consequuntur architecto voluptas quo quos eum repellendus repellat rerum officia accusamus odio nesciunt consectetur. Dignissimos.</div>
            </Fade>
        </>
    )
}