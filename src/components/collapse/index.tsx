import React, {
    FC,
    useState,
    useRef,
    useCallback,
    CSSProperties,
    useMemo
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
    const collapseClass = useMemo(
        () => classnames(
            className,
            COLLAPSE
        ),
        [className]
    )
    const collapsingClass = useMemo(
        () => classnames(
            className,
            COLLAPSING
        ),
        [className]
    )
    const showClass = useMemo(
        () => collapseClass + " show",
        [collapseClass]
    )
    const [classes, setClasses] = useState(collapseClass)
    const [nodeStyle, setNodeStyle] = useState<CSSProperties>({})
    const nodeRef = useRef<HTMLDivElement>(null)
    const handleEnter = () => {
        setClasses(collapsingClass)
    }
    const handleEntering = () => {
        setNodeStyle({
            ...style,
            height: nodeRef.current?.scrollHeight
        })
    }
    const handleEntered = () => {
        onOpened?.()
        setClasses(showClass)
        setNodeStyle({ ...style })
    }
    const handleExit = () => {
        setNodeStyle({
            ...style,
            height: nodeRef.current?.scrollHeight
        })
    }
    const handleExiting = () => {
        setClasses(collapsingClass)
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
            setNodeStyle({ ...style })
            setClasses(collapseClass)
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