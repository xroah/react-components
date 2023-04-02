import Button from "r-layers/basics/button"
import Dropdown from "r-layers/dropdown/dropdown"
import React from "react"

export default function DropdownExample() {
    const ref = React.useRef<HTMLButtonElement>(null)
    const customRef = React.useRef<HTMLButtonElement>(null)
    const customAnchorRef = React.useRef(null)

    return (
        <div style={{ margin: "500px 200px" }}>
            <Dropdown
                anchorRef={ref}
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
                            command: "b"
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
                floatingRef={customAnchorRef}
                inline
                menu={<div
                    ref={customAnchorRef}
                    style={{
                        background: "indigo",
                        width: 300,
                        height: 200
                    }} />}>
                <button ref={customRef}>
                    Toggle custom dropdown
                </button>
            </Dropdown>
        </div>
    )
}