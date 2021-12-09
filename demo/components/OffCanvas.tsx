import * as React from "react"
import OffCanvas from "../../src/OffCanvas"

export default () => {
    const [visible, update] = React.useState(false)
    const handleClick = () => update(!visible)

    return (
        <>
            <button
                className="btn btn-primary"
                onClick={handleClick}>
                Toggle
            </button>
            <OffCanvas
                visible={visible}
                title="Off canvas"
                onClose={() => update(false)}>
                Some text as placeholder.
                In real life you can have the elements you have chosen.
                Like, text, images, lists, etc.
            </OffCanvas>
        </>
    )
}