import React from "react";
import { shallow, mount } from "enzyme";
import { spy } from "sinon";
import Button from "../components/Button";

describe("Button component", () => {
    test("Should render as a button", () => {
        expect(
            shallow(<Button />)
                .type()
        ).toEqual("button")
    })

    test("Should default to 'primary'", () => {
        expect(
            shallow(<Button />)
                .hasClass("btn-primary")
        ).toBeTruthy()
    })

    test("Should render as a outlined button", () => {
        const wrapper = shallow(<Button outline variant="danger" />);

        expect(
            wrapper.hasClass("btn-outline-danger")
        ).toBeTruthy()
        expect(
            wrapper.hasClass("btn-danger")
        ).toBeFalsy()
    })

    test("Should apply default type='button'", () => {
        expect(
            (
                mount(<Button />)
                    .getDOMNode() as HTMLButtonElement
            ).type
        ).toEqual("button")
    })

    test("Should apply type prop", () => {
        expect(
            (
                mount(<Button type="submit" />)
                    .getDOMNode() as HTMLButtonElement
            ).type
        ).toEqual("submit")
    })

    test("Should apply a variant class", () => {
        expect(
            shallow(<Button variant="danger" />)
                .hasClass("btn-danger")
        ).toBeTruthy()
    });

    test("Should apply size class", () => {
        expect(
            shallow(<Button size="lg" />)
                .hasClass("btn-lg")
        ).toBeTruthy()
    })

    test("Should apply block class", () => {
        expect(
            shallow(<Button block />)
                .hasClass("btn-block")
        ).toBeTruthy()
    })

    test("Should apply additional class", () => {
        expect(
            shallow(<Button variant="danger" className="test-class" />)
                .find(".btn-danger.test-class")
                .length
        ).toEqual(1)
    })

    test("Should be disabled", () => {
        expect(
            (
                mount(<Button disabled />)
                    .getDOMNode() as HTMLButtonElement
            ).disabled
        ).toBeTruthy()
    })

    test("Should render as an a if href passed", () => {
        expect(
            shallow(<Button href="#" />)
                .find("a[href='#']")
                .length
        ).toEqual(1)
    })

    test("Should be a disabled link", () => {
        expect(
            shallow(<Button href="#" disabled />)
                .hasClass("disabled")
        ).toBeTruthy()
    })

    test("Should be active", () => {
        expect(
            shallow(<Button active />)
                .hasClass("active")
        ).toBeTruthy()
    })

    test("Should invoke onClick", () => {
        const onClick = spy()

        shallow(<Button onClick={onClick} />).simulate("click")
        expect(onClick.calledOnce).toBeTruthy()
    });

    test("Should ref the button", () => {
        const ref = React.createRef<HTMLAnchorElement>();

        expect(
            mount(
                <Button ref={ref} />
            ).getDOMNode()
        ).toEqual(ref.current)
    })
});
