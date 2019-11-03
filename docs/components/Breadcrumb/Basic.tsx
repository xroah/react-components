import * as React from "react";
import Breadcrumb from "../../../src/Breadcrumb";

export default () => (
    <>
        <Breadcrumb>
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="#">Library</Breadcrumb.Item>
            <Breadcrumb.Item active>Data</Breadcrumb.Item>
        </Breadcrumb>
    </>
);

