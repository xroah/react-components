import * as React from "react";
import { render } from "react-dom";
import Layout from "./Layout";
import { createStore } from "redux";
import reducers from "./reducers";
import { Provider } from "react-redux";
import { REAP_UI_LANG } from "./components/Language/Selector";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/index.scss";

const section = document.createElement("section");

let lang = localStorage.getItem(REAP_UI_LANG);

if (!lang) {
    lang = navigator.language.includes("zh") ? "zh" : "en";
}

const store = createStore(reducers, { lang });

section.id = "root";
document.body.append(section);

render(
    <Provider store={store}>
        <Layout />
    </Provider>,
    section
);