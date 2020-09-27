import * as React from "react"
import {
    Form, Input, Checkbox, Button 
} from "reap-ui"

export default () => (
    <Form inline>
        <Form.Item className="mr-sm-2">
            <Input placeholder="Jane Doe"/>
        </Form.Item>
        <Form.Item className="mr-sm-2">
            <Input prepend="@" placeholder="Username"/>
        </Form.Item>
        <Form.Item className="mr-sm-2">
            <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Button type="submit">Submit</Button>
    </Form>
)