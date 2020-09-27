import * as React from "react"
import { Button } from "reap-ui"

export default () => {
    const [checked, update] = React.useState(true)
    const toggle = () => update(!checked)

    return (
        <Button.ToggleGroup type="checkbox">
            <Button.Toggle
                checked={checked}
                onChange={toggle}>
                Checked
            </Button.Toggle>
        </Button.ToggleGroup>
    )
}