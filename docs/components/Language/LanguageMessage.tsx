import * as React from "react";
import { LangMessageContext } from "./context";

export default ({
    id
}: { id: string }) => (
        <LangMessageContext.Consumer>
            {
                value => <>{(value || {})[id]}</>
            }
        </LangMessageContext.Consumer>
    );