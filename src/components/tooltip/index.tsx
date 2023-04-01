import React, {
    FC,
    ReactNode,
    useRef,
    useState
} from "react"
import Trigger, {
    PlacementsWithoutAlignment,
    CommonProps,
    placementsWithoutAlignment
} from "../popup/trigger"
import { classnames } from "../utils"
import { ComputePositionReturn } from "@floating-ui/dom"

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
        fallbackPlacements = [...placementsWithoutAlignment],
        onUpdate,
        ...restProps
    }: TooltipProps
) => {
    const PREFIX = "tooltip"
    const placementMap = new Map([
        ["right", "end"],
        ["left", "start"],
        ["top", "top"],
        ["bottom", "bottom"]
    ])
    const getClassName = (placement: PlacementsWithoutAlignment) => {
        return classnames(
            className,
            `bs-tooltip-${placementMap.get(placement)}`,
            PREFIX
        )
    }
    const [
        tooltipClass,
        setTooltipClass
    ] = useState(getClassName(placement))
    const handleUpdate = (data: ComputePositionReturn) => {
        const { placement } = data

        setTooltipClass(
            getClassName(placement as PlacementsWithoutAlignment)
        )
        onUpdate?.(data)
    }
    const overlay = (
        <div className={`${PREFIX}-inner`}>
            {title}
        </div>
    )
    const floatingRef = useRef<HTMLElement>(null)

    return (
        <Trigger
            className={tooltipClass}
            floatingRef={floatingRef}
            overlay={overlay}
            placement={placement}
            trigger={trigger}
            arrowProps={{ className: `${PREFIX}-arrow` }}
            onUpdate={handleUpdate}
            fallbackPlacements={fallbackPlacements}
            arrow
            {...restProps}>
            {children}
        </Trigger>
    )
}

export default Tooltip