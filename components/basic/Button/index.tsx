import {
    RefAttributes,
    ForwardRefExoticComponent,
    FunctionComponent,
    HTMLAttributes
} from "react";
import ButtonGroup, { ButtonGroupProps } from "./ButtonGroup";
import Button, { ButtonProps } from "./Button";
import Toggle, { ToggleButtonProps } from "./ToggleButton";
import { createComponentByClass } from "../../utils";
import ToggleGroup, { ToggleGroupProps } from "./ToggleGroup";

interface ButtonInterface {
    Group: FunctionComponent<ButtonGroupProps>;
    Toolbar: FunctionComponent<HTMLAttributes<HTMLDivElement>>;
    Toggle: FunctionComponent<ToggleButtonProps>;
    ToggleGroup: FunctionComponent<ToggleGroupProps>;
}

type ButtonType = ButtonInterface & ForwardRefExoticComponent<ButtonProps & RefAttributes<HTMLButtonElement>>;

const _Button = Button as ButtonType;

_Button.Group = ButtonGroup as FunctionComponent<ButtonGroupProps>;
_Button.Toolbar = createComponentByClass({
    className: "btn-toolbar",
    displayName: "ButtonToolbar"
});
_Button.Toggle = Toggle;
_Button.ToggleGroup = ToggleGroup as FunctionComponent<ToggleGroupProps>;

export default _Button;
