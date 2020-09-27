import * as React from "react"
import PropsTable from "../../PropsTable"
import NoAPI from "../../NoAPI"
import LangMsg from "../../Language/LanguageMessage"

const CarouselProps = [{
    name: "animation",
    type: "\"slide\" | \"fade\"",
    default: "slide",
    description: <LangMsg id="animationApi" />
}, {
    name: "controls",
    type: "boolean",
    default: "true",
    description: <LangMsg id="controlsApi" />
}, {
    name: "indicators",
    type: "boolean",
    default: "true",
    description: <LangMsg id="indicatorsApi" />
}, {
    name: "defaultActiveIndex",
    type: "number",
    default: "0",
    description: <LangMsg id="defaultIndexApi" />
}, {
    name: "activeIndex",
    type: "number",
    default: "0",
    description: <LangMsg id="activeIndexApi" />
}, {
    name: "interval",
    type: "number",
    default: "5000",
    description: <LangMsg id="intervalApi" />
}, {
    name: "pauseOnHover",
    type: "boolean",
    default: "true",
    description: <LangMsg id="pauseOnHoverApi" />
}, {
    name: "touch",
    type: "boolean",
    default: "true",
    description: <LangMsg id="touchApi" />
}, {
    name: "onSlide",
    type: "Function",
    description: <LangMsg id="onSlideApi" />
}, {
    name: "onSlid",
    type: "Function",
    description: <LangMsg id="onSlidApi" />
}]

export default () => (
    <>
        <PropsTable title="Carousel" data={CarouselProps} />
        <NoAPI title="Carousel.Item" />
    </>
)