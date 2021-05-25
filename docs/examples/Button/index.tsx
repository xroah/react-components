import * as React from "react"
import Button from "reap-ui/Button"

export default () => {
    return (
        <>
            <Button>Primary</Button>
            <Button variant="link">Link</Button>
            <Button tag="a" href="#">Link</Button>
            <Button tag="input" variant="danger" type="reset" value="reset"/>
        </>
    )
}