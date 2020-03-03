import * as React from "react";
import { Form, Input, Checkbox, Button } from "reap-ui";

const asterisk = <span style={{ color: "red"}}>*</span>;

export default () => (
    <Form>
        <Form.Item labelText={
            <>
                {asterisk}
                Email address
            </>
        } help="We'll never share your email with anyone else.">
            <Input />
        </Form.Item>
        <Form.Item labelText={
            <>
                {asterisk}
                Password
            </>
        }>
            <Input />
        </Form.Item>
        <Form.Item labelText="Extra textarea" control>
            <textarea rows={3}></textarea>
        </Form.Item>
        <Form.Item>
            <Checkbox>Check me out</Checkbox>
        </Form.Item>
        <Form.Item>
            <Button type="submit">Submit</Button>
        </Form.Item>
    </Form>
);