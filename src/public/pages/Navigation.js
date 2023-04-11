import { Link as L } from 'react-router-dom'
import { Navbar, Button, Link, Text, Card, Radio } from "@nextui-org/react";

const TopMenu = () => {
    return (
        <div className='navbar navbar-black set-flex'>
            <div className='w-50'>
                <a href='#' className='item'><i className='fa fa-phone'></i> +1 829-647-8546</a>
                <a href='#' className='item'><i className='fa fa-envelope'></i> rafael.flores.martinez@gmail.com</a>
            </div>
            <div className='w-50 text-right'>
                <a href='#' className='item'><i className='fa fa-linkedin'></i></a>
                <a href='#' className='item'><i className='fa fa-google'></i></a>
                <a href='#' className='item'><i className='fa fa-twitter'></i></a>
                <a href='#' className='item'><i className='fa fa-facebook'></i></a>
            </div>
        </div>
    )
}

const MainMenu = () => {
    return (
        <Navbar variant={'sticky'} css={{ zIndex: 9999 }}>
            <Navbar.Brand>
                <Text weight={'bold'} color="inherit" hideIn="xs">
                    <i className='fa fa-building'></i> USER MANAGER
                </Text>
            </Navbar.Brand>
            <Navbar.Content enableCursorHighlight hideIn="xs">
                <L to={'/'}><Navbar.Item href="#">Home</Navbar.Item></L>
                <L to={'/services'}><Navbar.Item href="#">Services</Navbar.Item></L>
                <L to={'/contact'}><Navbar.Item href="#">Contact</Navbar.Item></L>
            </Navbar.Content>
            <Navbar.Content>
                <Navbar.Link color="inherit" href="#">
                    <Button auto bordered color='gradient'>
                        Login
                    </Button>
                </Navbar.Link>
                <Navbar.Item>
                    <Button auto flat as={Link} href="#">
                        Sign Up
                    </Button>
                </Navbar.Item>
            </Navbar.Content>
        </Navbar>
    )
}

export {
    TopMenu,
    MainMenu
}