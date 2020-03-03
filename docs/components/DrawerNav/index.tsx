import * as React from "react";
import DocNav from "../DocNav";
import Drawer from "../../../components/extra/Drawer";
import { Button } from "reap-ui";

export default () => {
    const [visible, updateVisible] = React.useState(false);
    const toggle = () => updateVisible(!visible);

    return (
        <Drawer
            forceRender
            visible={visible}
            width={200}
            onClose={toggle}
            className="d-md-none drawer-nav">
            <Button
                variant="light"
                className="open-btn"
                onClick={toggle}>
                <span className={`menu-icon ${visible ? "opened" : ""}`} />
            </Button>
            <DocNav />
        </Drawer>
    );
}