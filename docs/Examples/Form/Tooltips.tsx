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
                        htmlFor="validationCustom21"
                        validFeedback="Looks good!"
                        validationTooltip>
                        <Input required />
                    </Form.Item>
                </Col>
                <Col md={{span: 4}} className="mb-3">
                    <Form.Item
                        control
                        label
                        labelText="Last name"
                        htmlFor="validationCustom22"
                        validFeedback="Looks good!"
                        invalidFeedback="Required"
                        validationTooltip>
                        <Input required />
                    </Form.Item>
                </Col>
                <Col md={{span: 4}} className="mb-3">
                    <Form.Item
                        label
                        help="username"
                        labelText="Username"
                        htmlFor="validationCustom23"
                        invalidFeedback="Please choose a username."
                        validationTooltip>
                        <Input prepend="@" className="rounded" required />
                    </Form.Item>
                </Col>
            </Row>
            <Row form>
                <Col md={{span: 6}} className="mb-3">
                    <Form.Item
                        control
                        label
                        labelText="City"
                        help="city"
                        htmlFor="validationCustom24"
                        invalidFeedback="Please provide a valid city"
                        validationTooltip>
                        <Input required />
                    </Form.Item>
                </Col>
                <Col md={{span: 3}} className="mb-3">
                    <Form.Item
                        control
                        label
                        labelText="State"
                        htmlFor="validationCustom25"
                        invalidFeedback="Please select a valid state"
                        validationTooltip>
                        <select defaultValue="" className="custom-select" required>
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
                        htmlFor="validationCustom26"
                        invalidFeedback="Please provide a valid zip"
                        validationTooltip>
                        <Input required />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item
                invalidFeedback="You must agree before submitting."
                validationTooltip>
                <Checkbox id="invalidCheck3" required>
                    Agree to terms and conditions
                </Checkbox>
            </Form.Item>
            <Button type="submit">Submit</Button>
        </Form>
    )
}