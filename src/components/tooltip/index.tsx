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
import { DivPropsWithNodeTitle } from "../commons/types"

export type OverlayProps = Omit<TriggerProps, "overlay" | "arrowRef"> &
    Omit<DivPropsWithNodeTitle, "children">

export interface TooltipProps extends OverlayProps {
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
        defaultVisible,
        onUpdate,
        ...restProps
    }: TooltipProps
) => {
    const PREFIX = "tooltip"
    const getClass = (placement: Placement) => {
        return classnames(
            className,
            `bs-tooltip-${getRealDir(placement)}`,
            "show",
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
        <div className={classes}>
            {arrow}
            <div className={`${PREFIX}-inner`}>
                {title}
            </div>
        </div>
    )

    return (
        <Trigger
            overlay={overlay}
            placement={placement}
            trigger={trigger}
            arrowRef={arrowRef}
            defaultVisible={defaultVisible}
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