import * as React from "react"
import Checkbox from "reap-ui/Form/Checkbox"
import Radio from "reap-ui/Form/Radio"
import Switch from "reap-ui/Form/Switch"
import Text from "reap-ui/Utilities/Text"

export default() => (
    <div className="my-3">
        <Text color="success" size={3}>
            <p>Form</p>
        </Text>
        <div>
            <Checkbox>Default checkbox</Checkbox>
            <Checkbox defaultChecked>Default checked checkbox</Checkbox>
        </div>
        <div>
            <Radio name="radio">Default radio</Radio>
            <Radio name="radio" defaultChecked>Default checked radio</Radio>
        </div>
        <div>
            <Switch>Default switch checkbox input</Switch>
            <Switch defaultChecked>Default switch checkbox input</Switch>
        </div>
    </div>
)