import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import Card from "./Card"
import Body from "./Body"
import Title from "./Title"
import Text from "./Text"

function Link(
    {
        className,
        ...restProps
    }: React.AnchorHTMLAttributes<HTMLAnchorElement>
) {
    return (
        <a 
        className={classNames(className, "card-link")}
        {...restProps}
        />
    )
}

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