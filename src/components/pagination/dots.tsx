import React, { FC } from "react"
import Item, { PaginationItemProps } from "./item"
import ThreeDots from "../icons/three-dots"
import ChevronDoubleLeft from "../icons/chevron-double-left"
import ChevronDoubleRight from "../icons/chevron-double-right"

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

export default Dots