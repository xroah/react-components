import * as React from "react"
import Nav from "../Nav"
import {Internal} from "./types";

interface TitleProps extends Internal {
    onClick?: (k?: string) => void
    disabledKey?: React.Key
}

const Title: React.FunctionComponent<TitleProps> = (
    {
        onClick,
        __key__,
        __active_key__,
        disabledKey,
        children
    }
) => {
    const handleClick = () => {
        if (onClick) {
            onClick(__key__)
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