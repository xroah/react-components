import * as React from "react"
import Background from "reap-ui/Utilities/Background"
import Flex from "reap-ui/Utilities/Flex/Flex"
import Text from "reap-ui/Utilities/Text"

export default () => (
    <>
        <Text size={3} color="primary">
            <p>Flex</p>
        </Text>
        <Background variant="warning">
            <Flex>
                <div>
                    <div className="border border-primary">div 1</div>
                    <div className="border border-primary">div 2</div>
                    <div className="border border-primary">div 3</div>
                </div>
            </Flex>
        </Background>
    </>
)