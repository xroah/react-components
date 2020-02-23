import * as React from "react";
import { Toast, Spinner } from "reap-ui";

export default () => (
    <Toast
        title="Bootstrap"
        icon={<Spinner animation="border" size="sm" />}
        extra="11 minutes ago"
        closable
        autoHide
        visible
        delay={3000}>
        Hello, world! This is a toast message.
    </Toast>
);