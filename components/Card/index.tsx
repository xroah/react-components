import Card from "./Card"
import Body from "./Body"
import Title from "./Title"

interface CardType {
    Body: typeof Body
    Title: typeof Title
}

const _Card = Card as (CardType & typeof Card)

_Card.Body = Body
_Card.Title = Title

export default _Card