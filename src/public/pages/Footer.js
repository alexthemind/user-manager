import { Container, Row, Text } from "@nextui-org/react"


const Footer = () => {
    return (
        <div>
            <div className="footer">
                <Row justify="space-between">
                    <div className="w-30">
                        <h4>Categories</h4>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Services</a></li>
                            <li><a href="#">Contacts</a></li>
                        </ul>
                    </div>
                    <div className="w-30">
                        <h4>Question currently</h4>
                        <ul>
                            <li><a href="#">How manage the users?</a></li>
                            <li><a href="#">Recovery users</a></li>
                            <li><a href="#">What happend if dele user?</a></li>
                        </ul>
                    </div>
                    <div className="w-30">
                        <h4>Another sections</h4>
                        <ul>
                            <li><a href="#">Favorites</a></li>
                            <li><a href="#">Cases especial</a></li>
                            <li><a href="#">Most value user</a></li>
                            <li><a href="#">Global change</a></li>
                        </ul>
                    </div>
                    <div className="w-30">
                        <h4>Contacts</h4>
                        <hr />
                        <Row>
                            <a href="#" className="f-item"><i className="fa fa-linkedin"></i></a>
                            <a href="#" className="f-item"><i className="fa fa-google"></i></a>
                            <a href="#" className="f-item"><i className="fa fa-twitter"></i></a>
                            <a href="#" className="f-item"><i className="fa fa-facebook"></i></a>
                        </Row>
                    </div>
                </Row>
            </div>
            <div className="footer-bottom">
                Copyright by Rafael A. Flores M. 2022
            </div>
        </div>
    )
}

export default Footer