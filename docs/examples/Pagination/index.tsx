import * as React from "react"
import Pagination from "reap-ui/Pagination"

const {Item} = Pagination

export default () => (
    <>
        <div className="mb-2">
            <Pagination>
                <Item>Previous</Item>
                <Item>1</Item>
                <Item>2</Item>
                <Item>3</Item>
                <Item>Next</Item>
            </Pagination>
        </div>
        <div className="mb-2">
            <Pagination>
                <Item disabled>Previous</Item>
                <Item active>1</Item>
                <Item>2</Item>
                <Item>3</Item>
                <Item>Next</Item>
            </Pagination>
        </div>
        <div className="mb-2">
            <Pagination size="lg">
                <Item active>1</Item>
                <Item>2</Item>
                <Item>3</Item>
            </Pagination>
        </div>
        <div className="mb-2">
            <Pagination size="sm">
                <Item active>1</Item>
                <Item>2</Item>
                <Item>3</Item>
            </Pagination>
        </div>
        <div className="mb-2">
            <Pagination alignment="center">
                <Item disabled>Previous</Item>
                <Item >1</Item>
                <Item>2</Item>
                <Item>3</Item>
                <Item>Next</Item>
            </Pagination>
        </div>
        <div className="mb-2">
            <Pagination alignment="end">
                <Item disabled>Previous</Item>
                <Item >1</Item>
                <Item>2</Item>
                <Item>3</Item>
                <Item>Next</Item>
            </Pagination>
        </div>
    </>
)