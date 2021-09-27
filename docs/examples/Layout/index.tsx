import * as React from "react"
import Container from "reap-ui/Layout/Container"
import Col from "reap-ui/Layout/Col"
import Row from "reap-ui/Layout/Row"
import Alignment from "reap-ui/Alignment"

export default () => (
    <div className="layout-example">
        <div className="mb-5">Layout</div>
        <Container>
            <Row>
                <Col>Column</Col>
                <Col>Column</Col>
                <Col>Column</Col>
                <Col>Column</Col>
            </Row>
        </Container>
        <Container>
            <Row>
                <Col span={1}>1 of 3</Col>
                <Col span={5}>2 of 3</Col>
                <Col span={1}>3 of 3</Col>
            </Row>
        </Container>
        <Container>
            <Row>
                <Col span={{xs: true, lg: 2}}>1 of 3</Col>
                <Col span={{md: "auto"}}>Variable width content</Col>
                <Col span={{xs: true, lg: 2}}>3 of 3</Col>
            </Row>
        </Container>
        <Container className="row-flex-cols">
            <Alignment vertical="center">
                <Row>
                    <Col>One of three columns</Col>
                    <Col>One of three columns</Col>
                    <Col>One of three columns</Col>
                </Row>
            </Alignment>
        </Container>
        <Container>
            <Alignment horizontal="center">
                <Row>
                    <Col span={4}>One of two columns</Col>
                    <Col span={4}>One of two columns</Col>
                </Row>
            </Alignment>
        </Container>
    </div>
)