import * as React from "react";
import { Input, Checkbox, Radio } from "reap-ui";

const style = {marginRight: "-.5rem"};

export default () => (
    <>
        <Input
            prepend={
                <Input.Text>
                    <Checkbox style={style} />
                </Input.Text>
            } />
        <Input
            prepend={
                <Input.Text>
                    <Radio style={style} />
                </Input.Text>
            } />
    </>
);