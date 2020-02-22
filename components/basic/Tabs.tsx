import * as React from "react";
import PropTypes from "prop-types";
import TabPane from "./TabPane";
import Nav from "./Nav";
import { handleFuncProp } from "../utils";
import { TabContext } from "../contexts";
import { chainFunction } from "../../es/utils";

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

interface TabTitleProps {
    itemKey?: string;
    onClick: (key?: string, evt?: React.MouseEvent) => void;
    children: React.ReactChild;
    disabled?: boolean;
}

function TabTitle(props: TabTitleProps) {
    const {
        onClick,
        itemKey,
        disabled,
        children,
        ...otherProps
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
                        onClick={handleClick}
                        {...otherProps}>
                        {children}
                    </Nav.Link>
                )
            }
        </TabContext.Consumer>
    );
}

function isKeyEmpty(key: any) {
    return key == undefined || !String(key).trim();
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
        pill: PropTypes.bool,
        fade: PropTypes.bool,
        tabProps: PropTypes.object,
        onTabChange: PropTypes.func,
        onTabClick: PropTypes.func
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

        if (isKeyEmpty(_activeKey) && !("activeKey" in props)) {
            React.Children.forEach(children, (c, i) => {
                if (
                    React.isValidElement(c) &&
                    c.type === TabPane &&
                    isKeyEmpty(_activeKey)
                ) {
                    _activeKey = c.key || i.toString();
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
            state: { activeKey },
            props: { onTabChange }
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
            state: { activeKey },
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
                    disabled
                } = c.props as any;

                if (c.type === TabPane) {
                    const key = c.key == undefined ? i.toString() : c.key;

                    if (children) {
                        content.push(
                            React.cloneElement<any>(
                                c,
                                {
                                    key: key,
                                    panelKey: key,
                                    onHidden: this.handleTabHidden
                                }
                            )
                        )
                    }

                    if (!tab) return;

                    tab = (
                        <Nav.Item key={key}>
                            <TabTitle
                                disabled={disabled}
                                itemKey={String(key)}
                                onClick={this.handleClickTab} >
                                {tab}
                            </TabTitle>
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