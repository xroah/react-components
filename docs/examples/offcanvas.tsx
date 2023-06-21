import React from "react"
import Button from "r-components/button"
import OffCanvas from "r-components/offcanvas"

export default function OffCanvasExample() {
    const [visible, toggle] = React.useState(false)
    const handleClick = () => toggle(!visible)
    const handleClose = () => toggle(false)
    
    return (
        <div>
            <Button onClick={handleClick}>
                Toggle OffCanvas
            </Button>
            <OffCanvas
                title="Off canvas"
                onClose={handleClose}
                visible={visible}
                backdrop={"static"}
                placement="end">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem eum voluptatibus corporis quisquam nisi, quas veritatis, nulla voluptates voluptatum repellat sunt quaerat molestias aspernatur deserunt. Soluta at accusantium culpa numquam!
            </OffCanvas>
        </div>
    )
}