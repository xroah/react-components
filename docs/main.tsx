import React from "react"
import { NavLink, Outlet } from "react-router-dom"
import BackToTop from "r-components/back-to-top"
import Button from "r-components/basics/button"

export default function Main() {
    return (
        <div className="main-wrapper">
            <div className="menu-list">
                <NavLink to="/components/accordion">Accordion</NavLink>
                <NavLink to="/components/alert">Alert</NavLink>
                <NavLink to="/components/collapse">Collapse</NavLink>
                <NavLink to="/components/dropdown">Dropdown</NavLink>
                <NavLink to="/components/loading">Loading</NavLink>
                <NavLink to="/components/modal">Modal</NavLink>
                <NavLink to="/components/offcanvas">OffCanvas</NavLink>
                <NavLink to="/components/pagination">Pagination</NavLink>
                <NavLink to="/components/popover">Popover</NavLink>
                <NavLink to="/components/popup">Popup</NavLink>
                <NavLink to="/components/tab">Tab</NavLink>
                <NavLink to="/components/toast">Toast</NavLink>
                <NavLink to="/components/tooltip">Tooltip</NavLink>
            </div>
            <div className="details">
                <Outlet />
            </div>
            <BackToTop>
                <Button variant="secondary">Top</Button>
            </BackToTop>
        </div>
    )
}