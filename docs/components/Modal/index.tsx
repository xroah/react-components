import * as React from "react";
import { Modal, Button } from "reap-ui";

export default () => {
    const [visible, setVisible] = React.useState(true);
    const toggle = () => setVisible(!visible);

    return (
        <>
            <Button onClick={toggle}>TOGGLE</Button>
            <Modal
                visible={visible}
                title="MODAL"
                scrollable
                centered
                onCancel={toggle}>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            </Modal>
        </>
    );
};