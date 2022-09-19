import * as React from "react"
import OffCanvas from "../../src/OffCanvas"

export default () => {
    const [visible, update] = React.useState(false)
    const handleClick = () => update(!visible)
    const [visible2, update2] = React.useState(false)
    const handleClick2 = () => update2(!visible2)
    const onClose = (v: string) => {
        update(false)
        console.log(v)
    }
    const onClose2 = (v: string) => {
        update2(false)
        console.log(v)
    }

    return (
        <>
            <div>
                <button
                    className="btn btn-primary"
                    onClick={handleClick}>
                    Toggle
                </button>
                <button
                    className="btn btn-danger"
                    onClick={handleClick2}
                    style={{float: "right"}}
                >Another OffCanvas</button>
            </div>
            <OffCanvas
                visible={visible}
                title="Off canvas"
                backdrop={false}
                onClose={onClose}>
                Some text as placeholder.
                In real life you can have the elements you have chosen.
                Like, text, images, lists, etc.
            </OffCanvas>
            <OffCanvas
                visible={visible2}
                title="Another off canvas"
                placement="end"
                onClose={onClose2}>
                Some text as placeholder.
                In real life you can have the elements you have chosen.
                Like, text, images, lists, etc.
            </OffCanvas>
        </>
    )
}