import React, { FC, ReactElement } from "react"

export interface SVGIconProps {
    size?: number
    fill?: string
    stroke?: string
}

const SVG: FC<SVGIconProps> = ({
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

function createSVGIcon(paths: ReactElement, name?: string) {
    const IconComp: FC<SVGIconProps> = (props) => {
        return <SVG {...props}>{paths}</SVG>
    }

    if (name) {
        IconComp.displayName = name
    }

    return IconComp
}

export {SVG}
export default createSVGIcon