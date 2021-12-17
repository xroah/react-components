import Breadcrumb from "./Breadcrumb"
import Item from "./Item"

type BreadCrumbType = typeof Breadcrumb & {Item: typeof Item}

const _Breadcrumb = Breadcrumb as BreadCrumbType

_Breadcrumb.Item = Item

export default _Breadcrumb
