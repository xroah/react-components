import * as React from "react";
import DocHeading from "../DocHeading";
import { connect } from "react-redux";

type type = string | React.ReactNode;

interface DataProps {
    name: type;
    type: type;
    default?: type;
    description?: type;
}

interface Props {
    data: Array<DataProps>;
    title?: string;
    lang?: "en" | "zh";
}

function PropsTable(props: Props) {
    const {
        data,
        lang,
        title
    } = props;

    return (
        <div>
            {title && <DocHeading.H3>{title}</DocHeading.H3>}
            <div className="api-container">
                <table className="table table-bordered table-striped props-table">
                    <thead>
                        {
                            lang === "zh" ? (
                                <tr>
                                    <th>属性</th>
                                    <th>类型</th>
                                    <th>默认值</th>
                                    <th>说明</th>
                                </tr>
                            ) : (
                                    <tr>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Default</th>
                                        <th>Description</th>
                                    </tr>
                                )
                        }
                    </thead>
                    <tbody>
                        {
                            data.map(
                                (item, i) => (
                                    <tr key={typeof item.name === "string" ? item.name : item.name.toString()}>
                                        <td>{item.name}</td>
                                        <td>{item.type}</td>
                                        <td className="default-value">{item.default || "-"}</td>
                                        <td>{item.description}</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default connect(
    (state: any) => ({
        lang: state.lang
    })
)(PropsTable);