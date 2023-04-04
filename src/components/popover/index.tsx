import React, {
    FC,
    ReactElement,
    ReactNode,
    useRef,
    useState
} from "react"
import Trigger, {
    placementsWithoutAlignment,
    PlacementsWithoutAlignment
} from "../popup/trigger"
import { ComputePositionReturn, Placement } from "@floating-ui/dom"
import { classnames, getRealDir } from "../utils"
import useArrow from "../popup/arrow"
import { node, oneOf } from "prop-types"
import { OverlayProps } from "../tooltip"

interface PopoverProps extends OverlayProps {
    content: ReactNode
    placement?: PlacementsWithoutAlignment
    title?: ReactNode
    children: ReactElement
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
        defaultVisible,
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
    const ref = useRef(null)
    const overlay = (
        <div ref={ref} className={classes}>
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
        </div>
    )
    const handleUpdate = (data: ComputePositionReturn) => {
        updatePosition(data)
        setClasses(getClass(data.placement))
        onUpdate?.(data)
    }

    return (
        <Trigger
            placement={placement}
            offset={offset}
            trigger={trigger}
            overlay={overlay}
            arrowRef={arrowRef}
            defaultVisible={defaultVisible}
            onUpdate={handleUpdate}
            {...restProps}>
            {children}
        </Trigger>
    )
}

Popover.propTypes = {
    content: node.isRequired,
    placement: oneOf(placementsWithoutAlignment),
    title: node
}

export default Popover