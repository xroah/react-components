import { FunctionComponent } from "react"
import { createComponentByClass } from "../utils"
import Link from "./Link"
import Nav from "./Nav"
import { CommonProps } from "../Common/CommonPropsInterface"

type NavType = typeof Nav & {Link: typeof Link, Item: FunctionComponent<CommonProps<HTMLDivElement>>}

const _Nav = Nav as NavType

_Nav.Link = Link
_Nav.Item = createComponentByClass({
    className: "nav-item",
    displayName: "NavItem"
})

export default _Nav