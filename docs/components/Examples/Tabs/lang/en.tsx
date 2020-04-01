import * as React from "react";

export default {
    compDesc: "Note that dynamic tabbed interfaces should not contain dropdown menus, as this causes both usability and accessibility issues. From a usability perspective, the fact that the currently displayed tab’s trigger element is not immediately visible (as it’s inside the closed dropdown menu) can cause confusion. From an accessibility point of view, there is currently no sensible way to map this sort of construct to a standard WAI ARIA pattern, meaning that it cannot be easily made understandable to users of assistive technologies.",
    basicTitle: "Basic example",
    pillsTitle: "Pills",
    noAnimTitle: "Without animation",
    customTitle: "Customization",
    activeKeyApi: "The key of the active tab(controlled component)",
    defaultActiveKeyApi: "Initial key of the active tab(if both defaultActiveKey and activeKey are not passed, the first will be activated)",
    pillsApi: "Style as pills",
    fadeApi: "Enable fade animation when tab switches",
    onTabChangeApi: "Callback when tabs change",
    onTabClickApi: <>Callback when a tab is clicked(tab prop of <code>TabPane</code> must not be empty)</>,
    tabApi: "Title of the TabPane",
    disabledApi: "Disable the TabPane",
    keyApi: "A unique key for identifying the TabPane"
}