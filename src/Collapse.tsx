import * as React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {emulateTransitionEnd, handleFuncProp, reflow} from "./utils";
import {RefObject} from "react";

export interface CollapseProps extends React.HTMLAttributes<HTMLDivElement> {
    isOpen?: boolean;
    onShow?: Function;
    onShown?: Function;
    onHide?: Function;
    onHidden?: Function;
}

function getHeight(node: HTMLElement) {
    return node.scrollHeight;
}

export default class Collapse extends React.Component<CollapseProps> {

    static defaultProps = {
        isOpen: false
    };

    static propTypes = {
        isOpen: PropTypes.bool
    };

    private ref: RefObject<HTMLDivElement> = React.createRef();

    getRef() {
        return this.ref.current;
    }

    componentDidMount() {
        const el = this.getRef();
        const {isOpen} = this.props;

        if (el && isOpen) {
            el.classList.add("show");
        }
    }

    shouldComponentUpdate(nextProps: CollapseProps) {
        return nextProps.isOpen !== this.props.isOpen;
    }

    componentDidUpdate() {
        const {
            isOpen,
            onShow,
            onShown,
            onHide,
            onHidden
        } = this.props;
        const el = this.getRef();

        if (!el) return;

        el.classList.remove("collapse", "show");

        if (isOpen) {
            el.classList.add("collapsing");
            handleFuncProp(onShow)();
            reflow(el);
            el.style.height = `${getHeight(el)}px`;
            emulateTransitionEnd(el, () => {
                el.classList.remove("collapsing");
                el.classList.add("collapse", "show");
                el.style.height = "";
                handleFuncProp(onShown)();
            });
        } else {
            el.style.height = `${getHeight(el)}px`;
            reflow(el);
            el.style.height = "";
            el.classList.add("collapsing");
            handleFuncProp(onHide)();
            emulateTransitionEnd(el, () => {
                el.classList.remove("collapsing");
                el.classList.add("collapse");
                handleFuncProp(onHidden)();
            });
        }
    }

    render() {
        const {
            className,
            children,
            ...otherProps
        } = this.props;

        delete otherProps.onShow;
        delete otherProps.onShown;
        delete otherProps.onHide;
        delete otherProps.onHidden;
        delete otherProps.isOpen;

        return (
            <>
                <div className={
                    classNames(
                        className,
                        "collapse"
                    )
                }
                     ref={this.ref}
                     {...otherProps}>
                    <div className="card-body">
                        {children}
                    </div>
                </div>
            </>
        );
    }

}