import React, { FunctionComponent } from "react"

export interface SVGIconProps {
    size?: number
    fill?: string
    stroke?: string
}

const SVG: FunctionComponent<SVGIconProps> = ({
    size = 16,
    fill = "currentColor",
    stroke,
    ...restProps
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={size}
            width={size}
            fill={fill}
            stroke={stroke}
            className="r-icon"
            {...restProps} />
    )
}

export default SVG