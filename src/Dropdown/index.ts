import Menu from "./Menu"
import Divider from "./Divider"
import Item from "./Item"
import Dropdown from "./Dropdown"

interface DropdownType {
    Menu: typeof Menu
    Divider: typeof Divider
    Item: typeof Item
}

const _Dropdown = Dropdown as DropdownType & typeof Dropdown

_Dropdown.Menu = Menu
_Dropdown.Divider = Divider
_Dropdown.Item = Item

export default _Dropdown