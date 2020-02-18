import * as React from "react";
import { Modal, Button } from "reap-ui";

export default () => {
    const [visible, setVisible] = React.useState(false);
    const toggle = () => setVisible(!visible);

    return (
        <>
            <Button onClick={toggle}>Launch static backdrop modal</Button>
            <Modal
                visible={visible}
                titleText="Modal title"
                backdrop="static"
                onCancel={toggle}>
                I will not close if you click outside me.
            </Modal>
        </>
    );
};