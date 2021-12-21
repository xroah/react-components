import * as React from "react"
import {
    chainFunction,
    classNames,
    isUndef,
    omit
} from "reap-utils/lib";
import {DivAttrs} from "../Commons/consts-and-types"
import Item, {PREFIX} from "./Item"
import Context from "./context"
import PropTypes from "prop-types"

type Open = React.Key | React.Key[]

interface AccordionProps extends Omit<DivAttrs, "onChange"> {
    flush?: boolean
    open?: Open
    defaultOpen?: Open
    alwaysOpen?: boolean
    onChange?: (open: string[]) => void
}

interface State {
    open: Set<React.Key>
}

function getOpen(open?: Open): Set<React.Key> {
    if (!open) {
        return new Set()
    }

    if (!Array.isArray(open)) {
        open = [open]
    }

    // convert to string
    open = open.map(v => String(v))

    return new Set(open)
}

const openType = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.arrayOf(PropTypes.string)
])

class Accordion extends React.Component<AccordionProps, State> {
    static propTypes = {
        flush: PropTypes.bool,
        open: openType,
        defaultOpen: openType,
        alwaysOpen: PropTypes.bool,
        onChange: PropTypes.func
    }

    constructor(props: AccordionProps) {
        super(props)

        this.state = {
            open: getOpen(this.props.defaultOpen)
        }
    }

    static getDerivedStateFromProps(
        nextProps: AccordionProps,
        nextState: State
    ) {
        if ("open" in nextProps) {
            nextState.open = getOpen(nextProps.open)
        }

        return nextState
    }

    onItemHeaderClick = (key: React.Key) => {
        // controlled
        if ("open" in this.props) {
            return
        }

        const {alwaysOpen, onChange} = this.props
        const {open} = this.state
        let newOpen = new Set<React.Key>()
        key = String(key)

        if (!alwaysOpen) {
            if (!open.has(key)) {
                newOpen.add(key)
            }
        } else {
            if (open.has(key)) {
                open.delete(key)
            } else {
                open.add(key)
            }

            newOpen = new Set(open)
        }

        this.setState(
            {
                open: newOpen
            },
            () => {
                if (onChange) {
                    onChange(Array.from(open) as string[])
                }
            }
        )
    }

    renderItem() {
        return React.Children.map(
            this.props.children,
            (c, i) => {
                if (React.isValidElement(c)) {
                    if (c.type === Item) {
                        const {onHeaderClick} = c.props
                        const key = isUndef(c.key) ?
                            String(i) : String(c.key)

                        return React.cloneElement(
                            c,
                            {
                                __key__: key,
                                onHeaderClick: chainFunction(
                                    this.onItemHeaderClick,
                                    onHeaderClick
                                )
                            }
                        )
                    }
                }

                return c
            }
        )
    }

    render() {
        const {
            className,
            flush,
            ...restProps
        } = this.props
        const classes = classNames(
            className,
            PREFIX,
            flush && `${PREFIX}-flush`
        )
        const props = omit(
            restProps,
            [
                "open",
                "defaultOpen",
                "alwaysOpen",
                "children",
                "onChange"
            ]
        )

        return (
            <Context.Provider value={this.state.open}>
                {/* @ts-ignore: Types of property 'onChange' are incompatible. */}
                <div className={classes} {...props}>
                    {this.renderItem()}
                </div>
            </Context.Provider>
        )
    }
}

export default Accordion