import * as React from "react";
import DocHeading from "../../DocHeading";
import Container from "../Container";
import Grid from "../Grid";
import API from "./API";

export default () => (
    <>
        <DocHeading>Overview</DocHeading>
        <div>
            Components and options for laying out your project, including wrapping containers, a powerful grid system, a flexible media object, and responsive utility classes.
        </div>
        <Container />
        <Grid />
        <API />
    </>
);