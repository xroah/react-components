import * as React from "react"
import Pagination, {PaginationProps} from "./Pagination"
import Item from "./Item"
import {
    func,
    node,
    number
} from "prop-types"

interface AutoProps extends PaginationProps {
    current?: number
    defaultCurrent?: number
    total?: number
    pageSize?: number
    prevText?: React.ReactNode
    nextText?: React.ReactNode
    onPageChange?: (page: number) => void
}

interface State {
    current: number
    totalPages: number
    _this: AutoPagination
}

const VISIBLE_PAGES = 7

class AutoPagination extends React.Component<AutoProps, State> {
    static defaultProps: AutoProps = {
        defaultCurrent: 1,
        total: 0,
        pageSize: 10,
        prevText: "«",
        nextText: "»"
    }

    static propTypes = {
        current: number,
        defaultCurrent: number,
        total: number,
        pageSize: number,
        prevText: node,
        nextText: node,
        onPageChange: func
    }

    constructor(props: AutoProps) {
        super(props)

        const {current, defaultCurrent} = props
        this.state = {
            current: current || defaultCurrent!,
            totalPages: 0,
            _this: this
        }
    }

    static getDerivedStateFromProps(
        nextProps: AutoProps,
        nextState: State
    ) {
        const {_this} = nextState

        if ("current" in nextProps) {
            nextState.current = nextProps.current!
        }

        const total = _this.getTotal()

        if (total !== nextState.totalPages) {
            nextState.totalPages = total

            if (nextState.current > total) {
                _this.handleChange(nextState.current = total)
            }
        }

        return nextState
    }

    handleChange(page: number) {
        const {onPageChange} = this.props

        if (onPageChange) {
            onPageChange(page)
        }
    }

    getTotal() {
        const {pageSize, total} = this.props

        return Math.ceil(total! / pageSize!)
    }

    to(page: number) {
        if (this.state.current === page) {
            return
        }

        // not controlled
        if (!("current" in this.props)) {
            this.setState({current: page})
        }

        this.handleChange(page)
    }

    prev = (evt: React.MouseEvent) => {
        const {current} = this.state

        if (current === 1) {
            return
        }

        this.to(current - 1)
        evt.preventDefault()
    }

    next = (evt: React.MouseEvent) => {
        const {current, totalPages} = this.state

        if (current === totalPages) {
            return
        }

        this.to(current + 1)
        evt.preventDefault()
    }

    getItem(page: number) {
        const handleClick = (evt: React.MouseEvent) => {
            evt.preventDefault()

            this.to(page)
        }

        return (
            <Item
                key={page}
                onClick={handleClick}
                active={this.state.current === page}>
                {page}
            </Item>
        )
    }

    renderPageItems() {
        const {current, totalPages} = this.state
        const items: Array<JSX.Element | null> = []

        if (totalPages <= VISIBLE_PAGES) {
            for (let i = 0; i < totalPages; i++) {
                items.push(this.getItem(i + 1))
            }

            return items
        }

        const prevBoundary = VISIBLE_PAGES - 2
        const nextBoundary = totalPages - Math.ceil(VISIBLE_PAGES / 2)
        const first = this.getItem(1)
        const last = this.getItem(totalPages)
        let prevEllipsis: JSX.Element | null = (
            <Item href="" key="prev-ellipsis" disabled>...</Item>
        )

        let nextEllipsis: JSX.Element | null = (
            <Item href="" key="next-ellipsis" disabled>...</Item>
        )
        let start = 0
        let end = 0

        if (current < prevBoundary) {
            // show next ellipsis
            start = 2
            end = prevBoundary
            prevEllipsis = null
        } else if (current > nextBoundary) {
            // show prev ellipsis
            start = nextBoundary
            end = totalPages - 1
            nextEllipsis = null
        } else {
            // show both ellipsis
            const offset = Math.floor(VISIBLE_PAGES / 2) - 1
            start = current - offset
            end = current + offset
        }

        for (let i = start; i <= end; i++) {
            items.push(this.getItem(i))
        }

        return [
            first,
            prevEllipsis,
            ...items,
            nextEllipsis,
            last
        ]

    }

    render() {
        const {
            prevText,
            nextText
        } = this.props
        const {current, totalPages} = this.state

        return (
            <Pagination>
                <Item
                    onClick={this.prev}
                    disabled={current === 1}>
                    {prevText}
                </Item>
                {this.renderPageItems()}
                <Item
                    onClick={this.next}
                    disabled={current === totalPages}>
                    {nextText}
                </Item>
            </Pagination>
        )
    }
}

export default AutoPagination