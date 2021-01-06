import * as React from "react"
import {
    Col,
    Form,
    Row,
    Input,
    Checkbox,
    Button
} from "reap-ui"

export default () => {
    const [validated, updateValidated] = React.useState(false)
    const onSubmit = evt => {
        const form = evt.currentTarget

        if (!form.checkValidity()) {
            evt.preventDefault()
            evt.stopPropagation()
        }

        updateValidated(true)
    }

    return (
        <Form
            validated={validated}
            onSubmit={onSubmit}>
            <Row form>
                <Col md={{span: 4}} className="mb-3">
                    <Form.Item
                        control
                        label
                        labelText="First name"
                        htmlFor="validationCustom11">
                        <Input required />
                    </Form.Item>
                </Col>
                <Col md={{span: 4}} className="mb-3">
                    <Form.Item
                        control
                        label
                        labelText="Last name"
                        htmlFor="validationCustom12">
                        <Input required />
                    </Form.Item>
                </Col>
                <Col md={{span: 4}} className="mb-3">
                    <Form.Item
                        label
                        labelText="Username"
                        htmlFor="validationCustom13">
                        <Input prepend="@" required />
                    </Form.Item>
                </Col>
            </Row>
            <Row form>
                <Col md={{span: 6}} className="mb-3">
                    <Form.Item
                        control
                        label
                        labelText="City"
                        htmlFor="validationCustom14">
                        <Input required />
                    </Form.Item>
                </Col>
                <Col md={{span: 3}} className="mb-3">
                    <Form.Item
                        control
                        label
                        labelText="State"
                        htmlFor="validationCustom15">
                        <select defaultValue="" required>
                            <option value="" disabled>Choose...</option>
                            <option>...</option>
                        </select>
                    </Form.Item>
                </Col>
                <Col md={{span: 3}} className="mb-3">
                    <Form.Item
                        control
                        label
                        labelText="zip"
                        htmlFor="validationCustom16">
                        <Input required />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Checkbox id="invalidCheck2" required>
                    Agree to terms and conditions
                </Checkbox>
            </Form.Item>
            <Button type="submit">Submit</Button>
        </Form>
    )
}