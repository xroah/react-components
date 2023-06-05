import React, {
    FC,
    useState,
    useRef,
    useCallback,
    CSSProperties
} from "react"
import { Transition } from "react-transition-group"
import { DivProps } from "../commons/types"
import { classnames } from "../utils"

interface CollapseProps extends DivProps {
    open: boolean
    onOpened?: VoidFunction
    onClosed?: VoidFunction
}

const Collapse: FC<CollapseProps> = (
    {
        open,
        className,
        style,
        onClosed,
        onOpened,
        ...restProps
    }
) => {
    const COLLAPSE = "collapse"
    const COLLAPSING = "collapsing"
    const [classes, setClasses] = useState(classnames(
        className,
        COLLAPSE
    ))
    const [nodeStyle, setNodeStyle] = useState<CSSProperties>({})
    const nodeRef = useRef<HTMLDivElement>(null)
    const handleEnter = () => {
        setClasses(classnames(
            className,
            COLLAPSING
        ))
    }
    const handleEntering = () => {
        setNodeStyle({
            ...style,
            height: nodeRef.current?.scrollHeight
        })
        console.log(nodeRef.current?.scrollHeight)
    }
    const handleEntered = () => {
        onOpened?.()
        setClasses(classnames(
            className,
            COLLAPSE,
            "show"
        ))
        setNodeStyle({...style})
    }
    const handleExit = () => {
        setNodeStyle({
            ...style,
            height: nodeRef.current?.scrollHeight
        })
    }
    const handleExiting = () => {
        setClasses(classnames(
            className,
            COLLAPSING
        ))
        // reflow
        nodeRef.current?.offsetHeight
        setNodeStyle({
            ...style,
            height: 0
        })
    }
    const handleExited = useCallback(
        () => {
            onClosed?.()
            setNodeStyle({...style})
            setClasses(classnames(
                className,
                COLLAPSE
            ))
        },
        [classes]
    )

    return (
        <Transition
            in={open}
            timeout={350}
            onEnter={handleEnter}
            onEntering={handleEntering}
            onEntered={handleEntered}
            onExit={handleExit}
            onExiting={handleExiting}
            onExited={handleExited}>
            <div
                ref={nodeRef}
                style={nodeStyle}
                className={classes}
                {...restProps} />
        </Transition>
    )
}

export default Collapse