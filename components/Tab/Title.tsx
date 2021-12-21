import * as React from "react"
import Nav from "../Nav"
import {EType, TitleProps} from "./types";

const Title: React.FunctionComponent<TitleProps> = (
    {
        onClick,
        __key__,
        __active_key__,
        disabledKey,
        children
    }
) => {
    const handleClick = (evt: EType) => {
        if (onClick) {
            onClick(__key__!, evt)
        }
    }

    return (
        <Nav.Item>
            <Nav.Link
                onClick={handleClick}
                tag="button"
                disabled={disabledKey === __key__}
                active={__active_key__ === __key__}>
                {children}
            </Nav.Link>
        </Nav.Item>
    )
}

export default Title