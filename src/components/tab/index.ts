import T from "./tab"
import Pane from "./pane"

type TabType = typeof T & {
    Pane: typeof Pane
}

const Tab = T as TabType

Tab.Pane = Pane

export default Tab