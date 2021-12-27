import {bool} from "prop-types"
import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import {createComponent} from "reap-utils/lib/react"

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fluid?: boolean
    thumbnail?: boolean
    rounded?: boolean
}

export default createComponent<ImageProps>({
    tag: "img",
    propTypes: {
        fluid: bool,
        thumbnail: bool,
        rounded: bool
    },
    propsHandler({
        fluid,
        thumbnail,
        rounded,
        ...restProps
    }) {
        return {
            className: classNames(
                fluid && "img-fluid",
                thumbnail && "img-thumbnail",
                rounded && "rounded"
            ),
            newProps: restProps
        }
    }
})