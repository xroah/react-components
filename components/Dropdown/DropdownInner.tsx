import * as React from "react"
import PropTypes from "prop-types"
import {
    classNames,
    chainFunction
} from "../utils"
import Overlay, {
    CommonProps, handleDelay
} from "../Common/Overlay"
import {findDOMNode} from "react-dom"
import {DropdownContext} from "../Common/contexts"

export interface DropdownProps extends CommonProps {
    alignment?: "left" | "center" | "right"
    overlay: React.ReactElement
}

interface DropdownState {
    visible: boolean
    popupId: string
}

const ID_PREFIX = "reap-ui-dropdown"
const VALID_SELECTOR = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)"
const keySet = new Set(
    [
        "arrowup",
        "arrowdown",
        "escape",
        "tab",
        "esc"
    ]
)
let uuid = 0

export default class Dropdown extends React.Component<DropdownProps, DropdownState> {

    static propTypes = {
        alignment: PropTypes.oneOf(["left", "center", "right"]),
        overlay: PropTypes.element.isRequired
    }
    static defaultProps = {
        trigger: "click",
        alignment: "left"
    }

    private delayTimer: NodeJS.Timeout | null = null

    constructor(props: DropdownProps) {
        super(props)

        this.state = {
            visible: !!props.visible || !!props.defaultVisible,
            popupId: `${ID_PREFIX}-${uuid++}`
        }
    }

    static getDerivedStateFromProps(props: DropdownProps, state: DropdownProps) {
        if ("visible" in props) {
            return {
                visible: props.visible
            }
        }

        return state
    }

    componentDidUpdate(prevProps: DropdownProps, prevState: DropdownState) {
        if (prevState.visible !== this.state.visible) {
            this.handleUpdated()
        }
    }

    handleUpdated() {
        const {
            visible
        } = this.state
        const node = findDOMNode(this)
        let parent: HTMLElement | null

        if (node && (parent = node.parentElement)) {
            visible ?
                parent.classList.add("show") :
                parent.classList.remove("show")
        }
    }

    isControlled() {
        return "visible" in this.props
    }

    setVisible(visible: boolean) {
        if (
            this.isControlled() ||
            this.state.visible === visible
        ) {
            return
        }

        if (this.delayTimer !== null) {
            clearTimeout(this.delayTimer)
            this.delayTimer = null
        }

        const {
            show = 0,
            hide = 0
        } = handleDelay(this.props.delay)
        const callback = () => this.setState({
            visible
        })
        this.delayTimer = setTimeout(
            callback,
            visible ? show : hide
        )
    }

    open() {
        this.setVisible(true)
    }

    close = () => {
        this.setVisible(false)
    }

    escClose(key: string) {
        if (!this.state.visible) {
            return
        }

        if (key === "escape" || key === "esc") {
            const node = findDOMNode(this) as HTMLElement

            if (node) {
                node.focus()
            }
            this.close()
        }
    }

    handleClick = (evt: React.MouseEvent) => {
        this.setVisible(!this.state.visible)
        evt.preventDefault()
        evt.stopPropagation()
    }

    handleKeyDown = (evt: React.KeyboardEvent) => {
        const key = evt.key.toLowerCase()
        const target = evt.target as HTMLButtonElement
        const {
            visible, popupId
        } = this.state
        const tag = target.tagName.toLowerCase()
        const isInput = /input|textarea/.test(tag)

        if (
            this.isControlled() ||
            !keySet.has(key) ||
            !visible && key === "tab" ||
            isInput && (key === "arrowup" || key === "arrowdown") ||
            target.disabled ||
            target.classList.contains("disabled")
        ) {
            return
        }

        evt.preventDefault()
        evt.stopPropagation()

        if (key === "arrowup" || key === "arrowdown" || key === "tab") {
            const popupElement = document.getElementById(popupId)

            if (!visible && key !== "tab") {
                return this.open()
            }

            if (popupElement) {
                const item = popupElement.querySelector(VALID_SELECTOR) as HTMLElement

                item && item.focus()
            }
        }

        this.escClose(key)
    }

    handlePopupKeydown = (evt: React.KeyboardEvent) => {
        const key = evt.key.toLowerCase()

        if (!keySet.has(key)) {
            return
        }

        evt.preventDefault()
        evt.stopPropagation()

        const parent = evt.currentTarget as HTMLElement
        const target = evt.target as HTMLElement
        const allItems = parent.querySelectorAll(VALID_SELECTOR)
        const len = allItems.length
        let index = 0
        let el: HTMLElement | null = null

        Array.from(allItems).forEach((node, i) => {
            if (node === target) {
                index = i
            }
        })

        if (key === "arrowup" && index > 0) {
            index--
        }
        else if (
            (key === "arrowdown" || key === "tab") &&
            index < len - 1
        ) {
            index++
        }

        el = allItems[index] as HTMLElement

        el.focus()
        this.escClose(key)
    }

    render() {
        const {
            children,
            overlay,
            placement,
            ...otherProps
        } = this.props
        const {
            visible,
            popupId
        } = this.state

        if (!overlay) {
            return children
        }

        const positionMap: any = {
            left: "dropleft",
            top: "dropup",
            right: "dropright"
        }
        const position = positionMap[placement as string]
        let child = React.Children.only(children) as React.ReactElement<React.HTMLAttributes<HTMLElement>>
        const _overlay = (
            <DropdownContext.Provider value={{
                close: this.close,
                isDropdown: true
            }}>
                {overlay}
            </DropdownContext.Provider>
        )
        const {
            onClick,
            onKeyDown
        } = child.props
        child = React.cloneElement(
            child,
            {
                className: classNames(child.props.className, "dropdown-toggle"),
                onKeyDown: chainFunction(this.handleKeyDown, onKeyDown),
                onClick: chainFunction(this.handleClick, onClick)
            }
        )

        return (
            <Overlay
                popup={_overlay}
                visible={visible}
                placement={placement}
                onClickOutside={this.close}
                popupProps={{
                    className: position,
                    onKeyDown: this.handlePopupKeydown,
                    id: popupId
                }}
                {...otherProps}>
                {child}
            </Overlay>
        )
    }

}