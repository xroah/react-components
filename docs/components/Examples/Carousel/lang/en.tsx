import * as React from "react";

export default {
    compDesc: "A slideshow component for cycling through elements—images or slides of text—like a carousel.",
    egTitle: "Example",
    egDesc: <>Carousels don’t automatically normalize slide dimensions. As such, you may need to use additional utilities or custom styles to appropriately size content. While carousels support previous/next controls and indicators, they’re not explicitly required. Add and customize as you see fit(Note the presence of the <code>.d-block</code> and <code>.w-100</code> on carousel images to prevent browser default image alignment.).</>,
    animationApi: "Slide effect",
    controlsApi: "Show previous and next arrows for changing the active slide",
    indicatorsApi: "Show slide position indicators",
    defaultIndexApi: "The default index of active slide",
    activeIndexApi: "The index of active slide",
    intervalApi: "The interval(millisecond) for changing the active slide.",
    pauseOnHoverApi: "Pause when mouse hovers the slide",
    touchApi: "Support left/right swipe interactions on touchscreen devices or not",
    onSlideApi: "Callback when the slide started",
    onSlidApi: "Callback when the carousel has completed its slide transition"
};