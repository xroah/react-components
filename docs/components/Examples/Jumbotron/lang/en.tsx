import * as React from "react";

const apiMsg = {
    fluidApi: "To make the jumbotron full width, and without rounded corners"
};

export default {
    compDesc: "Lightweight, flexible component for showcasing hero unit style content.",
    egTitle: "Example",
    egDesc: "A lightweight, flexible component that can optionally extend the entire viewport to showcase key marketing messages on your site.",
    fluidDesc: <>{apiMsg.fluidApi}, pass the <code>fluid</code> prop or within <code>fluid Container</code></>,
    ...apiMsg
}