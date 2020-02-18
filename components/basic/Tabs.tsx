import * as React from "react";
import PropTypes from "prop-types";
import TabPane from "./TabPane";
import Nav from "./Nav";
import { handleFuncProp } from "../utils";
import { TabContext } from "../contexts";

export interface TabsProps extends React.HTMLAttributes<HTMLElement> {
    defaultActiveKey?: string | number;
    activeKey?: string | number;
    pill?: boolean;
    fade?: boolean;
    onTabChange?: (prevKey?: string, currentKey?: string) => void;
    onTabClick?: (key?: string, evt?: React.MouseEvent) => void;
}

interface TabsState {
    activeKey?: string | number;
    previousKey?: string | number;
}

interface NavLinkProps {
    itemKey?: string;
    onClick: (key?: string, evt?: React.MouseEvent) => any;
    children: React.ReactChild;
    disabled?: boolean;
}

function NavLink(props: NavLinkProps) {
    const {
        onClick,
        itemKey,
        disabled,
        children
    } = props;

    const handleClick = (evt: React.MouseEvent) => {
        !disabled && onClick(itemKey, evt);
        evt.preventDefault();
    };

    return (
        <TabContext.Consumer>
            {
                value => (
                    <Nav.Link
                        active={value.activeKey === itemKey}
                        disabled={disabled}
                        href="#"
                        onClick={handleClick}>
                        {children}
                    </Nav.Link>
                )
            }
        </TabContext.Consumer>
    );
}

export default class Tabs extends React.Component<TabsProps, TabsState> {

    static propTypes = {
        defaultActiveKey: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        activeKey: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        pill: PropTypes.bool
    };
    static defaultProps = {
        fade: true,
        pill: false
    };
    static TabPane = TabPane;

    constructor(props: TabsProps) {
        super(props);

        const {
            defaultActiveKey,
            activeKey,
            children
        } = props;
        let _activeKey: any = activeKey || defaultActiveKey;

        if (_activeKey == undefined) {
            React.Children.forEach(children, c => {
                if (
                    React.isValidElement(c) &&
                    c.type === TabPane &&
                    c.key != undefined
                    && _activeKey == undefined
                ) {
                    _activeKey = c.key;
                }
            });
        }

        this.state = {
            activeKey: _activeKey
        };
    }

    static getDerivedStateFromProps(props: TabsProps, state: TabsState) {
        if ("activeKey" in props) {
            return {
                activeKey: props.activeKey,
                previousKey: props.activeKey === state.activeKey ? "" : state.activeKey
            };
        }

        return state;
    }

    componentDidUpdate(prevProps: TabsProps, prevState: TabsState) {
        const { 
            state: {activeKey},
            props: {onTabChange}
         } = this;

        if (prevState.activeKey !== activeKey) {
            handleFuncProp(onTabChange)(prevState.activeKey, activeKey);
        }
    }

    handleTabHidden = () => {
        this.setState({
            previousKey: ""
        });
    };

    handleClickTab = (key?: string, evt?: React.MouseEvent) => {
        const {
            props: { onTabClick },
            state: { activeKey }
        } = this;

        handleFuncProp(onTabClick)(key, evt);

        if (key !== activeKey) {
            this.setState({
                activeKey: key,
                previousKey: activeKey
            });
        }
    }

    renderTabs() {
        const {
            children,
            pill
        } = this.props;
        const content: any[] = [];
        const tabs: React.ReactElement[] = [];
        React.Children.forEach(children, (c, i) => {
            //no tab if child is not a TabPane
            if (React.isValidElement(c)) {
                let {
                    tab,
                    children,
                    disabled,
                    action
                } = c.props as any;

                if (c.type === TabPane) {
                    if (children) {
                        content.push(
                            React.cloneElement<any>(
                                c,
                                {
                                    panelKey: c.key,
                                    onHidden: this.handleTabHidden
                                }
                            )
                        )
                    }

                    if (!tab) return;

                    tab = (
                        <Nav.Item key={c.key}>
                            {
                                action ? (
                                    <NavLink
                                        disabled={disabled}
                                        itemKey={String(c.key == undefined ? i : c.key)}
                                        onClick={this.handleClickTab}>
                                        {tab}
                                    </NavLink>
                                ) : (
                                        <Nav.Item>
                                            {tab}
                                        </Nav.Item>
                                    )
                            }
                        </Nav.Item>
                    );

                    return tabs.push(tab);
                }

                //just add the content if child is not a TabPane
                content.push(c);
            }

            content.push(c);
        });
        const _tabs = tabs.length ? (
            <Nav variant={pill ? "pill" : "tab"}>
                {tabs}
            </Nav>
        ) : null;

        return [_tabs, content];
    }

    render() {
        const {
            props: {
                children,
                fade,
                ...otherProps
            },
            state
        } = this;
        const [tabs, content] = this.renderTabs();
        const value: any = { 
            ...state,
            fade
         };

        delete otherProps.defaultActiveKey;
        delete otherProps.activeKey;
        delete otherProps.pill;
        delete otherProps.onTabChange;
        delete otherProps.onTabClick;

        return (
            <TabContext.Provider value={value}>
                <div {...otherProps}>
                    {tabs}
                    <div className="tab-content">
                        {content}
                    </div>
                </div>
            </TabContext.Provider>
        );
    }

}