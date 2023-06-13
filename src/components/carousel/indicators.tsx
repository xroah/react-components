import React, { ReactElement, useMemo } from "react"
import { PREFIX } from "./item"

interface CommonProps {
    onSelect: (index: number) => void
}

interface ItemProps extends CommonProps {
    index: number
    active: boolean
}

interface IndicatorsProps extends CommonProps {
    count: number
    current: number
}

function IndicatorItem(
    {
        onSelect,
        index,
        active
    }: ItemProps
) {
    const handleClick = () => {
        onSelect(index)
    }

    return (
        <button
            type="button"
            data-bs-target
            className={active ? "active" : ""}
            onClick={handleClick} />
    )
}

export default function Indicators(
    {
        count,
        current,
        onSelect
    }: IndicatorsProps
) {
    const items = useMemo(
        () => {
            const items: ReactElement[] = []

            for (let i = 0; i < count; i++) {
                items.push(
                    <IndicatorItem
                        onSelect={onSelect}
                        index={i}
                        key={i}
                        active={current === i} />
                )
            }

            return items
        },
        [count, current, onSelect]
    )

    return (
        <div className={`${PREFIX}-indicators`}>
            {items}
        </div>
    )
}