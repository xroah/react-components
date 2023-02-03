import { DivProps } from "../commons/types";
import { classnames } from "../utils";
import React, { FunctionComponent } from "react";

const ButtonGroup: FunctionComponent<DivProps> = ({
    className,
    ...restProps
}) => {
    const classes = classnames(
        className,
        "btn-group"
    )

    return <div className={classes} {...restProps}/>
}

export default ButtonGroup