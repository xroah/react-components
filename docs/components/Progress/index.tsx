import * as React from "react";
import { Progress } from "reap-ui";

export default () => (
    <>
        <Progress className="mb-3" showLabel value={30} variant="success"></Progress>
        <Progress value={30} variant="danger"></Progress>
    </>
);