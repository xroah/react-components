import React, {
    CSSProperties,
    FC,
    ReactElement,
    useRef,
    useState
} from "react"
import Popup, { PopupCommonProps, PopupProps } from "../popup/popup"
import { DivPropsWithNodeTitle, OneOf } from "../commons/types"
import { classnames } from "r-layers/utils"

const placements = ["top", "right", "bottom", "left"] as const
type Placement = OneOf<typeof placements>

interface TooltipProps
    extends PopupCommonProps, DivPropsWithNodeTitle {
    delay?: number
    children: ReactElement
    placement?: Placement
}

const Tooltip: FC<TooltipProps> = (
    {
        anchorRef,
        title,
        children,
        offset,
        flip,
        transition,
        transitionClass,
        timeout,
        placement = "top",
        visible,
        className,
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
    const getClassName = (placement: Placement) => {
        return classnames(
            className,
            "show",
            `bs-tooltip-${placementMap.get(placement)}`,
            PREFIX
        )
    }
    const arrowRef = useRef<HTMLDivElement>(null)
    const [arrowStyle, setArrowStyle] = useState<CSSProperties>({
        position: "absolute"
    })
    const [
        tooltipClass,
        setTooltipClass
    ] = useState(getClassName(placement))
    const overlay = (
        <div className={tooltipClass} {...restProps}>
            <div
                ref={arrowRef}
                style={arrowStyle}
                className={`${PREFIX}-arrow`} />
            <div className={`${PREFIX}-inner`}>
                {title}
            </div>
        </div>
    )
    const popupProps: PopupProps = {
        anchorRef,
        children,
        offset,
        flip,
        flipAlignment: false,
        transition,
        transitionClass,
        timeout,
        placement,
        visible,
        arrowRef,
        overlay,
        onUpdate({
            placement: updatedPlacement,
            middlewareData
        }) {
            setTooltipClass(
                getClassName(updatedPlacement as Placement)
            )

            const { x, y } = middlewareData.arrow || {}
            console.log(middlewareData.arrow)
            console.log(updatedPlacement)
            setArrowStyle({
                ...arrowStyle,
                transform: `translate(${x ?? 0}px, ${y ?? 0}px)`
            })
        }
    }

    return (
        <Popup {...popupProps}>
            {children}
        </Popup>
    )
}

export default Tooltip