import * as React from "react";
import { handleFuncProp } from "../utils";

interface State {
    value: string
}

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default class ModalInput extends React.Component<Props, State> {
    private inputRef = React.createRef<HTMLInputElement>();

    constructor(props: Props) {
        super(props);

        this.state = {
            value: (props.defaultValue as string) || ""
        };
    }

    handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const value = evt.target.value;

        this.setState({ value })
        handleFuncProp(this.props.onChange)(value);
    }

    focus() {
        const { inputRef: { current: input } } = this;

        input && input.focus();
    }

    render() {
        const props = { ...this.props };
        const { value } = this.state;

        delete props.onChange;

        return (
            <input
                ref={this.inputRef}
                value={value}
                className="form-control"
                onChange={this.handleChange}
                {...props} />
        )
    }
}