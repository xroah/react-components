import ListGroup from "./ListGroup"
import Item from "./Item"

interface ListGroupType {
    Item: typeof Item
}

const _ListGroup = ListGroup as (ListGroupType & typeof ListGroup)

_ListGroup.Item = Item

export default _ListGroup