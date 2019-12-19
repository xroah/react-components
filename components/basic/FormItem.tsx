import * as React from "react";
import PropTypes from "prop-types";
import Col, { SizeObject, sizePropObject } from "./Col";
import { classNames } from "../utils";

let uuid = 0;

const colProp = PropTypes.shape({
    sm: sizePropObject,
    md: sizePropObject,
    lg: sizePropObject,
    xl: sizePropObject
});

export interface FormCol {
    sm?: SizeObject;
    md?: SizeObject;
    lg?: SizeObject;
    xl?: SizeObject;
}

export interface FormItemProps extends React.HTMLAttributes<HTMLElement> {
    horizontal?: boolean;
    labelCol?: FormCol;
    wrapperCol?: FormCol;
    label?: string;
    htmlFor?: string;
}

export default function FormItem(props: FormItemProps) {
    const {
        horizontal,
        className,
        children,
        htmlFor,
        labelCol,
        wrapperCol,
        label,
        ...otherProps
    } = props;

    let _for: string = htmlFor || "";
    let _label: React.ReactElement | null = null;
    let _children = children;

    if (children && React.isValidElement(children)) {
        let id = children.props.id;
        if (id) {
            if (!_for) {
                _for = id;
            }
        } else {
            if (_for) {
                id = _for;
            } else if (label) {
                _for = id = `bs-form-item-${uuid++}`
            }
        }

        _children = React.cloneElement(
            children,
            {
                ...children.props,
                id
            }
        );
    }

    if (label) {
        let props = {
            htmlFor: _for,
            className: classNames(horizontal && "col-form-label")
        };

        _label = <label {...props}>{label}</label>;

        if (labelCol) {
            _label = <Col {...labelCol}>{_label}</Col>;
        }
    }

    if (wrapperCol) {
        _children = <Col {...wrapperCol}>{_children}</Col>
    }

    return (
        <div className={
            classNames(
                className,
                "form-group",
                horizontal && "row"
            )
        } {...otherProps}>
            {_label}
            {_children}
        </div>
    );
}

FormItem.propTypes = {
    horizontal: PropTypes.bool,
    label: PropTypes.string,
    labelCol: colProp,
    wrapperCol: colProp,
    htmlFor: PropTypes.string
};