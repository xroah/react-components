import Menu from "./Menu"
import Divider from "./Divider"
import Item from "./Item"

interface DropdownType {
    Menu: typeof Menu
    Divider: typeof Divider
    Item: typeof Item
}

const Dropdown: DropdownType = {
    Menu,
    Divider,
    Item
}

export default Dropdown