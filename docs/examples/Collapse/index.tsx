import * as React from "react"
import Button from "reap-ui/Button"
import Card from "reap-ui/Card"
import Collapse from "reap-ui/Collapse"
import Text from "reap-ui/Utilities/Text"

export default () => {
    const [open1, toggle1] = React.useState(false)
    const handleClick1 = () => {
        toggle1(!open1)
    }
    const [open2, toggle2] = React.useState(false)
    const handleClick2 = () => {
        toggle2(!open2)
    }

    return (
        <>
            <Text color="warning" size={3}>
                <span>Collapse</span>
            </Text>
            <div className="my-3">
                <Button onClick={handleClick1}>Toggle</Button>
                <Collapse open={open1}>
                    <Card>
                        <Card.Body>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique eos accusamus ad. Alias, accusamus? Libero, hic necessitatibus, ex placeat, eaque unde aut soluta culpa impedit enim nostrum consequatur temporibus repudiandae?
                        </Card.Body>
                    </Card>
                </Collapse>
            </div>
            <Text color="warning" size={3}>
                <span>Horizontal collapse</span>
            </Text>
            <div className="my-3">
                <Button onClick={handleClick2}>Toggle</Button>
                <Collapse open={open2} horizontal>
                    <div>
                        <Card style={{width: 300}}>
                            <Card.Body>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti quos totam deleniti fugiat pariatur doloribus consequuntur sed quidem, quis, necessitatibus accusamus aut aspernatur, doloremque saepe dolor quod sequi distinctio laudantium!
                            </Card.Body>
                        </Card>
                    </div>
                </Collapse>
            </div>
        </>
    )
}