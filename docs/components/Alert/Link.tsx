import * as React from "react";
import { Alert } from "reap-ui";

export default function Basic() {
    return (
        <>
            <Alert variant="primary">
                A simple primary alert with <Alert.Link>an example link</Alert.Link>. Give it a click if you like.
            </Alert>
            <Alert variant="secondary">
                A simple secondary alert with <Alert.Link>an example link</Alert.Link>. Give it a click if you like.
            </Alert>
            <Alert variant="success">
                A simple success alert with <Alert.Link>an example link</Alert.Link>. Give it a click if you like.
            </Alert>
            <Alert variant="danger">
                A simple danger alert with <Alert.Link>an example link</Alert.Link>. Give it a click if you like.
            </Alert>
            <Alert variant="warning">
                A simple warning alert with <Alert.Link>an example link</Alert.Link>. Give it a click if you like.
            </Alert>
            <Alert variant="info">
                A simple info alert with <Alert.Link>an example link</Alert.Link>. Give it a click if you like.
            </Alert>
            <Alert variant="light">
                A simple light alert with <Alert.Link>an example link</Alert.Link>. Give it a click if you like.
            </Alert>
            <Alert variant="dark">
                A simple dark alert with <Alert.Link>an example link</Alert.Link>. Give it a click if you like.
            </Alert>
        </>
    );
}