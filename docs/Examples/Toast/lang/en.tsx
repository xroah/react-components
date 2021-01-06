import * as React from "react"

export default {
    compDesc: "Toasts are lightweight notifications designed to mimic the push notifications that have been popularized by mobile and desktop operating systems. They’re built with flexbox, so they’re easy to align and position.",
    egTitle: "Example",
    dismissingTitle: "Dismissing",
    autoHideTitle: "Auto hide",
    visibleApi: "Visibility of toasts",
    closableApi: "Show close button or not on the top right",
    titleApi: "Toast title",
    extraApi: "An extra message on the top right",
    iconApi: "An image on the top left",
    iconSizeApi: "Icon size",
    autoHideApi: "Hide the toast automatically after a delay once show",
    delayApi: "A millisecond number for autoHide",
    fadeApi: "Enable fade animation when showing or hiding",
    headerApi: <>Customize the header for toasts(set <code>null</code> if you don't want to show the header)</>,
    onCloseApi: "Callback when the close button is clicked or auto hide",
    onShowApi: <>Callback is invoked when <code>visible</code> changes from <code>false</code> to <code>true</code></>,
    onShownApi: "Callback is invoked when toast has shown",
    onHideApi: <>Callback is invoked when <code>visible</code> changes from <code>true</code> to <code>false</code></>,
    onHiddenApi: "Callback is invoked when toast has hidden"
}