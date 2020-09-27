import * as React from "react"
import {
    Tabs, Nav, Row, Col 
} from "reap-ui"

const { TabPane } = Tabs

export default () => {
    const [activeKey, update] = React.useState("home")
    const onClick = item => e => {
        update(item)
        e.preventDefault()
    }
    const navItems = [
        "home",
        "profile",
        "messages",
        "settings"
    ].map(item => (
        <Nav.Item key={item}>
            <Nav.Link
                active={activeKey === item}
                onClick={onClick(item)}>
                {item}
            </Nav.Link>
        </Nav.Item>
    ))

    return (
        <Row>
            <Col span={3}>
                <Nav variant="pill" vertical>
                    {navItems}
                </Nav>
            </Col>
            <Col span={9}>
                <Tabs activeKey={activeKey}>
                    <TabPane key="home">
                        Cillum ad ut irure tempor velit nostrud occaecat ullamco aliqua anim Lorem sint. Veniam sint duis incididunt do esse magna mollit excepteur laborum qui. Id id reprehenderit sit est eu aliqua occaecat quis et velit excepteur laborum mollit dolore eiusmod. Ipsum dolor in occaecat commodo et voluptate minim reprehenderit mollit pariatur. Deserunt non laborum enim et cillum eu deserunt excepteur ea incididunt minim occaecat.
                    </TabPane>
                    <TabPane key="profile">
                        Culpa dolor voluptate do laboris laboris irure reprehenderit id incididunt duis pariatur mollit aute magna pariatur consectetur. Eu veniam duis non ut dolor deserunt commodo et minim in quis laboris ipsum velit id veniam. Quis ut consectetur adipisicing officia excepteur non sit. Ut et elit aliquip labore Lorem enim eu. Ullamco mollit occaecat dolore ipsum id officia mollit qui esse anim eiusmod do sint minim consectetur qui.
                    </TabPane>
                    <TabPane key="messages">
                        Fugiat id quis dolor culpa eiusmod anim velit excepteur proident dolor aute qui magna. Ad proident laboris ullamco esse anim Lorem Lorem veniam quis Lorem irure occaecat velit nostrud magna nulla. Velit et et proident Lorem do ea tempor officia dolor. Reprehenderit Lorem aliquip labore est magna commodo est ea veniam consectetur.
                    </TabPane>
                    <TabPane key="settings">
                        Eu dolore ea ullamco dolore Lorem id cupidatat excepteur reprehenderit consectetur elit id dolor proident in cupidatat officia. Voluptate excepteur commodo labore nisi cillum duis aliqua do. Aliqua amet qui mollit consectetur nulla mollit velit aliqua veniam nisi id do Lorem deserunt amet. Culpa ullamco sit adipisicing labore officia magna elit nisi in aute tempor commodo eiusmod.
                    </TabPane>
                </Tabs>
            </Col>
        </Row>
    )
}