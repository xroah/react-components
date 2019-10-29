import * as React from "react";
import { shallow } from "enzyme";
import Button from "../src/button";
import { expect } from "chai";

describe("Button", function () {
    it("Should apply primary class", function() {
        let wrapper = shallow(<Button>button</Button>);
        expect(wrapper.find(".btn.btn-primary").length).to.be.equal(1);
    });
});