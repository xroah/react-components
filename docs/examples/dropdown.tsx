import DropdownButton from "r-layers/dropdown/dropdown-button"
import React from "react"

export default function DropdownExample() {
    const [visible, setVisible] = React.useState(false)
    const toggle = () => setVisible(v => !v)

    return (
        <div style={{ margin: "500px 200px" }}>
            <DropdownButton
                placement="bottom-end"
                visible={visible}
                onClick={toggle}
                menu={{
                    onSelect: console.log,
                    header: "Header",
                    items: [
                        {
                            label: "Action",
                            command: "a"
                        },
                        {
                            label: "Disabled action",
                            command: "b",
                            disabled: true
                        },
                        {
                            label: "Something else here",
                            command: "c"
                        },
                        {
                            type: "divider",
                            label: ""
                        },
                        {
                            label: "Separated link",
                            command: "d"
                        }
                    ]
                }}>
                Toggle dropdown
            </DropdownButton>
            <DropdownButton
                split
                size="lg"
                variant="danger"
                menu={
                    <div
                        style={{
                            background: "indigo",
                            width: 300,
                            height: 200
                        }} />
                }>
                Toggle custom dropdown
            </DropdownButton>
        </div>
    )
}