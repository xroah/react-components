import * as React from "react"
import Collapse, {CollapseProps} from "../Collapse"
import {PREFIX} from "./constants"

const NavbarCollapse: React.FunctionComponent<CollapseProps> = (
    {
        children,
        ...restProps
    }
) => (
    <Collapse {...restProps}>
        <div className={`${PREFIX}-collapse`}>
            {children}
        </div>
    </Collapse>
)

export default NavbarCollapse