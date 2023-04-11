import { Grid, Container, Row, Button, Collapse, Avatar, Text, Link } from "@nextui-org/react"


const Services = () => {
    return(
        <Grid.Container gap={2} justify="center">
            <Grid xs></Grid>
            <Grid xs={10}>
                <Container fluid>
                    <Row justify="space-between" align="center">
                        <Row>
                            <h1 id="welcome" style={{ margin: 0}}>Services Section</h1> 
                        </Row>
                        <Row justify="flex-end" align="center" css={{ width: '150px' }}>
                            <Button auto flat><i className="fa fa-info-circle"></i></Button>
                        </Row>
                    </Row>
                    <br />
                    <hr/>
                    <br />
                    <Collapse.Group shadow>
                        <Collapse
                            title={<Text h4>Tracking</Text>}
                            subtitle="4 unread messages"
                            contentLeft={
                            <Avatar
                                text="tr"
                                textColor={'white'}
                                size="lg"
                                color="secondary"
                                bordered
                                squared
                            />
                            }
                        >
                            <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat.
                            </Text>
                        </Collapse>
                        <Collapse
                            title={<Text h4>Communication</Text>}
                            subtitle="3 incompleted steps"
                            contentLeft={
                            <Avatar
                                text="Cm"
                                textColor={'white'}
                                size="lg"
                                color="success"
                                bordered
                                squared
                            />
                            }
                        >
                            <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat.
                            </Text>
                        </Collapse>
                        <Collapse
                            title={<Text h4>Contacts</Text>}
                            subtitle={
                            <Text>
                                2 issues to <Link color>fix now</Link>
                            </Text>
                            }
                            contentLeft={
                            <Avatar
                                text="cn"
                                textColor={'white'}
                                size="lg"
                                color="error"
                                bordered
                                squared
                            />
                            }
                        >
                            <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat.
                            </Text>
                        </Collapse>
                    </Collapse.Group>
                </Container>
            </Grid>
            <Grid xs></Grid>
        </Grid.Container>
    )
}

export default Services