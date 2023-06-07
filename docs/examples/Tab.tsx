import Tab from "r-components/tab"
import React from "react"

export default function TabExample() {
    return (
        <Tab  vertical>
            <Tab.Pane title="Home">
                Home tab
            </Tab.Pane>
            <Tab.Pane title="Profile">
                Profile tab
            </Tab.Pane>
            <Tab.Pane title="Contact">
                Contact tab
            </Tab.Pane>
            <Tab.Pane title="Disabled" disabled>
                Disabled
            </Tab.Pane>
        </Tab>
    )
}