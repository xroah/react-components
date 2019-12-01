import * as React from "react";
import PropTypes from "prop-types";
import TabPane from "./TabPane";
import Nav from "./Nav";
import { TabContext, handleFuncProp, classNames } from "../utils";

export interface TabsProps extends React.HTMLAttributes<HTMLElement> {
    defaultActiveKey?: string | number;
    activeKey?: string | number;
    pill?: boolean;
    onTabChange?: (key?: string) => void;
}

interface TabsState {
    activeKey?: string | number;
}

interface NavLinkProps {
    __key__?: string;
    onClick: (key?: string) => any;
    children: React.ReactChild;
    disabled?: boolean;
}

function NavLink(props: NavLinkProps) {

    const handleClick = () => {
        const {
            onClick,
            __key__,
            disabled
        } = props;

        !disabled && onClick(__key__);
    };
    const {
        children,
        disabled
    } = props;
    const context = React.useContext(TabContext);

    return (
        <Nav.Item tag="div">
            <Nav.Link
                active={context === props.__key__}
                disabled={disabled}
                onClick={handleClick}
                children={children} />
        </Nav.Item>
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
    static TabPane = TabPane;

    constructor(props: TabsProps) {
        super(props);

        const {
            defaultActiveKey,
            activeKey,
            children
        } = props;
        let _activeKey: any = defaultActiveKey;

        if (activeKey != undefined) {
            _activeKey = activeKey;
        }

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

    static getDerivedStateFromProps(nextProps: TabsProps, nextState: TabsState) {
        if ("activeKey" in nextProps) {
            return {
                activeKey: nextProps.activeKey
            };
        }

        return nextState;
    }

    handleClickTab = (key?: string) => {
        const { onTabChange } = this.props

        this.setState({
            activeKey: key
        });
        handleFuncProp(onTabChange)(key);
    }

    renderTabs() {
        const {
            children,
            pill
        } = this.props;
        const content: any[] = [];
        const tabs = React.Children.map(children, (c, i) => {
            if (React.isValidElement(c)) {
                const tab = c.props.tab;

                if (c.type === TabPane) {
                    content.push(
                        React.cloneElement(
                            c,
                            {
                                __key__: c.key
                            }
                        )
                    );
                    // if tab is ReactElement, just render it(eg: dropdown etc)
                    if (React.isValidElement(tab)) {
                        const _tab = tab as React.ReactElement;
                        return React.cloneElement(
                            _tab,
                            {
                                className: classNames(
                                    _tab.props.className,
                                    "nav-item"
                                )
                            }
                        );
                    }

                    return (
                        <NavLink
                            disabled={c.props.disabled}
                            __key__={String(c.key == undefined ? i : c.key)}
                            onClick={this.handleClickTab}>
                            {tab}
                        </NavLink>
                    );
                }

                content.push(c);
            }

            content.push(c);

            return null;
        });
        const _tabs = (
            <Nav pill={pill} tab tag="div">
                {tabs}
            </Nav>
        );;

        return [_tabs, content];
    }

    render() {
        const {
            props: {
                children,
                ...otherProps
            },
            state: {
                activeKey
            }
        } = this;
        const [tabs, content] = this.renderTabs();

        delete otherProps.defaultActiveKey;
        delete otherProps.activeKey;
        delete otherProps.pill;
        delete otherProps.onTabChange;

        return (
            <TabContext.Provider value={activeKey as string}>
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