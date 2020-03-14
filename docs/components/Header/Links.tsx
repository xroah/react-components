import * as React from "react";
import { NavLink } from "react-router-dom"
import { connect } from "react-redux";

export default connect(
    (state: any) => ({
        lang: state.lang
    })
)(
    ({ lang }: { lang: string; }) => (
        lang === "zh" ?
            (
                <>
                    <NavLink className="nav-link" to="/" exact>首页</NavLink>
                    <NavLink className="nav-link" to="/components">组件</NavLink>
                </>
            ) :
            (
                <>
                    <NavLink className="nav-link" to="/" exact>Home</NavLink>
                    <NavLink className="nav-link" to="/components">Components</NavLink>
                </>
            )
    )
);