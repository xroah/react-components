import * as React from "react"
import Placeholder from "reap-ui/Placeholder"

export default () => (
    <>
        <div className="mb-2">
            <p className="card-text placeholder-glow">
                <Placeholder className="col-7" />&nbsp;
                <Placeholder className="col-4" />
                <Placeholder className="col-4" />&nbsp;
                <Placeholder className="col-6" />
                <Placeholder className="col-8" />
            </p>
        </div>
        <div className="mb-2">
            <Placeholder width="100%" variant="primary" size="lg"/>
            <Placeholder width="100%" variant="danger"/>
            <Placeholder width="100%" variant="info" size="sm" />
            <Placeholder width="100%" variant="success" size="xs"/>
        </div>
        <div className="mb2">
            <Placeholder />
        </div>
    </>
)