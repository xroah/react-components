import * as React from "react";
import { Checkbox } from "reap-ui";

export default () => {
    const ref = React.useRef(null);

    React.useEffect(() => {
        ref.current.indeterminate = true;
    });

    return <Checkbox ref={ref}>Check this custom checkbox</Checkbox>;
}