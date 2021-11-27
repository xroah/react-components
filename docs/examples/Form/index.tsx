import * as React from "react"
import Checkbox from "reap-ui/Form/FormCheck/Checkbox"
import Radio from "reap-ui/Form/FormCheck/Radio"
import Switch from "reap-ui/Form/FormCheck/Switch"
import Floating from "reap-ui/Form/Floating"
import Form from "reap-ui/Form/Form"
import FormItem from "reap-ui/Form/Item"
import Input from "reap-ui/Form/Input"
import Text from "reap-ui/Utilities/Text"
import Row from "reap-ui/Layout/Row"
import Col from "reap-ui/Layout/Col"
import Button from "reap-ui/Button"
import Validation from "./Validation"
import Select from "reap-ui/Form/Select"

export default () => (
    <div className="my-3">
        <Text color="success" size={3}>
            <p>Form</p>
        </Text>
        <div>
            <Checkbox label="Default checkbox" />
            <Checkbox defaultChecked label="Default checked checkbox" />
        </div>
        <div>
            <Radio name="radio" label="Default radio" />
            <Radio name="radio" defaultChecked label="Default checked radio" />
        </div>
        <div>
            <Switch label="Default switch checkbox input" />
            <Switch defaultChecked label="Default switch checkbox input" />
        </div>
        <div className="my-3">
            <Floating label="Floating label" htmlFor="floating">
                <Input
                    placeholder="哈哈哈"
                    variant="textarea"
                    style={{height: 100}} />
            </Floating>
        </div>
        <FormItem
            className="mb-3"
            htmlFor="formGroupExampleInput"
            label="Example label">
            <Input id="formGroupExampleInput" placeholder="Example input placeholder" />
        </FormItem>
        <FormItem
            className="mb-3"
            htmlFor="formGroupExampleInput2"
            label="Another input placeholder">
            <Input id="formGroupExampleInput2" placeholder="Another input placeholder" />
        </FormItem>
        <Row className="my-3" gutters={3}>
            <FormItem wrapper={Col}>
                <Input placeholder="First name" />
            </FormItem>
            <FormItem wrapper={Col}>
                <Input placeholder="Last name" />
            </FormItem>
        </Row>
        <Form className="my-3">
            <Row gutters={3}>
                <FormItem
                    label="Email"
                    wrapper={<Col span={{md: 6}} />}
                    htmlFor="inputEmail4">
                    <Input type="email" id="inputEmail4" />
                </FormItem>
                <FormItem
                    label="Password"
                    wrapper={<Col span={{md: 6}} />}
                    htmlFor="password4">
                    <Input type="password" id="password4" />
                </FormItem>
                <FormItem
                    label="Address"
                    htmlFor="inputAddress"
                    wrapper={<Col span={12} />}>
                    <Input id="inputAddress" placeholder="1234 Main St" />
                </FormItem>
                <FormItem
                    label="Address 2"
                    htmlFor="inputAddress2"
                    wrapper={<Col span={12} />}>
                    <Input id="inputAddress2" placeholder="Apartment, studio, or floor" />
                </FormItem>
                <FormItem
                    wrapper={<Col span={{md: 6}} />}
                    htmlFor="inputCity"
                    label="City">
                    <Input id="inputCity" />
                </FormItem>
                <FormItem
                    wrapper={<Col span={{md: 4}} />}
                    htmlFor="inputState"
                    label="State">
                    <Select id="inputState" className="form-select" >
                        <option>Choose</option>
                        <option>...</option>
                    </Select>
                </FormItem>
                <FormItem
                    wrapper={<Col span={{md: 2}} />}
                    htmlFor="inputZip"
                    label="Zip">
                    <Input id="inputZip" />
                </FormItem>
                <FormItem wrapper={<Col span={12} />}>
                    <Checkbox>Check me out</Checkbox>
                </FormItem>
                <FormItem wrapper={<Col span={12} />}>
                    <Button type="submit">Sign in</Button>
                </FormItem>
            </Row>
        </Form>
        <Text color="danger" size={3}>
            <div>Horizontal form</div>
        </Text>
        <Form
            labelCol={{sm: 2}}
            childrenCol={{sm: 10}}
            labelSize="sm"
            itemWrapper={<Row className="mb-3" />}>
            <FormItem
                label="Email"
                htmlFor="inputEmail3">
                <Input id="inputEmail3" />
            </FormItem>
            <FormItem
                label="Password"
                htmlFor="inputPassword3">
                <Input id="inputPassword3" />
            </FormItem>
            <FormItem
                label="Radios"
                labelSize="lg">
                <Radio name="gridRadios" label="First radio" />
                <Radio name="gridRadios" label="Second radio" />
                <Radio name="gridRadios" disabled label="Third radio" />
            </FormItem>
            <Row>
                <FormItem
                    childrenCol={false}
                    wrapper={<Col span={{sm: 10}} offset={{sm: 2}} />}>
                    <Checkbox label="Example Checkbox" />
                </FormItem>
            </Row>
            <Button>Sign in</Button>
        </Form>
        <Validation />
    </div>
)