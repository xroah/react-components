import Pagination from "./Pagination"
import Item from "./Item"
import Auto from "./Auto"

interface PageType {
    Item: typeof Item
    Auto: typeof Auto
}

const _Pagination = Pagination as (PageType & typeof Pagination)

_Pagination.Item = Item
_Pagination.Auto = Auto

export default _Pagination