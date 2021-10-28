import Flex from "./Flex"
import Item from "./Item"
import Alignment from "./Alignment"

interface FlexType {
    Item: typeof Item,
    Alignment: typeof Alignment
}

const _Flex = Flex as (FlexType & typeof Flex)

_Flex.Item = Item
_Flex.Alignment = Alignment

export default _Flex