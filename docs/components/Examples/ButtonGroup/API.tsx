import * as React from "react"
import PropsTable from "../../PropsTable"
import LangMsg from "../../Language/LanguageMessage"
import NoAPI from "../../NoAPI"

const ButtonGroupProps = [{
    name: "size",
    type: "\"sm\" | \"lg\"",
    description: <LangMsg id="groupSizeApi" />
}, {
    name: "vertical",
    type: "boolean",
    default: "false",
    description: <LangMsg id="verticalApi" />
}]
const ToggleGroupProps = [{
    name: "type",
    type: "\"checkbox\" | \"radio\"",
    description: <LangMsg id="tgGroupTypeApi" />
}]

export default () => (
    <>
        <PropsTable title="Button.Group" data={ButtonGroupProps} />
        <PropsTable title="Button.ToggleGroup" data={ToggleGroupProps} />
        <NoAPI title="Button.Toolbar" />
    </>
)