import * as React from "react"
import {
    Tooltip, Button 
} from "reap-ui"

const text = (
    <>
        <em>Tooltip</em>
        &nbsp;<u>with</u>&nbsp;
        <b>HTML</b>
    </>
)

export default () => (
    <Tooltip title={text}>
        <Button variant="secondary">Tooltip with HTML</Button>
    </Tooltip>
)