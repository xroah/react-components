import * as React from "react"
import BreadCrumb from "reap-ui/Breadcrumb"

export default () => (
    <BreadCrumb>
        <BreadCrumb.Item href="#">Home</BreadCrumb.Item>
        <BreadCrumb.Item href="#">Library</BreadCrumb.Item>
        <BreadCrumb.Item active>Data</BreadCrumb.Item>
    </BreadCrumb>
)