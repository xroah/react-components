import * as React from "react"
import Form from "reap-ui/Form/Form"
import Row from "reap-ui/Layout/Row"
import Col from "reap-ui/Layout/Col"
import FormItem from "reap-ui/Form/Item"
import Input from "reap-ui/Form/Input"
import Checkbox from "reap-ui/Form/Checkbox"
import Feedback from "reap-ui/Form/Feedback"
import Button from "reap-ui/Button"
import Text from "reap-ui/Utilities/Text"

export default () => {
    const [validated, update] = React.useState(false)
    const formRef = React.useRef<HTMLFormElement>()
    const handleSubmit = (evt: React.FormEvent) => {
        if (formRef.current && !formRef.current.checkValidity()) {
            evt.preventDefault()
        }

        update(true)
    }
    const TOOLTIP = true

    return (
        <>
            <Text size={1} color="danger">
                <p>Form validation</p>
            </Text>
            <Form
                ref={formRef}
                noValidate
                size="sm"
                validated={validated}
                className="my-3 needs-validation">
                <Row gutters={3}>
                    <FormItem
                        label="First name"
                        htmlFor="validationCustom01"
                        wrapper={<Col span={{md: 4}} />}>
                        <Input id="validationCustom01" required />
                        <Feedback tooltip={TOOLTIP} invalid="Required" />
                    </FormItem>
                    <FormItem
                        label="Last name"
                        htmlFor="validationCustom02"
                        wrapper={<Col span={{md: 4}} />}>
                        <Input id="validationCustom02" required />
                        <Feedback tooltip={TOOLTIP} invalid="Required" />
                    </FormItem>
                    <FormItem
                        label="Username"
                        htmlFor="validationCustomUsername"
                        wrapper={<Col span={{md: 4}} />}>
                        <Input.Group hasValidation>
                            <Input.Text>@</Input.Text>
                            <Input id="validationCustomUsername" required />
                            <Feedback
                                tooltip={TOOLTIP}
                                invalid="Please choose a username." />
                        </Input.Group>
                    </FormItem>
                    <FormItem
                        label="City"
                        htmlFor="validationCustom03"
                        wrapper={<Col span={{md: 6}} />}>
                        <Input id="validationCustom03" required />
                        <Feedback
                            tooltip={TOOLTIP}
                            invalid="Please provide a valid city." />
                    </FormItem>
                    <FormItem
                        label="State"
                        htmlFor="validationCustom04"
                        wrapper={<Col span={{md: 3}} />}>
                        <select className="form-select" required>
                            <option value="">Choose...</option>
                            <option value="...">...</option>
                        </select>
                        <Feedback
                            tooltip={TOOLTIP}
                            invalid="Please select a valid state." />
                    </FormItem>
                    <FormItem
                        label="Zip"
                        htmlFor="validationCustom05"
                        wrapper={<Col span={{md: 3}} />}>
                        <Input id="validationCustom05" required />
                        <Feedback
                            valid="Looks good"
                            tooltip={TOOLTIP}
                            invalid="Please provide a valid zip." />
                    </FormItem>
                    <FormItem wrapper={<Col span={12} />}>
                        <Checkbox label="Agree to terms and conditions" required>
                            <Feedback
                                tooltip={TOOLTIP}
                                invalid="You must agree before submitting" />
                        </Checkbox>
                    </FormItem>
                    <FormItem wrapper={<Col span={12} />}>
                        <Button onClick={handleSubmit} type="submit">Submit form</Button>
                    </FormItem>
                </Row>
            </Form>
        </>
    )
}