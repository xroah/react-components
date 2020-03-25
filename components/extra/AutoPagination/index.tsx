import * as React from "react";
import Pagination from "../../basic/Pagination";
import { PaginationProps } from "../../basic/Pagination/Pagination";
import { handleFuncProp } from "../../utils";

const { Item } = Pagination;

export interface AutoPaginationProps extends PaginationProps {
    current?: number;
    defaultCurrent?: number;
    total?: number;
    pageSize?: number;
    nextText?: string | React.ReactNode;
    prevText?: string | React.ReactNode;
    lite?: boolean;
    onPageChange?: (page: number) => void;
}

interface State {
    current: number;
    pageSize: number;
}

export default class AutoPagination extends React.Component<AutoPaginationProps, State> {

    static defaultProps = {
        total: 0,
        defaultCurrent: 1,
        pageSize: 10,
        nextText: "下一页",
        prevText: "上一页",
        lite: false
    }

    constructor(props: AutoPaginationProps) {
        super(props);

        const {
            current,
            defaultCurrent,
            pageSize,
            total
        } = props;
        const _total = AutoPagination.calcPage(total!, pageSize!);

        this.state = {
            current: Math.min(current || defaultCurrent!, _total),
            pageSize: pageSize!
        }
    }

    static getDerivedStateFromProps(nextProps: AutoPaginationProps, nextState: State) {
        const newState = {
            ...nextState
        };

        if ("current" in nextProps) {
            newState.current = nextProps.current!;
        }

        if (nextState.pageSize !== nextProps.pageSize) {
            const pageSize = nextProps.pageSize!;
            const current = newState.current;
            const total = AutoPagination.calcPage(nextProps.total!, pageSize);
            newState.pageSize = pageSize;
            newState.current = current > total ? total : current;
        }

        return newState;
    }

    static calcPage(total: number, pageSize: number) {
        return Math.ceil(total / pageSize) || 1;
    }

    hasPrev = () => {
        return this.state.current > 1;
    }

    hasNext = () => {
        const {
            total
        } = this.props;
        const {
            current,
            pageSize
        } = this.state;

        return current < AutoPagination.calcPage(total!, pageSize);
    }

    toPrev = () => {
        this.handlePage(this.state.current - 1);
    }

    toNext = () => {
        this.handlePage(this.state.current + 1);
    }

    handlePage(page: number) {
        let { current } = this.state;

        if (page !== current) {
            if (!("current" in this.props)) {
                this.setState({
                    current: page
                });
            }

            handleFuncProp(this.props.onPageChange)(page);
        }
    }

    generateItem(page: number) {
        return (
            <Item
                key={page}
                active={page === this.state.current}
                onClick={this.handlePage.bind(this, page)}>
                {page}
            </Item>
        );
    }

    renderPageItems() {
        const {
            props: { total },
            state: {
                current,
                pageSize
            }
        } = this;
        const totalPages = AutoPagination.calcPage(total!, pageSize);
        const ellipsis = <Item disabled>...</Item>;
        const leftEllipsis = React.cloneElement(ellipsis, { key: "leftEllipsis" });
        const rightEllipsis = React.cloneElement(ellipsis, { key: "rightEllipsis" });
        let items: React.ReactNode[] = [];

        if (totalPages <= 10) {
            items = Array(totalPages).fill(0).map((item, i) => this.generateItem(i + 1));
        } else {
            //left ellipsis
            if (current >= totalPages - 4) {
                items = [
                    this.generateItem(1),
                    leftEllipsis,
                    ...Array(6).fill(0).map((item, i) => this.generateItem(i + totalPages - 5))
                ];
            } else if (current <= 5) { //right ellipsis
                items = [
                    ...Array(6).fill(0).map((item, i) => this.generateItem(i + 1)),
                    rightEllipsis,
                    this.generateItem(totalPages)
                ];
            } else { // both ellipsis
                items = [
                    this.generateItem(1),
                    leftEllipsis,
                    this.generateItem(current - 2),
                    this.generateItem(current - 1),
                    this.generateItem(current),
                    this.generateItem(current + 1),
                    this.generateItem(current + 2),
                    rightEllipsis,
                    this.generateItem(totalPages)
                ];
            }
        }

        return items;
    }

    renderLite() {
        const {
            current,
            pageSize
        } = this.state
        const totalPages = AutoPagination.calcPage(this.props.total!, pageSize);

        return <Item disabled>{current} / {totalPages}</Item>
    }

    render() {
        const {
            prevText,
            nextText,
            lite,
            ...otherProps
        } = this.props;

        delete otherProps.onPageChange;
        delete otherProps.current;
        delete otherProps.defaultCurrent;
        delete otherProps.pageSize;
        delete otherProps.total;

        return (
            <Pagination {...otherProps}>
                <Item onClick={this.toPrev} disabled={!this.hasPrev()}>{prevText}</Item>
                {lite? this.renderLite() : this.renderPageItems()}
                <Item onClick={this.toNext} disabled={!this.hasNext()}>{nextText}</Item>
            </Pagination>
        );
    }
}