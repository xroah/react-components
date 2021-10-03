import * as React from "react"
import Card from "./Card"
import Body from "./Body"
import Title from "./Title"
import {createComponent} from "../Commons/utils"

const Link = createComponent<React.AnchorHTMLAttributes<HTMLAnchorElement>>({
    tag: "a",
    className: "card-link",
    displayName: "CardLink"
})
const Text = createComponent<React.HTMLAttributes<HTMLParagraphElement>>({
    tag: "p",
    className: "card-text",
    displayName: "CardText"
})

interface CardType {
    Body: typeof Body
    Title: typeof Title
    Text: typeof Text
    Link: typeof Link
}

const _Card = Card as (CardType & typeof Card)

_Card.Body = Body
_Card.Title = Title
_Card.Text = Text
_Card.Link = Link

export default _Card