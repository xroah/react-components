import * as React from "react";
import Drawer from "../../../../components/extra/Drawer";

export default () => {
    const [visible, updateVisible] = React.useState();
    const toggle = () => updateVisible(!visible);

    return (
        <>
            <button onClick={toggle}>open</button>
            <Drawer visible={visible} unmountOnClose onClose={toggle}></Drawer>
        </>
    );
}