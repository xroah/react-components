import * as React from "react";
import PropTypes from "prop-types";
import AccordionPanel from "./AccordionPanel";
import { classNames, handleFuncProp, chainFunction } from "../utils";
import { AccordionContext } from "../contexts"
import { CommonProps } from "../CommonPropsInterface";

type keyType = number | string | number[] | string[];

export interface AccordionProps extends CommonProps<HTMLDivElement> {
    multiple?: boolean;
    activeKey?: keyType;
    defaultActiveKey?: keyType;
    onHeaderClick?: (key?: string, evt?: React.MouseEvent) => void; 
    onPanelChange?: (keys?: string[]) => void;
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

    static getDerivedStateFromProps(props: AccordionProps, state: AccordionStates) {
        if ("activeKey" in props) {
            return {
                activeIndex: Accordion.handleProps(props)
            }
        }
        return state;
    }

    componentDidUpdate(prevProps: AccordionProps, prevState: AccordionStates) {
        const prevKey = prevState.activeKey;
        const curKey = this.state.activeKey;
        
        if (this.isKeyChanged(prevKey, curKey)) {
            handleFuncProp(this.props.onPanelChange)(Array.from(curKey));
        }
    }

    isKeyChanged(prevKeys: Set<any>, curKey: Set<any>) {
        const prevKeyArray = Array.from(prevKeys);
        const curKeyArray = Array.from(curKey);
        
        if (prevKeyArray.length !== curKeyArray.length){
            return true;
        }

        for (let key of prevKeyArray) {
            if (!curKey.has(key)) {
                return true;
            }
        }

        return false;
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

    handleClick = (key: string) => {
        const {
            props: {
                multiple
            },
            state: {
                activeKey
            }
        } = this;
        //reference type, copy for handling onPanelChange
        let _activeKey = new Set([...activeKey]);

        if (_activeKey.has(key)) {
            _activeKey.delete(key);
        } else {
            if (multiple) {
                _activeKey.add(key);
            } else {
                _activeKey = new Set<string>([key]);
            }
        }

        this.setState({
            activeKey: _activeKey
        });
    };

    renderChildren(children: React.ReactNode) {
        const { onHeaderClick } = this.props;

        //React.Children.toArray will add ".$" prefix to the key value
        return React.Children.map(
            children,
            (c, i) => {
                if (React.isValidElement(c)) {
                    const controlled = "activeKey" in this.props;
                    const onClick = chainFunction(controlled ? null : this.handleClick, onHeaderClick);

                    return React.cloneElement<any>(
                        c,
                        {
                            panelKey: c.key == undefined ? i.toString() : c.key,
                            onHeaderClick: onClick
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
        delete otherProps.onHeaderClick;
        delete otherProps.onPanelChange;

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