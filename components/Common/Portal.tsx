import * as React from "react"
import {createPortal} from "react-dom"
import PropTypes from "prop-types"

interface PortalProps {
    mountNode?: HTMLElement | string | false
    visible?: boolean
    forceRender?: boolean
}

interface PortalState {
    prevProps?: PortalProps
    _this: Portal
}

export default class Portal extends React.Component<PortalProps, PortalState> {

    private container: HTMLElement | null = null

    static propTypes = {
        mountNode: PropTypes.oneOfType([
            PropTypes.string,
            //node env(SSR) has no HTMLElement
            typeof HTMLElement === "undefined" ?
                PropTypes.object : PropTypes.instanceOf(HTMLElement),
            PropTypes.oneOf([false])
        ]),
        visible: PropTypes.bool,
        forceRender: PropTypes.bool
    }
    static defaultProps = {
        visible: false,
        forceRender: false,
        mountNode: "body"
    }

    static getDerivedStateFromProps(props: PortalProps, state: PortalState) {
        const {
            prevProps,
            _this
        } = state

        if (prevProps) {
            if (props.mountNode !== prevProps.mountNode) {
                _this.unmount()
            }
        }

        return {
            prevProps: props
        }
    }

    constructor(props: PortalProps) {
        super(props)

        this.state = {
            _this: this
        }
    }

    componentWillUnmount() {
        this.unmount()
    }

    getParent() {
        const {
            mountNode
        } = this.props

        if (!mountNode) {
            return document.body
        }

        if (typeof mountNode === "string") {
            return document.querySelector(mountNode)
        }

        if (mountNode.nodeType === 1 && mountNode.parentElement) {
            return mountNode
        }

        return null
    }

    mount() {
        if (this.container) {
            return
        }

        const parent = this.getParent()
        this.container = document.createElement("div")

        if (parent) {
            parent.appendChild(this.container)
        }
    }

    unmount() {
        if (this.container) {
            const parent = this.container.parentNode
            parent && parent.removeChild(this.container)
        }

        this.container = null
    }

    render() {
        const {
            visible,
            forceRender,
            children
        } = this.props

        if (!visible && !forceRender && !this.container) {
            return null
        }

        this.mount()

        return this.container ?
            createPortal(
                children,
                this.container as HTMLElement
            ) : null
    }
}