import * as React from "react";
import { Dropdown } from "reap-ui";
import { connect } from "react-redux";
import { updateLanguage } from "../../actions";

export const REAP_UI_LANG = "REAP_UI_LANG";

interface Props {
    lang: string;
    className?: string;
    updateLang: Function;
}

function LanguageSelector(props: Props) {
    const {
        lang,
        updateLang,
        className
    } = props;
    const handleClick = (lang: string) => () => {
        updateLang(lang);
        localStorage.setItem(REAP_UI_LANG, lang);
    };

    return (
        <Dropdown.Button
            overlay={
                <Dropdown.Menu>
                    <Dropdown.Item
                        tag="button"
                        onClick={handleClick("en")}>
                        English
                        </Dropdown.Item>
                    <Dropdown.Item
                        tag="button"
                        onClick={handleClick("zh")}>
                        简体中文
                        </Dropdown.Item>
                </Dropdown.Menu>
            }
            className={className}
            variant="info"
            alignment="right"
            style={{ margin: "0 20px" }}
            outline>
            {lang === "en" ? "English" : "中文"}
        </Dropdown.Button>
    );
}

export default connect(
    (state: any) => ({
        lang: state.lang
    }),
    {
        updateLang: updateLanguage
    }
)(LanguageSelector);