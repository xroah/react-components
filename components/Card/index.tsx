import Card from "./Card"
import CardTitle from "./CardTitle"
import CardImage from "../Common/Image"
import {
    CardBody,
    CardColumns,
    CardGroup,
    CardDeck,
    CardLink,
    CardText
} from "./Others"

interface CardComponent {
    Body: typeof CardBody
    Text: typeof CardText
    Link: typeof CardLink
    Group: typeof CardGroup
    Deck: typeof CardDeck
    Columns: typeof CardColumns
    Title: typeof CardTitle
    Image: typeof CardImage
}

type CardType = typeof Card & CardComponent

const _Card = Card as CardType

_Card.Body = CardBody
_Card.Columns = CardColumns
_Card.Group = CardGroup
_Card.Deck = CardDeck
_Card.Link = CardLink
_Card.Text = CardText
_Card.Title = CardTitle
_Card.Image = CardImage

export default _Card
