import * as React from "react"
import { Input } from "reap-ui"

export default () => (
    <>
        <Input.Group>
            <Input prepend="First and last name" />
            <Input />
        </Input.Group>
    </>
)