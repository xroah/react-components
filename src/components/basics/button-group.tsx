import { DivProps } from "../commons/types";
import { classnames } from "../utils";
import React, { FC } from "react";

const ButtonGroup: FC<DivProps> = ({
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