import * as React from "react";
import { Accordion } from "reap-ui";

export default () => {
    return (
        <>
            <Accordion multiple activeKey={[0, 2]}>
                <Accordion.Panel header="Accordion1">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci animi architecto
                    aspernatur consequuntur delectus eius est et explicabo facilis, id in itaque maxime, nesciunt
                    possimus repellat ullam, veniam voluptates?
                </Accordion.Panel>
                <Accordion.Panel header="Accordion2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci animi architecto
                    aspernatur consequuntur delectus eius est et explicabo facilis, id in itaque maxime, nesciunt
                    possimus repellat ullam, veniam voluptates?
                </Accordion.Panel>
                <Accordion.Panel header="Accordion3">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci animi architecto
                    aspernatur consequuntur delectus eius est et explicabo facilis, id in itaque maxime, nesciunt
                    possimus repellat ullam, veniam voluptates?
                </Accordion.Panel>
            </Accordion>
        </>
    );
};