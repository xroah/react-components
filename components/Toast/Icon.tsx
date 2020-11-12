import React from "react"
import Image, {ImageProps} from "../Common/Image"

export default function Icon(props: ImageProps) {
	return <Image {...props}/>
}

Icon.defaultProps = {
	size: 20
}