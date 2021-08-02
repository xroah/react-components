import Pagination from "./Pagination"
import Item from "./Item"

interface PageType {
    Item: typeof Item
}

const _Pagination = Pagination as (PageType & typeof Pagination)

_Pagination.Item = Item

export default _Pagination