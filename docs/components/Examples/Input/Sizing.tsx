import * as React from "react";
import { Input } from "reap-ui";

export default () => (
    <>
        <Input sizing="sm" prepend="Small"/>
        <Input prepend="Default" />
        <Input sizing="lg" prepend="Large" />
    </>
);