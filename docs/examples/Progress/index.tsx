import * as React from "react"
import Progress from "reap-ui/Progress"

export default () => (
    <>
        <div className="mb-2">
            <Progress className="mb-2" />
            <Progress className="mb-2" variant="success" value={25} label />
            <Progress className="mb-2" value={75} height={1} />
        </div>
        <div className="mb-2">
            <Progress className="mb-2" value={10} striped />
            <Progress className="mb-2" variant="success" value={25} striped label />
            <Progress className="mb-2" variant="info" value={50} striped />
            <Progress className="mb-2" variant="warning" value={75} striped />
            <Progress className="mb-2" variant="danger" value={100} striped />
        </div>
        <div className="mb-2">
            <Progress>
                <Progress variant="success" value={15} />
                <Progress variant="info" value={30} />
                <Progress variant="warning" value={20} />
            </Progress>
        </div>
        <div className="mb-2">
            <Progress className="mb-2" value={75} striped animated />
        </div>
    </>
)