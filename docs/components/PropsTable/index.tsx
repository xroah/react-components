import * as React from "react";

interface DataProps {
    name: string;
    type: string;
    default?: string;
    description?: string;
}

interface Props {
    data: Array<DataProps>;
}

export default function PropsTable(props: Props) {
    const {data} = props;

    return (
        <div>
            <table className="table table-bordered table-striped props-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map(
                        item => (
                            <tr key={item.name}>
                                <td>{item.name}</td>
                                <td>{item.type}</td>
                                <td className="default-value">{item.default}</td>
                                <td>{item.description}</td>
                            </tr>
                        )
                    )
                }
                </tbody>
            </table>
        </div>
    );
}