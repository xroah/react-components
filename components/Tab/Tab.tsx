import * as React from "react"
import {classNames, isUndef} from "reap-utils/lib"
import {isValidNode} from "../Commons/utils"
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
    (c: React.ReactElement, key: string): React.ReactNode | void
}

class Tab extends React.Component<TabProps, State> {
    static defaultProps: TabProps = {
        variant: "tabs"
    }

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
            this.setState({active})
        }
    }

    map(callback: MapCallback) {
        const {children} = this.props

        return React.Children.map(
            children,
            (c, i) => {
                if (React.isValidElement(c) && c.type === Pane) {
                    let key = String(i)

                    if (!isUndef(c.key)) {
                        key = String(c.key)
                    }

                    return callback(c, key)
                }

                return c
            }
        )
    }

    handleTitleClick = (k?: string) => {
        if (k && k !== this.state.active) {
            this.setState({active: k})
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
                if (c.type === Pane) {
                    const title = c.props.title

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
                            __anim__: animation
                        }
                    )
                }

                return c
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