import * as React from "react";
import classNames from "classnames";
import PropTypes, {number} from "prop-types";
import AccordionPanel from "./AccordionPanel";
import {AccordionContext} from "./utils";

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
    multiple?: boolean;
    activeIndex?: number | Array<number>;
}

interface StateProp {
    activeIndex: Set<number>;
}

export default class Accordion extends React.Component<AccordionProps, StateProp> {

    static Panel = AccordionPanel;
    static propTypes = {
        multiple: PropTypes.bool,
        activeIndex: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.arrayOf(PropTypes.number)
        ])
    };

    constructor(props: AccordionProps) {
        super(props);
        const {
            activeIndex,
            multiple
        } = props;
        const set = new Set<number>();

        if (Array.isArray(activeIndex)) {
            if (multiple) {
                activeIndex.forEach(i => {
                    i = Number(i) || 0;
                    set.add(i);
                });
            } else {
                set.add(Number(activeIndex[0]) || 0);
            }
        } else if (activeIndex != undefined) {
            set.add(Number(activeIndex) || 0);
        }

        this.state = {
            activeIndex: set
        };
    }

    handleClick = (index: number) => {
        let {
            props: {
                multiple
            },
            state: {
                activeIndex
            }
        } = this;

        if (activeIndex.has(index)) {
            activeIndex.delete(index);
        } else {
            if (multiple) {
                activeIndex.add(index);
            } else {
                activeIndex = new Set<number>([index]);
            }
        }

        this.setState({activeIndex});
    };

    renderChildren(children: Array<React.ReactNode>) {
        let i = 0;

        return children.map(
            c => {
                if (React.isValidElement(c) && c.type === AccordionPanel) {
                    return React.cloneElement(
                        c,
                        {
                            __index__: i++,
                            __onHeaderClick__: this.handleClick
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
                activeIndex
            }
        } = this;

        delete otherProps.multiple;
        delete otherProps.activeIndex;

        return (
            <AccordionContext.Provider value={activeIndex}>
                <div
                    className={classNames(className, "accordion")}
                    {...otherProps}>
                    {this.renderChildren(React.Children.toArray(children))}
                </div>
            </AccordionContext.Provider>
        );
    }

}