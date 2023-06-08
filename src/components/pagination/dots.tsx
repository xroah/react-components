import React, { FC } from "react"
import Item, { PaginationItemProps } from "./item"
import ThreeDots from "../icons/three-dots"
import ChevronDoubleLeft from "../icons/chevron-double-left"
import { styled } from "styled-components"
import ChevronDoubleRight from "r-components/icons/chevron-double-right"

interface DotsProps extends PaginationItemProps {
    left?: boolean
}

const Dots: FC<DotsProps> = ({
    left,
    ...restProps
}) => {
    return (
        <Item className="page-dot" {...restProps}>
            <span><ThreeDots /></span>
            <span>
                {left ? <ChevronDoubleLeft /> : <ChevronDoubleRight/>}
            </span>
        </Item>
    )
}
const invisible = `
width: 0;
opacity: 0
`

export default styled(Dots)`
a {
    color: var(--bs-pagination-disabled-color);
}

span {
    display: inline-block;
}

span:last-child {
    ${invisible}
}

a:hover {
    color: var(--bs-pagination-color);

    span {
        transition: opacity .15s;
    }

    span:first-child {
        ${invisible}
    }

    span:last-child {
        width: auto;
        opacity: 1;
    }
}
`