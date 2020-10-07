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
    const onValidate = (valid: boolean) => {
        console.log("Validation result", valid)
    }

    return (
        <Form onValidate={onValidate}>
            <Row form>
                <Col md={{span: 6}} className="mb-3">
                    <Form.Item
                        control
                        label
                        labelText="First name"
                        htmlFor="validationCustom01"
                        validText="Looks good!"
                    >
                        <Input required />
                    </Form.Item>
                </Col>
                <Col md={{span: 6}} className="mb-3">
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
            </Row>
            <Row form>
                <Col md={{span: 6}} className="mb-3">
                    <Form.Item
                        control
                        label
                        labelText="City"
                        htmlFor="validationCustom3"
                        invalidText="Please provide a valid city">
                        <Input required />
                    </Form.Item>
                </Col>
                <Col md={{span: 3}} className="mb-3">
                    <Form.Item
                        label
                        labelText="State"
                        htmlFor="validationCustom4"
                        invalidText="Please select a valid state">
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
                        htmlFor="validationCustom5"
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