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
            noValidate
            validated={validated}
            onSubmit={onSubmit}>
            <Row form>
                <Col md={{span: 4}} className="mb-3">
                    <Form.Item
                        control
                        label
                        labelText="First name"
                        htmlFor="validationCustom01"
                        validText="Looks good!">
                        <Input append="aaa" required />
                    </Form.Item>
                </Col>
                <Col md={{span: 4}} className="mb-3">
                    <Form.Item
                        control
                        label
                        labelText="Last name"
                        htmlFor="validationCustom2"
                        validText="Looks good!"
                        invalidText="Required">
                        <Input required />
                    </Form.Item>
                </Col>
                <Col md={{span: 4}} className="mb-3">
                    <Form.Item
                        label
                        labelText="Username"
                        htmlFor="validationCustom3"
                        invalidText="Please choose a username.">
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
                        htmlFor="validationCustom4"
                        invalidText="Please provide a valid city">
                        <Input required />
                    </Form.Item>
                </Col>
                <Col md={{span: 3}} className="mb-3">
                    <Form.Item
                        control
                        label
                        labelText="State"
                        htmlFor="validationCustom5"
                        invalidText="Please select a valid state">
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
                        htmlFor="validationCustom6"
                        invalidText="Please provide a valid zip">
                        <Input required />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item invalidText="You must agree before submitting.">
                <Checkbox id="invalidCheck" required>
                    Agree to terms and conditions
                </Checkbox>
            </Form.Item>
            <Button type="submit">Submit</Button>
        </Form>
    )
}