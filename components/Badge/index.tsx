import Badge from "./Badge"
import Positioned from "./Positioned"
import Indicator from "./Indicator"

interface BadgeType {
    Positioned: typeof Positioned
    Indicator: typeof Indicator
}

const _Badge = Badge as (BadgeType & typeof Badge)

_Badge.Positioned = Positioned
_Badge.Indicator = Indicator

export default _Badge