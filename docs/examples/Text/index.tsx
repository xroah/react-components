import * as React from "react"
import Text from "reap-ui/Utilities/Text"

export default () => (
    <>
        <Text
            color="info"
            style="italic"
            weight="bold"
            size={3}
            alignment="center">
            <p className="mb-3">Text</p>
        </Text>
        <Text
            lineHeight="lg"
            decoration="line-through"
            transform="lowercase"
            break>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. A, quidem! Perferendis laborum, nisi maxime reiciendis quisquam saepe atque laudantium porro earum consequatur, voluptas culpa quas illo consequuntur magnam repellendus sunt.</p>
        </Text>
    </>
)