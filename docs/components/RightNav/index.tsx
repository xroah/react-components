import * as React from "react";
import { Col, Nav } from "reap-ui";
import { RouteComponentProps, withRouter } from "react-router-dom";
import scrollIntoView from "../../scrollIntoView";

interface Link {
    name: string | React.ReactNode;
    href: string;
    children?: Link[];
}

interface Props extends React.HTMLAttributes<HTMLElement>, RouteComponentProps {
    data: Link[];
}

class RightNav extends React.Component<Props> {

    private timer: any = null;

    componentDidMount() {
        window.addEventListener("scroll", this._handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this._handleScroll);
    }

    handleScroll = () => {
        const rightNav = document.querySelector(".right-nav");

        if (
            !rightNav ||
            getComputedStyle(rightNav).getPropertyValue("display") === "none"
        ) return;
        const as = Array.from(document.querySelectorAll(".right-nav .right-nav-link")) as Array<HTMLAnchorElement>;
        const active = document.querySelector(".right-nav .active");
        let nextActive: HTMLAnchorElement | null = null;

        for (let a of as) {
            let el;

            try {
                el = document.querySelector(a.hash);
            } catch (error) {
                
            }

            if (!el) continue;

            const rectTop = el.getBoundingClientRect().top;

            if (rectTop >= window.innerHeight / 2) break;

            if (rectTop <= 150) {
                nextActive = a;
            }
        }

        if (nextActive !== active) {
            active && active.classList.remove("active");
            nextActive && nextActive.classList.add("active");
        }
    };

    _handleScroll = () => {
        if (this.timer !== null) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        //may be activated by scrolling

        this.timer = setTimeout(this.handleScroll, 50);
    }

    handleClick = (evt: React.MouseEvent) => {
        const a = evt.target as HTMLAnchorElement;
        const hash = a.hash;
        const { location, history } = this.props;

        if (location.hash !== hash) {
            //trigger render and scrollIntoView in render method
            history.push(`${location.pathname}${hash}`);
        } else {
            hash && scrollIntoView(hash);
        }

        evt.preventDefault();
    };

    handleLink(link: Link[]) {
        const nav = link.map(l => (
            <Nav.Item key={l.href}>
                <Nav.Link
                    className="right-nav-link"
                    href={l.href}
                    onClick={this.handleClick}>
                    {l.name}
                </Nav.Link>
                {l.children && this.handleLink(l.children)}
            </Nav.Item>
        ));
        return (
            <Nav vertical>
                {nav}
            </Nav>
        );
    };

    render() {
        return (
            <Col
                span={false}
                xl={2}
                className="d-none d-xl-block right-nav">
                {this.handleLink(this.props.data)}
            </Col>
        );
    }

}

export default withRouter(RightNav);