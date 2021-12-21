import * as React from "react"
import {chainFunction, classNames, isUndef} from "reap-utils/lib"
import {isValidNode, map} from "../Commons/utils"
import Nav, {NavProps} from "../Nav/Nav"
import Pane from "./Pane"
import Title from "./Title"

interface TabProps extends NavProps {
    animation?: boolean
    activeKey?: React.Key
    defaultActiveKey?: React.Key
}

interface State {
    active?: string
}

interface MapCallback {
    (c: React.ReactElement, key: string): React.ReactNode
}

/**
 * if just call setState{active: key}, multiple tabs may visible,
 * and use this key for triggering previous tab hide,
 * after previous has hidden switch next tab to active
 */
const TRANSITION_KEY = "REAP_UI_TAB_TRANSITION_KEY"

class Tab extends React.Component<TabProps, State> {
    static defaultProps: TabProps = {
        variant: "tabs"
    }

    prevKey = ""
    afterHidden: Function | null = null

    constructor(props: TabProps) {
        super(props)

        this.state = {
            active: ""
        }
    }

    componentDidMount() {
        let {active} = this.state
        let {defaultActiveKey} = this.props

        if (!isUndef(defaultActiveKey)) {
            active = String(defaultActiveKey)
        } else {
            this.map(
                // @ts-ignore: 'c' is declared but its value is never read
                (c, k) => {
                    if (k && !active) {
                        active = k
                    }
                }
            )
        }

        if (active) {
            this.switchTab(active)
        }
    }

    map(callback: MapCallback) {
        return map(
            this.props.children,
            (c, i) => {
                if (c.type === Pane) {
                    let key = String(isUndef(c.key) ? i : c.key)

                    return callback(c, key)
                }
            }
        )
    }

    switchTab(k: string) {
        this.setState({active: this.prevKey = k})
    }

    handleTitleClick = (k?: string) => {
        const {active} = this.state

        if (active !== TRANSITION_KEY && k && k !== active) {
            const fn = () => this.switchTab(k)
            
            if (!this.prevKey) {
                fn()
            } else {
                this.afterHidden = fn

                this.setState({active: TRANSITION_KEY})
            }
        }
    }

    static getDerivedStateFromProps(
        nextProps: TabProps,
        nextState: State
    ) {
        if ("activeKey" in nextProps) {
            nextState.active = String(nextProps.activeKey)
        }

        return nextState
    }

    handleTabHidden = () => {
        if (this.afterHidden) {
            this.afterHidden()

            this.afterHidden = null
        }
    }

    render() {
        const {
            // @ts-ignore: unused
            children,
            animation,
            justify,
            variant,
            fill,
            vertical,
            className,
            ...restProps
        } = this.props
        const {active} = this.state
        const classes = classNames(
            className,
            vertical && "d-flex align-items-start"
        )
        let tabs: React.ReactElement[] = []
        let panes = this.map(
            (c, k) => {
                let {
                    title,
                    onHidden
                } = c.props
                onHidden = chainFunction(onHidden, this.handleTabHidden)

                if (isValidNode(title)) {
                    tabs.push(
                        <Title
                            onClick={this.handleTitleClick}
                            key={k}
                            __active_key__={active}
                            __key__={k}>
                            {title}
                        </Title>
                    )
                }

                return React.cloneElement(
                    c,
                    {
                        __key__: k,
                        __active_key__: active,
                        __anim__: animation,
                        onHidden
                    }
                )
            }
        )

        return (
            <div className={classes} {...restProps}>
                {
                    tabs.length && (
                        <Nav
                            vertical={vertical}
                            variant={variant}
                            justify={justify}
                            fill={fill}>
                            {tabs}
                        </Nav>
                    )
                }
                <div className="tab-content">
                    {panes}
                </div>
            </div>
        )
    }
}

export default Tab