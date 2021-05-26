import * as React from "react"
import Button from "reap-ui/Button"

export default () => {
    const [active, toggle] = React.useState(true)
    const handleClick = () => {
        toggle(!active)
    }

    return (
        <div className="btn-examples">
            <div>
                <Button>Primary</Button>
                <Button variant="link">Link</Button>
                <Button tag="a" href="#">Link</Button>
                <Button tag="input" variant="danger" type="reset" value="reset" />
                <Button outline>Outline primary</Button>
                <Button size="lg">Large button</Button>
                <Button size="sm">Small button</Button>
            </div>
            <div>
                <Button.Toggle href="#">Toggle link</Button.Toggle>
                <Button.Toggle active={active} onClick={handleClick}>
                    Toggle button
                </Button.Toggle>
            </div>
        </div>
    )
}