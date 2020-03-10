import Carousel from "./Carousel";
import CarouselItem from "./CarouselItem";

type CarouselType = typeof Carousel & { Item: typeof CarouselItem };

const _Carousel = Carousel as CarouselType;

_Carousel.Item = CarouselItem;