import React, {
    FC,
    ReactNode,
    useState
} from "react"
import Trigger, {
    PlacementsWithoutAlignment,
    placementsWithoutAlignment,
    TriggerProps
} from "../popup/trigger"
import { classnames, getRealDir } from "../utils"
import { ComputePositionReturn, Placement } from "@floating-ui/dom"
import useArrow from "../popup/arrow"
import { node, oneOf } from "prop-types"

export interface TooltipProps extends
    Omit<TriggerProps, "title" | "overlay" | "arrowRef"> {
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
        onUpdate,
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
    const [
        arrow,
        arrowRef,
        updatePosition
    ] = useArrow(`${PREFIX}-arrow`)
    const [classes, setClasses] = useState(getClass(placement))
    const handleUpdate = (data: ComputePositionReturn) => {
        updatePosition(data)
        setClasses(getClass(data.placement))
        onUpdate?.(data)
    }
    const overlay = (
        <>
            {arrow}
            <div className={`${PREFIX}-inner`}>
                {title}
            </div>
        </>
    )

    return (
        <Trigger
            overlay={overlay}
            className={classes}
            placement={placement}
            trigger={trigger}
            arrowRef={arrowRef}
            onUpdate={handleUpdate}
            {...restProps}>
            {children}
        </Trigger>
    )
}

Tooltip.propTypes = {
    placement: oneOf(placementsWithoutAlignment),
    title: node
}

export default Tooltip