import * as React from "react";
import Alert from "../../../src/Alert";
import Button from "../../../src/Button";

export default function Dismissible() {
    const [visible, setVisible] = React.useState(true);

    const toggle = () => {
        setVisible(!visible);
    };

    return (
        <>
            <h4>Toggle</h4>
            <Button onClick={toggle}>Toggle</Button>
            <Alert className="mt-3" visible={visible} variant="danger">
                Holy guacamole! You should check in on some of those fields below.
            </Alert>
        </>
    );
}