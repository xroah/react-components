import * as React from "react";
import { Button } from "reap-ui";

export default () => {
    const [value, update] = React.useState("1");
    const handleClick = evt => update(evt.target.value);

    return (
        <Button.ToggleGroup type="radio">
            <Button.Toggle
                name="options"
                defaultValue="1"
                checked={value === "1"}
                onChange={handleClick}>
                Active
            </Button.Toggle>
            <Button.Toggle
                name="options"
                defaultValue="2"
                checked={value === "2"}
                onChange={handleClick}>
                Radio
            </Button.Toggle>
            <Button.Toggle
                name="options"
                defaultValue="3"
                checked={value === "3"}
                onChange={handleClick}>
                Radio
            </Button.Toggle>
        </Button.ToggleGroup>
    );
}