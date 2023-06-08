import React, {
    FC,
    HTMLAttributes,
    ReactElement,
    ReactNode,
    useState
} from "react"
import { OneOf } from "../commons/types"
import { sizes } from "../commons/constants"
import { classnames } from "../utils"
import Item from "./item"
import warning from "warning"
import Dots from "./dots"

const alignments = [
    "start",
    "center",
    "end"
] as const

type BaseProps = Omit<HTMLAttributes<HTMLUListElement>, "onChange">

interface PaginationProps extends BaseProps {
    size?: OneOf<typeof sizes>
    total?: number
    pageSize?: number
    prevText?: ReactNode
    nextText?: ReactNode
    defaultCurrent?: number
    alignment?: OneOf<typeof alignments>
    onChange?: (page: number) => void
}

const Pagination: FC<PaginationProps> = (
    {
        className,
        size,
        pageSize = 10,
        prevText = "上一页",
        nextText = "下一页",
        defaultCurrent = 1,
        total = 0,
        alignment,
        onChange,
        ...restProps
    }: PaginationProps
) => {
    const PREFIX = "pagination"
    const classes = classnames(
        className,
        PREFIX,
        size && `${PREFIX}-${size}`,
        alignment && `justify-content-${alignment}`
    )
    const VISIBLE_PAGES = 7
    const threshold = VISIBLE_PAGES - 2
    const realTotal = Number(total)
    const realPageSize = Number(pageSize)
    const totalPages = Math.ceil(realTotal / realPageSize)
    const [current, setCurrent] = useState(
        () => {
            const c = Number(defaultCurrent)

            if (!c || c < 1 || totalPages === 0) {
                return 1
            }

            if (c > totalPages) {
                return totalPages
            }

            return c
        }
    )
    const goTo = (page: number) => {
        const newPage = page > totalPages ? totalPages :
            page < 1 ? 1 : page

        if (newPage === current) {
            return
        }

        setCurrent(newPage)
        onChange?.(newPage)
    }
    const handleNext = () => goTo(current + 1)
    const handlePrev = () => goTo(current - 1)
    const handleClick = (n?: number) => {
        if (n) {
            goTo(n)
        }
    }
    const createItem = (p: number) => (
        <Item
            page={p}
            active={current === p}
            key={p}
            onClick={handleClick} >
            {p}
        </Item>
    )
    const goToNextFive = () => goTo(current + 5)
    const goToPrevFive = () => goTo(current - 5)
    const generateItems = (start: number, end: number) => {
        const items: ReactElement[] = []

        for (let p = start; p <= end; p++) {
            items.push(createItem(p))
        }

        return items
    }
    let start = 0
    let end = 0
    let lastItem: ReactNode = null
    let showLeftDots = false
    let showRightDots = false

    if (
        !realPageSize ||
        realPageSize < 0 ||
        !isFinite(realPageSize)
    ) {
        warning(
            false,
            "PageSize must be greater than 0 and finite"
        )

        return null
    }

    if (
        Number.isNaN(realTotal) ||
        realTotal < 0 ||
        !isFinite(realTotal)
    ) {
        warning(
            false,
            "Total must be greater or equal than 0 and finite"
        )

        return null
    }

    if (totalPages > 1) {
        if (totalPages <= VISIBLE_PAGES) {
            start = 2
            end = totalPages
        } else {
            const leftEdge = threshold
            const rightEdge = totalPages - threshold

            if (current <= leftEdge) {
                start = 2
                end = threshold + 1
                lastItem = createItem(totalPages)
                showRightDots = true
            } else if (current > rightEdge) {
                start = rightEdge
                end = totalPages
                showLeftDots = true
            } else {
                const num = Math.floor((VISIBLE_PAGES - 2) / 2)
                start = current - num
                end = current + num
                lastItem = createItem(totalPages)
                showLeftDots = showRightDots = true
            }
        }
    }

    return (
        <ul className={classes} {...restProps}>
            <Item disabled={current === 1} onClick={handlePrev}>
                {prevText}
            </Item>
            {createItem(1)}
            {/* dots */}
            {showLeftDots ? <Dots onClick={goToPrevFive} left /> : null}
            {generateItems(start, end)}
            {showRightDots ? <Dots onClick={goToNextFive} /> : null}
            {lastItem}
            {/* totalPages may be 0 */}
            <Item disabled={current >= totalPages} onClick={handleNext}>
                {nextText}
            </Item>
        </ul>
    )
}

export default Pagination