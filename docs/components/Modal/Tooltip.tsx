import * as React from "react";
import { Modal, Button, Tooltip, Popover } from "reap-ui";

export default () => {
    const [visible, setVisible] = React.useState(false);
    const toggle = () => setVisible(!visible);

    return (
        <>
            <Button onClick={toggle}>Launch demo modal</Button>
            <Modal
                visible={visible}
                title="Modal title"
                onCancel={toggle}>
                <h5>Popover in a modal</h5>
                <p>
                    This
                    <Popover
                        header="Popover title"
                        content="Popover body content is set in this attribute.">
                        <Button variant="secondary">button</Button>
                    </Popover>
                    triggers a popover on click.
                 </p>
                <hr />
                <h5>Tooltips in a modal</h5>
                <p>
                    <Tooltip text="Tooltip">
                        <a href="#">This link</a>
                    </Tooltip>
                    and
                    <Tooltip text="Tooltip">
                        <a href="#">That link</a>
                    </Tooltip>
                    have tooltips on hover.
                </p>
            </Modal>
        </>
    );
};