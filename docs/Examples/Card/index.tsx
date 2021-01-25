import * as React from "react"
import { Card } from "reap-ui"
import Main from "../../components/Main"
import DocHeading from "../../components/DocHeading"
import DemoExample from "../../components/DemoExample"
import Basic from "./Basic"
import BasicSrc from "!!raw-loader!./Basic"
import TTL from "./TitlesTextLinks"
import TTLSrc from "!!raw-loader!./TitlesTextLinks"
import SyntaxHighlighter from "../../components/SyntaxHighlighter"
import ListGroup from "./ListGroup"
import ListGroupSrc from "!!raw-loader!./ListGroup"
import KitchenSink from "./KitchenSink"
import KitchenSinkSrc from "!!raw-loader!./KitchenSink"
import FooterHeader from "./FooterHeader"
import FooterHeaderSrc from "!!raw-loader!./FooterHeader"
import ImageCap from "./ImageCap"
import ImageCapSrc from "!!raw-loader!./ImageCap"
import ImageOverlay from "./ImageOverlay"
import ImageOverlaySrc from "!!raw-loader!./ImageOverlay"
import Group from "./Group"
import GroupSrc from "!!raw-loader!./Group"
import Deck from "./Deck"
import DeckSrc from "!!raw-loader!./Deck"
import Grid from "./Grid"
import GridSrc from "!!raw-loader!./Grid"
import Column from "./Column"
import ColumnSrc from "!!raw-loader!./Column"
import API from "./API"
import LangProvider from "../../components/Language/LanguageProvider"
import LangMsg from "../../components/Language/LanguageMessage"
import lang from "./lang"
import RightNav, {
    basicId,
    basicTitle,
    ctId,
    ctTitle,
    bodyId,
    bodyTitle,
    ttlId,
    ttlTitle,
    lgId,
    lgTitle,
    ksId,
    ksTitle,
    hafId,
    hafTitle,
    imgId,
    imgTitle,
    icId,
    icTitle,
    ioId,
    ioTitle,
    layoutId,
    layoutTitle,
    gridId,
    gridTitle,
    groupId,
    groupTitle,
    columnId,
    columnTitle,
    deckId,
    deckTitle,
    cardApiId
} from "./RightNav"

const { H3 } = DocHeading

export default () => (
    <LangProvider language={lang}>
        <Main>
            <DocHeading>Card</DocHeading>
            <div><LangMsg id="compDesc" /></div>
            <H3 id={basicId}>{basicTitle}</H3>
            <DemoExample
                component={<Basic />}
                source={BasicSrc}>
                <LangMsg id="basicDesc" />
            </DemoExample>
            <DocHeading id={ctId}>{ctTitle}</DocHeading>
            <div><LangMsg id="ctDesc" /></div>
            <H3 id={bodyId}>{bodyTitle}</H3>
            <div><LangMsg id="bodyDesc" /></div>
            <div className="bd-example">
                <Card>
                    <Card.Body>This is some text within a card body.</Card.Body>
                </Card>
                <SyntaxHighlighter code={`<Card>
    <Card.Body>This is some text within a card body.</Card.Body>
</Card>`} />
            </div>
            <H3 id={ttlId}>{ttlTitle}</H3>
            <DemoExample
                component={<TTL />}
                source={TTLSrc} />
            <H3 id={lgId}>{lgTitle}</H3>
            <DemoExample
                component={<ListGroup />}
                source={ListGroupSrc} />
            <H3 id={ksId}>{ksTitle}</H3>
            <DemoExample
                component={<KitchenSink />}
                source={KitchenSinkSrc}>
                <LangMsg id="ksDesc" />
            </DemoExample>
            <H3 id={hafId}>{hafTitle}</H3>
            <DemoExample
                component={<FooterHeader />}
                source={FooterHeaderSrc} />
            <DocHeading id={imgId}>{imgTitle}</DocHeading>
            <H3 id={icId}>{icTitle}</H3>
            <DemoExample
                component={<ImageCap />}
                source={ImageCapSrc} />
            <H3 id={ioId}>{ioTitle}</H3>
            <DemoExample
                component={<ImageOverlay />}
                source={ImageOverlaySrc}>
                <LangMsg id="ioDesc" />
            </DemoExample>
            <DocHeading id={layoutId}>{layoutTitle}</DocHeading>
            <H3 id={groupId}>{groupTitle}</H3>
            <DemoExample
                component={<Group />}
                source={GroupSrc}>
                <LangMsg id="groupDesc" />
            </DemoExample>
            <H3 id={deckId}>{deckTitle}</H3>
            <DemoExample
                component={<Deck />}
                source={DeckSrc}>
                <LangMsg id="deckDesc" />
            </DemoExample>
            <H3 id={gridId}>{gridTitle}</H3>
            <DemoExample
                component={<Grid />}
                source={GridSrc}>
                <LangMsg id="gridDesc" />
            </DemoExample>
            <H3 id={columnId}>{columnTitle}</H3>
            <DemoExample
                component={<Column />}
                source={ColumnSrc}>
                <LangMsg id="columnDesc" />
            </DemoExample>
            <DocHeading id={cardApiId}>API</DocHeading>
            <API />
        </Main>
        <RightNav />
    </LangProvider>
)