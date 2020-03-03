import * as React from "react";
import { Input, Button } from "reap-ui";

const button = <Button variant="secondary" outline>Button</Button>

export default () => (
    <>
        <Input prepend={button} />
        <Input append={button} />
        <Input prepend={<>{button}{button}</>} />
        <Input append={<>{button}{button}</>} />
    </>
);