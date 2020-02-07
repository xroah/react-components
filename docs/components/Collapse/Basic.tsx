import * as React from "react";
import { Collapse, Button, Card } from "reap-ui";

export default () => {
    const [isOpen, updateState] = React.useState(false);
    const handleClick = () => updateState(!isOpen);

    return (
        <>
            <Button onClick={handleClick} className="mb-2">Toggle</Button>
            <Collapse isOpen={isOpen}>
                <Card body>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate, non eos! Dolorum vitae ut quod dolore illo minima quas in nisi eveniet voluptate tenetur magni voluptatum, optio id assumenda iste?
                </Card>
            </Collapse>
        </>
    );
};