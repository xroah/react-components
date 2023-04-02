import React, {
    FC,
    ReactNode,
    useState
} from "react"
import Trigger, {
    placementsWithoutAlignment,
    PlacementsWithoutAlignment,
    TriggerProps
} from "../popup/trigger"
import { ComputePositionReturn, Placement } from "@floating-ui/dom"
import { classnames, getRealDir } from "../utils"
import useArrow from "../popup/arrow"
import { node, oneOf } from "prop-types"

interface PopoverProps
    extends Omit<TriggerProps, "title" | "overlay" | "arrowRef"> {
    content: ReactNode
    placement?: PlacementsWithoutAlignment
    title?: ReactNode
}

const Popover: FC<PopoverProps> = (
    {
        className,
        title,
        children,
        content,
        offset = [8, 0],
        placement = "right",
        trigger = "click",
        onUpdate,
        ...restProps
    }: PopoverProps
) => {
    const PREFIX = "popover"
    const getClass = (placement: Placement) => {
        return classnames(
            className,
            PREFIX,
            placement && `bs-popover-${getRealDir(placement)}`
        )
    }
    const [classes, setClasses] = useState(getClass(placement))
    const [
        arrow,
        arrowRef,
        updatePosition
    ] = useArrow(`${PREFIX}-arrow`)
    const overlay = (
        <>
            {arrow}
            {
                title ? (
                    <div className={`${PREFIX}-header`}>
                        {title}
                    </div>
                ) : null
            }
            <div className={`${PREFIX}-body`}>
                {content}
            </div>
        </>
    )
    const handleUpdate = (data: ComputePositionReturn) => {
        updatePosition(data)
        setClasses(getClass(data.placement))
        onUpdate?.(data)
    }

    return (
        <Trigger
            className={classes}
            placement={placement}
            offset={offset}
            trigger={trigger}
            overlay={overlay}
            arrowRef={arrowRef}
            onUpdate={handleUpdate}
            {...restProps}>
            {children}
        </Trigger>
    )
}

Popover.propTypes = {
    content: node.isRequired,
    placeholder: oneOf(placementsWithoutAlignment),
    title: node
}

export default Popover