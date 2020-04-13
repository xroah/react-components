import * as React from "react";
import { shallow } from "enzyme";
import Button from "../components/Button";

describe("Button component", () => {
    test("Should render as a button", () => {
        const wrapper = shallow(<Button />);

        expect(wrapper.find("button").length).toEqual(1);
    });
});
