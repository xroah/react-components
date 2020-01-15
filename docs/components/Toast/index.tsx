import * as React from "react";
import { Toast } from "reap-ui";

export default function () {
    const [visible, setVisible] = React.useState(false);
    const toggle = () => setVisible(!visible);

    return (
        <>
            <button onClick={toggle}>TOGGLE</button>
            <Toast
                title="Bootstrap"
                titleImg="https://img1.360buyimg.com/da/jfs/t1/14716/32/11447/94000/5c90a83bEaa611013/18490bf08654ba09.gif?v=0.07977099006579502"
                titleMsg="just now"
                closable={true}
                onClose={toggle}
                autoHide
                visible={visible}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi possimus enim tenetur veritatis? Odio quidem a non, libero porro repudiandae excepturi voluptatem ab saepe ullam reprehenderit expedita? Laboriosam, sint at?
            </Toast>
        </>
    );
}