import * as React from "react";
import { Modal, Button } from "reap-ui";

export default () => {
    const [xlVisible, updateXlVisible] = React.useState(false);
    const toggleXl = () => updateXlVisible(!xlVisible);
    const [lgVisible, updateLgVisible] = React.useState(false);
    const toggleLg = () => updateLgVisible(!lgVisible);
    const [smVisible, updateSmVisible] = React.useState(false);
    const toggleSm = () => updateSmVisible(!smVisible);

    return (
        <>
            <Button.Group>
                <Button onClick={toggleXl}>Extra large modal</Button>
                <Button onClick={toggleLg}>Large modal</Button>
                <Button onClick={toggleSm}>Small modal</Button>
            </Button.Group>
            <Modal
                visible={xlVisible}
                titleText="Extra large modal"
                size="xl"
                onCancel={toggleXl}>
                Woohoo, you're reading this text in a modal!
            </Modal>
            <Modal
                visible={lgVisible}
                titleText="Large modal"
                size="lg"
                onCancel={toggleLg}>
                Woohoo, you're reading this text in a modal!
            </Modal>
            <Modal
                visible={smVisible}
                titleText="Small modal"
                size="sm"
                onCancel={toggleSm}>
                Woohoo, you're reading this text in a modal!
            </Modal>
        </>
    );
};