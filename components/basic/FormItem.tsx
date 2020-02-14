import * as React from "react";
import PropTypes from "prop-types";
import Col, { ColProps } from "./Col";
import { classNames } from "../utils";
import { FormContext } from "../contexts";

export interface FormItemProps extends React.HTMLAttributes<HTMLElement> {
    horizontal?: boolean;
    wrapperCol?: ColProps;
    label?: boolean;
    labelText?: string | React.ReactNode;
    labelCol?: ColProps;
    labelAlign?: "left" | "right";
    htmlFor?: string;
    help?: string;
    control?: boolean;
}

interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
    horizontal?: boolean;
    label?: boolean;
    labelCol?: ColProps;
    labelAlign?: "left" | "right";
    htmlFor?: string;
}

function Label(props: LabelProps) {
    const {
        children,
        labelCol,
        label,
        labelAlign,
        horizontal
    } = props;

    return (
        <FormContext.Consumer>
            {
                ({
                    labelCol: contextLabelCol,
                    labelAlign: contextLabelAlign,
                    horizontal: contextHorizontal
                }: any) => {
                    const _labelCol = labelCol || contextLabelCol || { span: false };
                    const _labelAlign = labelAlign || contextLabelAlign;
                    const h = horizontal || contextHorizontal || false;
                    const colCls = _labelAlign === "right" ? "text-right" : undefined;
                    const labelCls = h ? "col-form-label" : undefined;

                    return (
                        <Col
                            className={colCls}
                            {..._labelCol}>
                            {
                                label ?
                                    <label className={labelCls}>{children}</label> :
                                    children
                            }
                        </Col>
                    );
                }
            }
        </FormContext.Consumer>
    );
}

interface WrapperProps extends React.HTMLAttributes<HTMLElement> {
    wrapperCol?: ColProps;
    help?: string | React.ReactNode;
}

function Wrapper(props: WrapperProps) {
    const {
        children,
        wrapperCol,
        help
    } = props;

    return (
        <FormContext.Consumer>
            {
                ({ wrapperCol: contextWrapperCol }: any) => {
                    const _wrapperCol = wrapperCol || contextWrapperCol || { span: false };

                    return (
                        <Col {..._wrapperCol}>
                            {children}
                            {
                                help && (
                                    <small className="form-text text-muted">{help}</small>
                                )
                            }
                        </Col>
                    )
                }
            }
        </FormContext.Consumer>
    );
}

export default function FormItem(props: FormItemProps) {
    const {
        horizontal,
        className,
        children,
        htmlFor,
        label,
        labelText,
        labelCol,
        wrapperCol,
        help,
        control,
        labelAlign,
        ...otherProps
    } = props;
    let _for: string = htmlFor || "";
    let _label: React.ReactElement | null = null;
    let _children = children;
    const context = React.useContext(FormContext);
    const h = horizontal || context.horizontal || false;

    if (React.isValidElement(children)) {
        let {
            id,
            className,
            ...otherChildrenProps
        } = children.props as any;
        const PREFIX = "form-control";

        if (id) {
            if (!_for) {
                _for = id;
            }
        } else {
            if (_for) {
                id = _for;
            }
        }

        _children = React.cloneElement<any>(
            children,
            {
                id,
                className: classNames(
                    className,
                    control && PREFIX,
                ),
                ...otherChildrenProps
            }
        );;
    }

    if (labelText) {
        let props = {
            htmlFor: _for || undefined,
            horizontal,
            labelCol,
            labelAlign,
            label
        };
        _label = <Label {...props}>{labelText}</Label>;
    }

    return (
        <div className={
            classNames(
                className,
                "form-group",
                h && "row"
            )
        } {...otherProps}>
            {_label}
            <Wrapper
                wrapperCol={wrapperCol}
                help={help}>
                {_children}
            </Wrapper>
        </div>
    )
}

FormItem.propTypes = {
    horizontal: PropTypes.bool,
    labelText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    label: PropTypes.bool,
    labelCol: PropTypes.object,
    labelAlign: PropTypes.oneOf(["left", "right"]),
    wrapperCol: PropTypes.object,
    htmlFor: PropTypes.string,
    help: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ])
};
FormItem.defaultProps = {
    control: false,
    label: true
};