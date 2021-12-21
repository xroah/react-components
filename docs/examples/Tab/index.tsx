import * as React from "react"
import Tab from "reap-ui/Tab"

export default () => (
    <Tab animation>
        <Tab.Pane title="Home" key="home">
            Home: Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, accusantium consectetur. Quibusdam, ea distinctio libero maiores, neque aut et sequi facilis dicta qui esse, blanditiis dolores debitis suscipit quidem vitae.
        </Tab.Pane>
        <Tab.Pane title="Profile" key="profile">
            Profile: Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero explicabo itaque quos ut molestias provident sequi ipsam amet hic dolorem culpa quo, non, nam assumenda reiciendis rem laudantium placeat magni!
        </Tab.Pane>
        <Tab.Pane title="Contact" key="contact">
            Contact: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas magni quis ducimus ullam! Nemo, earum harum. Quia rerum error, et necessitatibus earum molestias dicta quidem assumenda exercitationem vero, animi repellat?
        </Tab.Pane>
    </Tab>
)