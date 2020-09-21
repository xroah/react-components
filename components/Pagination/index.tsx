import Pagination from "./Pagination"
import Item from "./Item"
import Auto from "./Auto"

type PaginationType = typeof Pagination & {Item: typeof Item, Auto: typeof Auto}

const _Pagination = Pagination as PaginationType

_Pagination.Item = Item
_Pagination.Auto = Auto

export default _Pagination