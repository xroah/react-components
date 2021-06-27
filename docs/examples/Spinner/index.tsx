import * as React from "react"
import Spinner from "reap-ui/Spinner"

export default () => (
    <>
        <div>
            <Spinner />
            <Spinner type="grow" />
        </div>
        <div>
            <Spinner variant="primary"/>
            <Spinner variant="secondary"/>
            <Spinner variant="success"/>
            <Spinner variant="danger"/>
            <Spinner variant="warning"/>
            <Spinner variant="info"/>
            <Spinner variant="light"/>
            <Spinner variant="dark"/>
        </div>
        <div>
            <Spinner type="grow" variant="primary"/>
            <Spinner type="grow" variant="secondary"/>
            <Spinner type="grow" variant="success"/>
            <Spinner type="grow" variant="danger"/>
            <Spinner type="grow" variant="warning"/>
            <Spinner type="grow" variant="info"/>
            <Spinner type="grow" variant="light"/>
            <Spinner type="grow" variant="dark"/>
        </div>
        <div>
            <Spinner size="sm" />
            <Spinner size="sm" type="grow" />
        </div>
        <div>
            <Spinner size={50} />
            <Spinner size={50} type="grow" />
        </div>
    </>
)