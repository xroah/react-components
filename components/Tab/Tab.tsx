import * as React from "react"
import {isUndef} from "reap-utils/lib"
import classNames from "reap-utils/lib/class-names"
import {NavProps} from "../Nav/Nav"
import Nav from "../Nav"
import Pane from "./Pane"

interface TabProps extends NavProps {
    animation?: boolean
    activeKey?: React.Key
    defaultActiveKey?: React.Key
}

interface State {
    active?: React.Key
}

class Tab extends React.Component<TabProps, State> {
    constructor(props: TabProps) {
        super(props)

        this.state = {
            active: props.defaultActiveKey
        }
    }

    static getDerivedStateFromProps(
        nextProps: TabProps,
        nextState: State
    ) {
        if ("activeKey" in nextProps) {
            nextState.active = nextProps.activeKey
        }

        return nextState
    }

    render() {
        const {
            children,
            animation,
            ...restProps
        } = this.props
        let tabs: React.ReactElement[] = []
        let panes = React.Children.map(
            children,
            (c, i) => {
                if (React.isValidElement(c)) {
                    if (c.type === Pane) {
                        const key = isUndef(c.key) ? undefined : c.key
                        const title = c.props.title
                        tabs.push(
                            <Nav {...restProps}>
                                <Nav.Item>
                                    <Nav.Link>{title}</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        )

                        return React.cloneElement(
                            c,
                            {
                                __key__: key,
                                __active_key__: this.state.active,
                                __anim__: animation
                            }
                        )
                    }
                }

                return c
            }
        )

        return (
            <>

            </>
        )
    }
}

