import * as React from "react"
import RightNav from "../../components/RightNav"
import LangMsg from "../../components/Language/LanguageMessage"

export const basicId = "basicExample"
export const basicTitle = <LangMsg id="basicTitle" />
export const ctId = "contentType"
export const ctTitle = <LangMsg id="ctTitle" />
export const bodyId = "body"
export const bodyTitle = <LangMsg id="bodyTitle" />
export const ttlId = "cardTTL"
export const ttlTitle = <LangMsg id="ttlTitle" />
export const lgId = "listGroup"
export const lgTitle = <LangMsg id="lgTitle" />
export const ksId = "kitchenSink"
export const ksTitle = <LangMsg id="ksTitle" />
export const hafId = "headerAndFooter"
export const hafTitle = <LangMsg id="hafTitle" />
export const imgId = "images"
export const imgTitle = <LangMsg id="imgTitle" />
export const icId = "imageCap"
export const icTitle = <LangMsg id="icTitle" />
export const ioId = "imageOverlay"
export const ioTitle = <LangMsg id="ioTitle" />
export const layoutId = "cardLayout"
export const layoutTitle = <LangMsg id="layoutTitle" />
export const groupId = "cardGroup"
export const groupTitle = <LangMsg id="groupTitle" />
export const deckId = "cardDecks"
export const deckTitle = <LangMsg id="deckTitle" />
export const gridId = "gridCards"
export const gridTitle = <LangMsg id="gridTitle" />
export const columnId = "cardColumns"
export const columnTitle = <LangMsg id="columnTitle" />
export const cardApiId = "cardApi"

export default () => (
    <RightNav data={[{
        name: basicTitle,
        href: `#${basicId}`
    }, {
        name: ctTitle,
        href: `#${ctId}`,
        children: [{
            name: bodyTitle,
            href: `#${bodyId}`
        }, {
            name: lgTitle,
            href: `#${lgId}`
        }, {
            name: ksTitle,
            href: `#${ksId}`
        }, {
            name: hafTitle,
            href: `#${hafId}`
        }]
    }, {
        name: imgTitle,
        href: `#${imgId}`,
        children: [{
            name: icTitle,
            href: `#${icId}`
        }, {
            name: ioTitle,
            href: `#${ioId}`
        }]
    }, {
        name: layoutTitle,
        href: `#${layoutId}`,
        children: [{
            name: groupTitle,
            href: `#${groupId}`
        }, {
            name: deckTitle,
            href: `#${deckId}`
        }, {
            name: gridTitle,
            href: `#${gridId}`
        }, {
            name: columnTitle,
            href: `#${columnId}`
        }]
    }, {
        name: "API",
        href: `#${cardApiId}`
    }]} />
)
