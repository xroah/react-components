import React from "react"
import ModalExample from "./examples/modal"
import OffCanvas from "./examples/offcanvas"
import Loading from "./examples/loading"
import Toast from "./examples/toast"
import Input from "r-components/basics/input"
import PopupExample from "./examples/popup"
import TooltipExample from "./examples/tooltip"
import PopoverExample from "./examples/popover"
import DropdownExample from "./examples/dropdown"
import BackToTop from "r-components/back-to-top"
import Button from "r-components/basics/button"

export default function App() {

    return (
        <div>
            <ModalExample />
            <OffCanvas />
            <DropdownExample />
            <div>
                <Loading />
            </div>
            <Toast />
            <div>
                <Input />
            </div>
            <PopupExample />
            <PopoverExample />
            <TooltipExample />
            <BackToTop>
                <Button
                    variant="info"
                    onClick={e => {
                        console.log("Back to top")
                        // e.preventDefault()
                    }}>
                    Top
                </Button>
            </BackToTop>
        </div>
    )
}