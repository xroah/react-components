import * as React from "react"
import Button from "reap-ui/Button"
import Card from "reap-ui/Card"
import Collapse from "reap-ui/Collapse"

export default () => {
    const [open, toggle] = React.useState(false)
    const handleClick = () => {
        toggle(!open)
    }

    return (
        <div className="my-3">
            <Button onClick={handleClick}>Toggle</Button>
            <Collapse open={open}>
                <Card>
                    <Card.Body>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique eos accusamus ad. Alias, accusamus? Libero, hic necessitatibus, ex placeat, eaque unde aut soluta culpa impedit enim nostrum consequatur temporibus repudiandae?
                    </Card.Body>
                </Card>
            </Collapse>
        </div>
    )
}