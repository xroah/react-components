import { FunctionComponent } from "react";
import { createComponentByClass } from "../../utils";
import Menu from "./Menu";
import Item from "./MenuItem";
import Button from "./Button";
import Dropdown from "./Dropdown";
import { CommonProps } from "../../CommonPropsInterface";

interface DropdownComponent {
    Menu: typeof Menu;
    Item: typeof Item;
    Button: typeof Button;
    Divider: FunctionComponent<CommonProps<HTMLDivElement>>;
}

type DropdownType = typeof Dropdown & DropdownComponent;

const _Dropdown  = Dropdown as DropdownType;

_Dropdown.Menu = Menu;
_Dropdown.Item = Item;
_Dropdown.Button = Button;
_Dropdown.Divider = createComponentByClass({
    className: "dropdown-divider",
    displayName: "DropdownDivider"
});

export default _Dropdown;