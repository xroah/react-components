import Tab from "r-components/tab"
import React, { Key, useState } from "react"

export default function TabExample() {
    const [activeKey, setActiveKey] = useState("home" as Key)
    const handleTabClick = (k: Key) => {
        setActiveKey(k)
    }

    return (
        <Tab
            vertical
            activeKey={activeKey}
            onChange={k => console.log(`Changed: ${k}`)}
            onTabClick={handleTabClick}>
            <Tab.Pane itemKey="home" title="Home">
                Home tab
            </Tab.Pane>
            <Tab.Pane itemKey="profile" title="Profile">
                Profile tab
            </Tab.Pane>
            <Tab.Pane itemKey="contact" title="Contact">
                Contact tab
            </Tab.Pane>
            <Tab.Pane itemKey="d" title="Disabled" disabled>
                Disabled
            </Tab.Pane>
        </Tab>
    )
}