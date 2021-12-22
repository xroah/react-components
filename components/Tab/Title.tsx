import * as React from "react"
import Nav from "../Nav"
import {EType, TitleProps} from "./types";

const Title: React.FunctionComponent<TitleProps> = (
    {
        onClick,
        itemKey,
        children,
        ...restProps
    }
) => {
    const handleClick = (evt: EType) => {
        if (onClick) {
            onClick(itemKey, evt)
        }
    }

    return (
        <Nav.Item>
            <Nav.Link
                onClick={handleClick}
                tag="button"
                {...restProps}>
                {children}
            </Nav.Link>
        </Nav.Item>
    )
}

export default Title