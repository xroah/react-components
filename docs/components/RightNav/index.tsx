import * as React from "react"
import {
    Col, Nav
} from "reap-ui"
import {
    RouteComponentProps, withRouter
} from "react-router-dom"
import scrollIntoView from "../../scroll-into-view"

interface Link {
    name: string | React.ReactNode
    href: string
    children?: Link[]
}

interface Props extends React.HTMLAttributes<HTMLElement>, RouteComponentProps {
    data: Link[]
}

class RightNav extends React.Component<Props> {

    private timer: any = null
    private clicked = false

    componentDidMount() {
        const {hash} = this.props.location

        window.addEventListener("scroll", this._handleScroll)
        scrollIntoView(hash)
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this._handleScroll)
    }

    removeActive() {
        const actives = document.querySelectorAll(".right-nav .active")

        Array.from(actives).forEach(el => el.classList.remove("active"))
    }

    activateElement(target: HTMLElement) {
        if (!target) {
            return
        }

        const nav = this.closest(target, ".level-2")

        target.classList.add("active")

        if (nav) {
            const a = nav.previousElementSibling

            a && a.classList.add("active")
        }
    }

    closest(target: HTMLElement, selector: string) {
        const body = document.body
        let ret: HTMLElement = target.parentNode as HTMLElement

        while (ret && ret !== body) {
            if (ret.matches(selector)) {
                break
            }

            ret = ret.parentNode as HTMLElement
        }

        return ret === body ? null : ret
    }

    handleScroll = () => {
        const rightNav = document.querySelector(".right-nav")

        this.timer = null

        if (
            !rightNav ||
            getComputedStyle(rightNav).getPropertyValue("display") === "none"
        ) {
            return
        }

        if (this.clicked) {
            return Promise.resolve().then(() => this.clicked = false)
        }

        const anchors = document.querySelectorAll(".right-nav .right-nav-link")
        const as = Array.from(anchors) as Array<HTMLAnchorElement>
        let nextActive: HTMLAnchorElement | null = null

        for (let a of as) {
            let el: HTMLElement

            try {
                el = document.querySelector(a.hash)
            }
            catch (error) {
                continue
            }

            if (!el) {
                continue
            }

            const rectTop = el.getBoundingClientRect().top

            if (rectTop >= window.innerHeight / 2) {
                break
            }
            else if (rectTop <= 150) {
                nextActive = a
            }
        }

        this.removeActive()
        this.activateElement(nextActive)
    };

    _handleScroll = () => {
        if (this.timer !== null) {
            clearTimeout(this.timer)
            this.timer = null
        }

        this.timer = setTimeout(this.handleScroll, 100)
    }

    handleClick = (evt: React.MouseEvent) => {
        const a = evt.target as HTMLAnchorElement
        const hash = a.hash
        const {location, history} = this.props

        if (location.hash !== hash) {
            history.push(`${location.pathname}${hash}`)
        }

        this.clicked = true

        scrollIntoView(hash)

        this.removeActive()
        this.activateElement(a)

        evt.preventDefault()
    };

    handleLink(link: Link[], level = 1) {
        const nav = link.map(l => (
            <Nav.Item key={l.href}>
                <Nav.Link
                    className="right-nav-link"
                    href={l.href}
                    onClick={this.handleClick}>
                    {l.name}
                </Nav.Link>
                {l.children && this.handleLink(l.children, level + 1)}
            </Nav.Item>
        ))
        return (
            <Nav className={`level-${level}`} vertical>
                {nav}
            </Nav>
        )
    }

    render() {
        return (
            <Col
                span={false}
                xl={2}
                className="d-none d-xl-block">
                <div className="right-nav">
                    {this.handleLink(this.props.data)}
                </div>
            </Col>
        )
    }

}

export default withRouter(RightNav)