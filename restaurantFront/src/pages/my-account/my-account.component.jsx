import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'

import Header from '../../components/header/Header.component'
import AccountDetails from '../../pages/account-details/account-details.component'
import { signOutStart } from '../../redux/user/user.actions'
import styles from './my-account.module.scss'


const MyAccount = ({signOutStart}) => {
    return (
        <div className={styles.ourdishes}>
            <Header /> 
            <div>
                {/* <div>
                    My Account
                </div> */}


                {/* <div className={styles.contentContainer}> 
                    <div className={styles.sidebarContainer}>

                    </div>
                    <div className={styles.mainContentContainer}>

                    </div>
                </div> */}

                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                            <Nav.Link eventKey="first">Account Details</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link as={Link} to="/signin" onClick={signOutStart}>Sign Out</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        </Col>
                        <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <AccountDetails />
                            </Tab.Pane>
                        </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
  })


export default connect(null, mapDispatchToProps)(MyAccount)