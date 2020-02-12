import * as React from "react";
import PropTypes from "prop-types";
import AccordionPanel from "./AccordionPanel";
import { AccordionContext, classNames } from "../utils";

type keyType = number | string | number[] | string[];

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
    multiple?: boolean;
    activeKey?: keyType;
    defaultActiveKey?: keyType;
}

interface AccordionStates {
    activeKey: Set<string>;
}

const _keyType = PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.arrayOf(PropTypes.string)
]);

export default class Accordion extends React.Component<AccordionProps, AccordionStates> {

    static Panel = AccordionPanel;
    static propTypes = {
        multiple: PropTypes.bool,
        activeKey: _keyType,
        defaultActiveKey: _keyType
    };

    constructor(props: AccordionProps) {
        super(props);

        const {
            activeKey,
            defaultActiveKey,
            multiple
        } = props;
        let keys = activeKey || defaultActiveKey;

        this.state = {
            activeKey: Accordion.handleKeyProp(keys, multiple)
        };
    }

    static handleKeyProp(keys?: keyType, multiple?: boolean) {
        let set = new Set<string>();

        if (Array.isArray(keys)) {
            let activeKey: string[] = [];
            keys.forEach((item: any) => {
                if (item != undefined) {
                    activeKey.push(item.toString());
                }
            });
            if (multiple) {
                set = new Set<string>(activeKey)
            } else {
                set.add(activeKey[0].toString());
            }
        } else if (keys != undefined) {
            set.add(keys.toString());
        }

        return set;
    }

    static handleProps(props: AccordionProps) {
        const {
            activeKey,
            multiple
        } = props;

        return this.handleKeyProp(activeKey, multiple);
    }

    static getDerivedStateFromProps(props: AccordionProps, state: AccordionStates) {
        if ("activeKey" in props) {
            return {
                activeIndex: Accordion.handleProps(props)
            }
        }
        return state;
    }

    handleClick = (key: string) => {
        let {
            props: {
                multiple
            },
            state: {
                activeKey
            }
        } = this;

        if (activeKey.has(key)) {
            activeKey.delete(key);
        } else {
            if (multiple) {
                activeKey.add(key);
            } else {
                activeKey = new Set<string>([key]);
            }
        }

        this.setState({
            activeKey
        });
    };

    renderChildren(children: React.ReactNode) {

        //React.Children.toArray will add ".$" prefix to the key value
        return React.Children.map(
            children,
            (c, i) => {
                if (React.isValidElement(c)) {
                    return React.cloneElement<any>(
                        c,
                        {
                            __key__: c.key == undefined ? i.toString() : c.key,
                            __onHeaderClick__: this.props.activeKey ? undefined : this.handleClick,
                        }
                    );
                }

                return c;
            }
        );
    }

    render() {
        const {
            props: {
                children,
                className,
                ...otherProps
            },
            state: {
                activeKey
            }
        } = this;
        delete otherProps.multiple;
        delete otherProps.activeKey;
        delete otherProps.defaultActiveKey;

        return (
            <AccordionContext.Provider value={activeKey}>
                <div
                    className={classNames(className, "accordion")}
                    {...otherProps}>
                    {this.renderChildren(children)}
                </div>
            </AccordionContext.Provider>
        );
    }

}