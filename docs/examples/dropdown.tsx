import Button from "r-layers/basics/button"
import Dropdown from "r-layers/dropdown/dropdown"
import React from "react"

export default function DropdownExample() {
    const ref = React.useRef<HTMLButtonElement>(null)
    const customRef = React.useRef<HTMLButtonElement>(null)

    return (
        <div style={{ margin: "500px 200px" }}>
            <Dropdown
                anchorRef={ref}
                placement="bottom-end"
                inline
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
                <Button ref={ref} variant="info">
                    Toggle dropdown
                </Button>
            </Dropdown>
            <Dropdown
                anchorRef={customRef}
                inline
                menu={
                    <div
                        style={{
                            background: "indigo",
                            width: 300,
                            height: 200
                        }} />
                }>
                <button ref={customRef} type="button">
                    Toggle custom dropdown
                </button>
            </Dropdown>
        </div>
    )
}