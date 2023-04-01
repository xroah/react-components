import React, {
    FC,
    ReactNode,
    useRef
} from "react"
import Trigger, {
    PlacementsWithoutAlignment,
    CommonProps
} from "../popup/trigger"
import { classnames, getRealDir } from "../utils"
import { Placement } from "@floating-ui/dom"

interface TooltipProps extends Omit<CommonProps, "title"> {
    placement?: PlacementsWithoutAlignment
    title: ReactNode
}

const Tooltip: FC<TooltipProps> = (
    {
        title,
        children,
        className,
        placement = "top",
        trigger = "hover",
        ...restProps
    }: TooltipProps
) => {
    const PREFIX = "tooltip"
    const getClass = (placement: Placement) => {
        return classnames(
            className,
            `bs-tooltip-${getRealDir(placement)}`,
            PREFIX
        )
    }
    const overlay = (
        <div className={`${PREFIX}-inner`}>
            {title}
        </div>
    )
    const floatingRef = useRef<HTMLElement>(null)

    return (
        <Trigger
            floatingRef={floatingRef}
            overlay={overlay}
            placement={placement}
            trigger={trigger}
            arrowProps={{ className: `${PREFIX}-arrow` }}
            getClass={getClass}
            arrow
            {...restProps}>
            {children}
        </Trigger>
    )
}

export default Tooltip