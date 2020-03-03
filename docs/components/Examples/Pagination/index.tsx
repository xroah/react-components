import * as React from "react";
import DocHeading from "../../DocHeading";
import { Pagination } from "reap-ui";
import SyntaxHighlighter from "../../SyntaxHighlighter";
import API from "./API";

export default () => (
    <>
        <DocHeading>Pagination</DocHeading>
        <div>
            Indicate a series of related content exists across multiple pages.
        </div>
        <DocHeading tag="h3">Basic</DocHeading>
        <div className="bd-example">
            <Pagination>
                <Pagination.Item>上一页</Pagination.Item>
                <Pagination.Item>1</Pagination.Item>
                <Pagination.Item>2</Pagination.Item>
                <Pagination.Item>3</Pagination.Item>
                <Pagination.Item>下一页</Pagination.Item>
            </Pagination>
            <SyntaxHighlighter code={`<Pagination>
    <Pagination.Item>上一页</Pagination.Item>
    <Pagination.Item>1</Pagination.Item>
    <Pagination.Item>2</Pagination.Item>
    <Pagination.Item>3</Pagination.Item>
    <Pagination.Item>下一页</Pagination.Item>
</Pagination>`} />
        </div>
        <DocHeading tag="h3">Disabled and active states</DocHeading>
        <div>
            Pagination links are customizable for different circumstances. Use <code>disabled</code> for links that appear un-clickable and <code>active</code> to indicate the current page.
        </div>
        <div className="bd-example">
            <Pagination>
                <Pagination.Item disabled>上一页</Pagination.Item>
                <Pagination.Item active>1</Pagination.Item>
                <Pagination.Item>2</Pagination.Item>
                <Pagination.Item>3</Pagination.Item>
                <Pagination.Item>下一页</Pagination.Item>
            </Pagination>
            <SyntaxHighlighter code={`<Pagination>
    <Pagination.Item disabled>上一页</Pagination.Item>
    <Pagination.Item active>1</Pagination.Item>
    <Pagination.Item>2</Pagination.Item>
    <Pagination.Item>3</Pagination.Item>
    <Pagination.Item>下一页</Pagination.Item>
</Pagination>`} />
        </div>
        <DocHeading tag="h3">Sizing</DocHeading>
        <div>
            Fancy larger or smaller pagination? Add <code>size="sm"</code> or <code>size="lg"</code> for additional sizes.
        </div>
        <div className="bd-example">
            <Pagination size="sm">
                <Pagination.Item>1</Pagination.Item>
                <Pagination.Item active>2</Pagination.Item>
                <Pagination.Item>3</Pagination.Item>
            </Pagination>
            <SyntaxHighlighter code={`<Pagination size="sm">
    <Pagination.Item>1</Pagination.Item>
    <Pagination.Item active>2</Pagination.Item>
    <Pagination.Item>3</Pagination.Item>
</Pagination>`} />
        </div>
        <div className="bd-example">
            <Pagination size="lg">
                <Pagination.Item>1</Pagination.Item>
                <Pagination.Item active>2</Pagination.Item>
                <Pagination.Item>3</Pagination.Item>
            </Pagination>
            <SyntaxHighlighter code={`<Pagination size="lg">
    <Pagination.Item>1</Pagination.Item>
    <Pagination.Item active>2</Pagination.Item>
    <Pagination.Item>3</Pagination.Item>
</Pagination>`} />
        </div>
        <DocHeading tag="h3">Alignment</DocHeading>
        <div>
            Change the alignment of pagination components with <code>alignment</code> prop.
        </div>
        <div className="bd-example">
            <Pagination alignment="center">
                <Pagination.Item disabled>上一页</Pagination.Item>
                <Pagination.Item active>1</Pagination.Item>
                <Pagination.Item>2</Pagination.Item>
                <Pagination.Item>3</Pagination.Item>
                <Pagination.Item>下一页</Pagination.Item>
            </Pagination>
            <SyntaxHighlighter code={`<Pagination alignment="center">
    <Pagination.Item disabled>上一页</Pagination.Item>
    <Pagination.Item active>1</Pagination.Item>
    <Pagination.Item>2</Pagination.Item>
    <Pagination.Item>3</Pagination.Item>
    <Pagination.Item>下一页</Pagination.Item>
</Pagination>`} />
        </div>
        <div className="bd-example">
            <Pagination alignment="right">
                <Pagination.Item disabled>上一页</Pagination.Item>
                <Pagination.Item active>1</Pagination.Item>
                <Pagination.Item>2</Pagination.Item>
                <Pagination.Item>3</Pagination.Item>
                <Pagination.Item>下一页</Pagination.Item>
            </Pagination>
            <SyntaxHighlighter code={`<Pagination alignment="right">
    <Pagination.Item disabled>上一页</Pagination.Item>
    <Pagination.Item active>1</Pagination.Item>
    <Pagination.Item>2</Pagination.Item>
    <Pagination.Item>3</Pagination.Item>
    <Pagination.Item>下一页</Pagination.Item>
</Pagination>`} />
        </div>
        <API />
    </>
);