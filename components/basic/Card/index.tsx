import Card from "./Card";
import CardTitle from "./CardTitle";
import {
    CardBody,
    CardColumn,
    CardGroup,
    CardDeck,
    CardLink,
    CardText
} from "./Others";

interface CardComponent {
    Body: typeof CardBody;
    Text: typeof CardText;
    Link: typeof CardLink;
    Group: typeof CardGroup;
    Deck: typeof CardDeck;
    Column: typeof CardColumn;
    Title: typeof CardTitle;
}

type CardType = typeof Card & CardComponent;

const _Card = Card as CardType;

_Card.Body = CardBody;
_Card.Column = CardColumn;
_Card.Group = CardGroup;
_Card.Deck = CardDeck;
_Card.Link = CardLink;
_Card.Text = CardText;
_Card.Title = CardTitle;

export default _Card;
