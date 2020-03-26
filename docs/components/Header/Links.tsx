import * as React from "react";
import { NavLink } from "react-router-dom"
import { connect } from "react-redux";

const langMsg = {
    en: {
        home: "Home",
        comp: "Component"
    },
    zh: {
        home: "首页",
        comp: "组件"
    }
};

export default connect(
    (state: any) => ({
        lang: state.lang
    })
)(
    ({ lang, onClick }: { lang: string; onClick?: () => void }) => (
        <>
            <NavLink
                className="nav-link"
                to="/"
                onClick={onClick}
                exact>
                {langMsg[lang].home}
            </NavLink>
            <NavLink
                className="nav-link"
                to="/components"
                onClick={onClick}>
                {langMsg[lang].comp}
            </NavLink>
        </>
    )
);