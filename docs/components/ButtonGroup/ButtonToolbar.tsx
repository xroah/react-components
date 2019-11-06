import * as React from "react";
import Button from "../../../src/Button";

export default () => (
    <>
        <Button.Toolbar>
            <Button.Group className="mr-2">
                <Button>1</Button>
                <Button>2</Button>
                <Button>3</Button>
                <Button>4</Button>
            </Button.Group>

            <Button.Group className="mr-2">
                <Button>5</Button>
                <Button>6</Button>
                <Button>7</Button>
            </Button.Group>

            <Button.Group>
                <Button>8</Button>
            </Button.Group>
        </Button.Toolbar>
    </>
);