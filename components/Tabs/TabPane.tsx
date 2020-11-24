import * as React from "react"
import PropTypes from "prop-types"
import {
    classNames,
    handleFuncProp
} from "../utils"
import Fade from "../Common/Fade"
import {TabContext} from "../Common/contexts"
import NoTransition from "../Common/NoTransition"
import {CommonProps} from "../Common/CommonPropsInterface"
import {omit} from "../utils"

export interface TabPaneProps extends CommonProps<HTMLDivElement> {
    tab?: string | React.ReactNode
    disabled?: boolean
    panelKey?: string
    onHidden?: () => void
}

export default function TabPane(props: TabPaneProps) {
    const {
        className,
        panelKey,
        onHidden,
        ...otherProps
    } = props
    const handleExited = () => {
        handleFuncProp(onHidden)()
    }

    omit(
        otherProps,
        ["tab", "disabled"]
    )

    return (
        <TabContext.Consumer>
            {
                ({
                    activeKey: a,
                    previousKey: p,
                    fade
                }) => {
                    const _in = a === panelKey && !p
                    const transitionProps = {
                        in: _in,
                        onExited: handleExited
                    }
                    const pane = (
                        <div className={
                            classNames(
                                className,
                                "tab-pane",
                                (_in || p === panelKey) && "active"
                            )
                        } {...otherProps} />
                    )
                    
                    return (
                        fade ?
                            <Fade {...transitionProps}>{pane}</Fade> :
                            <NoTransition {...transitionProps}>{pane}</NoTransition>
                    )
                }
            }
        </TabContext.Consumer>
    )
}

TabPane.propTypes = {
    tab: PropTypes.node,
    disabled: PropTypes.bool
}