import * as React from "react"
import Button from "reap-ui/Button"

export default () => {
    return (
        <div className="btn-examples">
            <Button>Primary</Button>
            <Button variant="link">Link</Button>
            <Button tag="a" href="#">Link</Button>
            <Button tag="input" variant="danger" type="reset" value="reset"/>
            <Button outline>Outline primary</Button>
            <Button size="lg">Large button</Button>
            <Button size="sm">Small button</Button>
        </div>
    )
}