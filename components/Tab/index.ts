import Tab from "./Tab"
import Pane from "./Pane"

const T = <typeof Tab & {Pane: typeof Pane}>Tab

T.Pane = Pane

export default T