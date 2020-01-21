import * as React from "react";

export default (props: React.HTMLAttributes<Element>) => (
    <>
        {props.title && (<h3 className="doc-heading">{props.title}</h3>)}
        <div className="text-muted">
        <em>No public props for this component.</em>
    </div>
    </>
);