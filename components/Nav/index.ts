import Nav from "./Nav"
import NavLink from './Link';
import {createComponent} from "reap-utils/lib/react"

const Item = createComponent({
    tag: "div",
    displayName: "NavItem",
    className: "nav-item"
})

interface NavType {
    Item: typeof Item,
    Link: typeof NavLink
}

const _Nav = Nav as (NavType & typeof Nav)

_Nav.Link = NavLink
_Nav.Item = Item

export default _Nav