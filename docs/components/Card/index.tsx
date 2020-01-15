import * as React from "react";
import { Card } from "reap-ui";

export default () => (
    <>
        <Card
            header={<span>test</span>}
            footer={"footer"}
            style={{ width: 300 }}
            title="Title"
            subtitle="Subtitle"
            border="primary"
            // color="white"
            // isImgOverlay={true}
            // imgPosition="bottom"
            // bg="success"
            img={<img alt="img"
                src="https://img10.360buyimg.com/img/jfs/t1/83007/20/13309/249190/5da824bbEdef08493/5cec46741445645a.gif" />}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad animi aperiam, atque culpa cumque
            distinctio, ea eligendi eni
        </Card>
    </>
);