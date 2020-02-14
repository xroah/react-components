import * as React from "react";
import { Input, Row } from "reap-ui";

export default () => (
    <>
        <Input prepend="@" placeholder="Username"/>
        <Input append="@example.com" placeholder="Recipient's username"/>

        <label htmlFor="basic-url">Your vanity URL</label>
        <Input id="basic-url" prepend="https://example.com/users"/>
        <Input prepend="$" append=".00"/>
        <Input variant="textarea" prepend="With textarea"/>
    </>
);