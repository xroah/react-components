import {
    RefAttributes,
    ForwardRefExoticComponent,
    FunctionComponent
} from "react";
import ButtonGroup from "./ButtonGroup";
import Button, { ButtonProps } from "./Button";
import Toggle from "./ToggleButton";
import { createComponentByClass } from "../utils";
import ToggleGroup from "./ToggleGroup";
import { CommonProps } from "../CommonPropsInterface";

interface ButtonInterface {
    Group: typeof ButtonGroup;
    Toolbar: FunctionComponent<CommonProps<HTMLDivElement>>;
    Toggle: typeof Toggle;
    ToggleGroup: typeof ToggleGroup;
}

type ButtonType = ButtonInterface & ForwardRefExoticComponent<ButtonProps & RefAttributes<HTMLButtonElement | HTMLAnchorElement>>;

const _Button = Button as ButtonType;

_Button.Group = ButtonGroup;
_Button.Toolbar = createComponentByClass({
    className: "btn-toolbar",
    displayName: "ButtonToolbar"
});
_Button.Toggle = Toggle;
_Button.ToggleGroup = ToggleGroup;

export default _Button;
