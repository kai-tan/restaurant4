import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import Header from '../../components/header/Header.component'; 
import styles from './lost-password.module.scss'
import firebase from '../../firebase/firebase.utils';
import VerticallyCentredModal from '../../components/verticallyCentredModal/verticallyCentredModal.component'; 

export default function LostPassword() {

    const [email, setEmail] = useState('')
    const [modalShow, setModalShow] = useState(false);
    const [message, setMessage] = useState(false);


    const handleSubmit = e => {
        e.preventDefault(); 

        

        var auth = firebase.auth();
        var emailAddress = email;

        auth.sendPasswordResetEmail(emailAddress).then(function() {
        // Email sent.
            setModalShow(true); 
            setMessage("Your email has been reset successfully!")

        }).catch(function(error) {
        // An error happened.
            setMessage("Something went wrong.")
        });
    }

    console.log(email);

    return (
        <div className={styles.ourdishes}>
            <Header /> 
            <VerticallyCentredModal show={modalShow}
            onHide={() => { setMessage(''); return setModalShow(false)}}
            message={message} />
            <div className={styles.contentContainer}> 
                <p style={{fontWeight: '500'}}>Lost your password? Please enter your email address. You will receive a link to create a new password via email.</p>
                <Form onSubmit={handleSubmit} style={{marginTop: '25px'}}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Reset Password
                    </Button>
                </Form>
            </div>
        </div>
    )

}
