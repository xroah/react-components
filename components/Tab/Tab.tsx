import * as React from "react"
import PropTypes from "prop-types"
import {
    chainFunction,
    classNames,
    isUndef,
    omit
} from "reap-utils/lib"
import {getFunction, isValidNode} from "reap-utils/lib/react"
import {DivAttrs} from "../Commons/consts-and-types"
import {map} from "../Commons/utils"
import Nav from "../Nav/Nav"
import Pane from "./Pane"
import Title from "./Title"
import {
    EType,
    MapCallback,
    TabProps,
    TabState
} from "./types"


/**
 * if just call setState{active: key}, multiple tabs may visible,
 * and use this key for triggering previous tab hide,
 * after previous has hidden switch next tab to active
 */
const TRANSITION_KEY = "REAP_UI_TAB_TRANSITION_KEY"

const keyType = PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
])

class Tab extends React.Component<TabProps, TabState> {
    static defaultProps: TabProps = {
        variant: "tabs"
    }
    static propTypes = {
        animation: PropTypes.bool,
        activeKey: keyType,
        defaultActiveKey: keyType,
        onTitleClick: PropTypes.func,
        onChange: PropTypes.func
    }

    ref = React.createRef<HTMLDivElement>()
    afterHidden: Function | null = null

    constructor(props: TabProps) {
        super(props)

        const {defaultActiveKey: a} = props
        this.state = {
            active: isUndef(a) ? "" : String(a)
        }
    }

    componentDidMount() {
        let {active} = this.state

        if (active) {
            return
        }

        this.map(
            // @ts-ignore
            (c, k) => {
                if (k && !active) {
                    active = k
                }
            }
        )

        this.switchTab(active)
    }

    map(callback: MapCallback) {
        return map(
            this.props.children,
            (c, i) => {
                if (c.type === Pane) {
                    let key = String(isUndef(c.key) ? i : c.key)

                    return callback(c, key)
                }

                return c
            }
        )
    }
    
    getActiveElement() {
        const {current: el} = this.ref

        if (el) {
            return el.querySelector(".active")
        }
    }

    switchTab(k: string) {
        if (!k) {
            return
        }

        this.setState({active: k})
        getFunction(this.props.onChange)(k)
    }

    handleTitleClick = (k: string, evt: EType) => {
        const {active} = this.state

        if (active !== TRANSITION_KEY && k !== active) {
            const fn = () => this.switchTab(k)
            const active = this.getActiveElement()

            if (!active || getComputedStyle(active).display === "none") {
                fn()
            } else {
                this.afterHidden = fn

                this.setState({active: TRANSITION_KEY})
            }
        }

        getFunction(this.props.onTitleClick)(k, evt)
    }

    static getDerivedStateFromProps(
        nextProps: TabProps,
        nextState: TabState
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
            "tabs",
            vertical && "d-flex align-items-start"
        )
        let tabs: React.ReactElement[] = []
        let panes = this.map(
            (c, k) => {
                let {
                    title,
                    onHidden,
                    disabled
                } = c.props
                const _active = active === k
                onHidden = chainFunction(onHidden, this.handleTabHidden)

                if (isValidNode(title)) {
                    tabs.push(
                        <Title
                            onClick={this.handleTitleClick}
                            key={k}
                            itemKey={k}
                            disabled={disabled}
                            active={_active}>
                            {title}
                        </Title>
                    )
                }

                return React.cloneElement(
                    c,
                    {
                        __key__: k,
                        __active__: _active,
                        __anim__: animation,
                        onHidden
                    }
                )
            }
        )
        const props = omit(
            restProps,
            [
                "onChange",
                "onTitleClick",
                "children"
            ]
        ) as DivAttrs

        return (
            <div className={classes} {...props}>
                {
                    tabs.length ? (
                        <Nav
                            vertical={vertical}
                            variant={variant}
                            justify={justify}
                            fill={fill}>
                            {tabs}
                        </Nav>
                    ) : null
                }
                <div className="tab-content" ref={this.ref}>
                    {panes}
                </div>
            </div>
        )
    }
}

export default Tab