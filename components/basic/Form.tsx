import * as React from "react";
import PropTypes from "prop-types";
import { classNames } from "../utils";
import FormItem from "./FormItem";

export interface FormProps extends React.HTMLAttributes<HTMLElement> {
    inline?: boolean;
}

export default function Form(props: FormProps) {
    const {
        className,
        inline,
        ...otherProps
    } = props;

    return <form
        className={
            classNames(className, inline && "form-inline")
        } {...otherProps} />;
}

Form.propTypes = {
    inline: PropTypes.bool
};

Form.Item = FormItem;