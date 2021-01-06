import * as React from "react"

export default {
    compDesc: "Our small count and labeling component.",
    egTitle: "Example",
    egDesc: "Badges scale to match the size of the immediate parent element by using relative font sizing and em units.",
    counterDesc: "Badges can be used as part of links or buttons to provide a counter.",
    note: (
        <>
            <p>
                Note that depending on how they are used, badges may be confusing for users of screen readers and similar assistive technologies. While the styling of badges provides a visual cue as to their purpose, these users will simply be presented with the content of the badge. Depending on the specific situation, these badges may seem like random additional words or numbers at the end of a sentence, link, or button.
            </p>
            Unless the context is clear (as with the “Notifications” example, where it is understood that the “4” is the number of notifications), consider including additional context with a visually hidden piece of additional text.
        </>
    ),
    varTitle: "Contextual variations",
    varDesc: "Add any of the below mentioned variants to change the appearance of a badge.",
    pillTitle: "Pill badges",
    pilDesc: <>Use the <code>pill</code> prop to make badges more rounded (with a larger <code>border-radius</code> and additional horizontal <code>padding</code>).</>,
    linkTitle: "Links",
    linkDesc: <>Using the <code>Badge</code> on an <code>&lt;a&gt;</code> element quickly provide actionable badges with hover and focus states(by passing the <code>href</code> prop).</>,
    varApi: "Appearance of a Badge",
    hrefApi: "Render as 'a' element with href if passed",
    pillApi: "Make badges more rounded (with a larger border-radius and additional horizontal padding)"
}