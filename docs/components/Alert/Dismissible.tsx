import * as React from "react";
import Alert, {AlertProps} from "../../../src/Alert";

export default function Dismissible() {
    const [visible, setVisible] = React.useState(true);

    const onClose = () => {
        setVisible(false);
    };

    return (
        <>
            <h4>Dismissing</h4>
            <Alert dismissible visible={visible} variant="warning" onClose={onClose}>
                Holy guacamole! You should check in on some of those fields below.
            </Alert>
        </>
    );
}