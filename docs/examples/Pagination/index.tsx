import * as React from "react"
import Pagination from "reap-ui/Pagination"
import Alignment from "reap-ui/Utilities/Flex/Alignment"

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
            <Alignment horizontal="center">
                <Pagination>
                    <Item disabled>Previous</Item>
                    <Item >1</Item>
                    <Item>2</Item>
                    <Item>3</Item>
                    <Item>Next</Item>
                </Pagination>
            </Alignment>
        </div>
        <div className="mb-2">
            <Alignment horizontal="end">
                <Pagination>
                    <Item disabled>Previous</Item>
                    <Item >1</Item>
                    <Item>2</Item>
                    <Item>3</Item>
                    <Item>Next</Item>
                </Pagination>
            </Alignment>
        </div>
    </>
)