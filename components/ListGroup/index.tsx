import ListGroup from "./ListGroup"
import Item from "./Item"

type ListGroupType = typeof ListGroup & {Item: typeof Item}

const _ListGroup = ListGroup as ListGroupType

_ListGroup.Item = Item

export default _ListGroup