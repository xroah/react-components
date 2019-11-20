import * as React from "react";
import PropTypes from "prop-types";
import TabPane from "./TabPane";
import { classNames, TabContext, handleFuncProp } from "./utils";

export interface TabsProps extends React.HTMLAttributes<HTMLElement> {
    defaultActiveKey?: string | number;
    activeKey?: string | number;
    pill?: boolean;
    onTabChange?: (key?: string) => void;
}

interface TabsState {
    activeKey: string | undefined;
}

interface NavLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
    __key__?: string;
    __onClick__: (key?: string) => any;
    disabled?: boolean;
}

function NavLink(props: NavLinkProps) {

    const handleClick = () => {
        const {
            __onClick__,
            __key__,
            disabled
        } = props;

        !disabled && __onClick__(__key__);
    };
    const {
        children,
        disabled
    } = props;
    const context = React.useContext(TabContext);
    const classes = classNames(
        "nav-item",
        "nav-link",
        context === props.__key__ && "active",
        disabled && "disabled"
    );

    return (
        <a href="#"
            className={classes}
            onClick={handleClick}>{children}</a>
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
            activeKey
        } = props;
        let _activeKey: any = defaultActiveKey;

        if (activeKey != undefined) {
            _activeKey = activeKey;
        }

        this.state = {
            activeKey: _activeKey
        };
    }

    componentDidMount() {
        const {
            activeKey
        } = this.state;

        if (!activeKey) {
            const {
                children
            } = this.props;
            let key: any;

            React.Children.forEach(children, c => {
                if (
                    React.isValidElement(c) &&
                    c.type === TabPane &&
                    c.key != undefined
                    && !key
                ) {
                    key = c.key;
                }
            });

            this.setState({
                activeKey: key
            });
        }
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
        const tabs = React.Children.map(children, c => {
            if (
                React.isValidElement(c) &&
                c.type === TabPane &&
                c.props.tab
            ) {
                return (
                    <NavLink
                        disabled={c.props.disabled}
                        __key__={c.key != null ? c.key.toString() : ""}
                        __onClick__={this.handleClickTab}>
                        {c.props.tab}
                    </NavLink>
                );
            }

            return null;
        });

        return (
            <div className={
                classNames(
                    "nav",
                    pill ? "nav-pills" : "nav-tabs"
                )
            }>{tabs}</div>
        );
    }


    renderContent() {
        const {
            children
        } = this.props;

        return React.Children.map(children, c => {
            if (React.isValidElement(c) && c.type === TabPane) {
                return React.cloneElement(
                    c,
                    {
                        __key__: c.key
                    }
                );
            }

            return c;
        });
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

        delete otherProps.defaultActiveKey;
        delete otherProps.activeKey;
        delete otherProps.pill;
        delete otherProps.onTabChange;

        return (
            <TabContext.Provider value={activeKey as string}>
                <div {...otherProps}>
                    {this.renderTabs()}
                    <div className="tab-content">
                        {this.renderContent()}
                    </div>
                </div>
            </TabContext.Provider>
        );
    }

}