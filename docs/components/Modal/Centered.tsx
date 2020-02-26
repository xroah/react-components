import * as React from "react";
import { Modal, Button } from "reap-ui";

export default () => {
    const [visible, setVisible] = React.useState(false);
    const toggle = () => setVisible(!visible);

    return (
        <>
            <Button onClick={toggle}>Vertically centered modal</Button>
            <Modal
                visible={visible}
                title="Modal title"
                centered
                onCancel={toggle}>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            </Modal>
        </>
    );
};