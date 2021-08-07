import Card from "./Card"
import Body from "./Body"
import Title from "./Title"
import Text from "./Text"

interface CardType {
    Body: typeof Body
    Title: typeof Title
    Text: typeof Text
}

const _Card = Card as (CardType & typeof Card)

_Card.Body = Body
_Card.Title = Title
_Card.Text = Text

export default _Card