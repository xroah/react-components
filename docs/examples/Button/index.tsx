import * as React from "react"
import Button from "reap-ui/Button"

export default () => {
    const [active, toggle] = React.useState(true)
    const handleClick = () => {
        toggle(!active)
    }

    return (
        <>
            <div className="btn-examples">
                <div>
                    <Button>Primary</Button>
                    <Button variant="link">Link</Button>
                    <Button href="#">Link</Button>
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
                <div className="mb-2">
                    <Button type="checkbox">Checkbox</Button>
                </div>
            </div>
            <Button.Group className="me-2">
                <Button>Left</Button>
                <Button active>Middle</Button>
                <Button>Right</Button>
            </Button.Group>
            <Button.Group size="lg" className="me-2">
                <Button variant="danger">Left</Button>
                <Button variant="warning">Middle</Button>
                <Button variant="success">Right</Button>
            </Button.Group>
            <Button.Group className="me-2">
                <Button outline>Left</Button>
                <Button outline>Middle</Button>
                <Button outline>Right</Button>
            </Button.Group >
            <Button.Group className="me-2">
                <Button type="checkbox" outline>Left</Button>
                <Button type="checkbox" outline>Middle</Button>
                <Button type="checkbox" outline>Right</Button>
            </Button.Group>
            <Button.Group className="me-2">
                <Button type="radio" name="radioBtn" outline>Left</Button>
                <Button type="radio" name="radioBtn" outline>Middle</Button>
                <Button type="radio" name="radioBtn" outline>Right</Button>
            </Button.Group>
            <div className="ms-2">
                <Button.Group vertical>
                    <Button variant="dark">Left</Button>
                    <Button variant="dark">Middle</Button>
                    <Button variant="dark">Right</Button>
                </Button.Group>
            </div>
            <div>
                <Button.Close disabled />
            </div>
            <div className="bg-dark">
                <Button.Close variant="white" />
            </div>
        </>
    )
}