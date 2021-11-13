import * as React from "react"
import Input from "reap-ui/Form/Input"

export default () => (
    <>
        <div className="my-3">
            <Input placeholder="name@example.com" />
        </div>
        <div className="my-3">
            <Input variant="textarea" rows={3} />
        </div>
        <div className="my-3">
            <Input plain size="sm" defaultValue="Input component" />
        </div>
        <div className="my-3">
            <Input.Group size="lg">
                <Input placeholder="Username" />
                <Input.Text>@</Input.Text>
                <Input placeholder="server" />
            </Input.Group>
        </div>
    </>
)