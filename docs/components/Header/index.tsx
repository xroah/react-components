import * as React from "react"
import {
    Navbar,
    Nav,
    Collapse
} from "reap-ui"
import {
    useHistory,
    useLocation
} from "react-router-dom"
import LangSelector from "../Language/Selector"
import Links from "./Links"
import logo from "../../assets/logo.svg"
import github from "../../assets/github.svg"

export default () => {
    const location = useLocation()
    const history = useHistory()
    const handleClickBrand = (evt: React.MouseEvent) => {
        if (location.pathname !== "/") {
            history.push("/")
        }

        evt.preventDefault()
    }
    const [isOpen, toggle] = React.useState(false)
    const handleClick = () => toggle(!isOpen)
    const LOGO_SIZE = 32

    return (
        <div className="bd-header">
            <Navbar
                expand="md"
                variant="dark"
                bg="dark">
                <Navbar.Brand
                    href="#"
                    onClick={handleClickBrand}>
                    <img
                        width={LOGO_SIZE}
                        height={LOGO_SIZE}
                        src={logo}
                        alt="logo" />
                </Navbar.Brand>
                <Nav className="d-none d-md-flex">
                    <Links />
                </Nav>
                <LangSelector className="ml-auto" />
                <a href="https://github.com/xroah/reap-ui" target="_blank">
                    <img
                        width={LOGO_SIZE}
                        height={LOGO_SIZE}
                        src={github}
                        alt="Github" />
                </a>
                <Navbar.Toggle className="ml-3" onClick={handleClick} />
            </Navbar>
            <Collapse className="bg-dark" isOpen={isOpen}>
                <Nav
                    vertical
                    className="pr-3 align-items-end">
                    <Links onClick={handleClick} />
                </Nav>
            </Collapse>
        </div>
    )
}