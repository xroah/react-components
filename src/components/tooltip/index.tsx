import React, {
    FC,
    ReactNode,
    useRef,
    useState
} from "react"
import Trigger, {
    PlacementsWithoutAlignment,
    CommonProps
} from "../popup/trigger"
import { classnames, getRealDir } from "../utils"
import { ComputePositionReturn, Placement } from "@floating-ui/dom"
import useArrow from "../popup/arrow"

export interface TooltipProps extends Omit<CommonProps, "title"> {
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
    const floatingRef = useRef<HTMLElement>(null)
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
            floatingRef={floatingRef}
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

export default Tooltip