import * as React from "react";
import { Alert } from "reap-ui";

export default function Dismissible() {
    const [visible, setVisible] = React.useState(true);
    const onClose = () => {
        setVisible(false);
    };

    return (
        <>
            <Alert dismissible visible={visible} variant="warning" onClose={onClose}>
                Holy guacamole! You should check in on some of those fields below.
            </Alert>
        </>
    );
}