import React, { useState, useEffect, Fragment} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux'; 
import { createStructuredSelector } from 'reselect';


import Header from '../../components/header/Header.component';
import MyVerticallyCenteredModal from '../../components/verticallyCentredModal/verticallyCentredModal.component'
import styles from './account-details.module.scss';
import { SaveAllChangesAsync, setErrorToNull, removeMessage } from '../../redux/user/user.actions'
import { selectCurrentUser, selectIsError, selectFirebaseProviderId, selectIsMessage, selectFirebaseUpdatedDetails} from '../../redux/user/user.selectors'

const AccountDetails = ({selectCurrentUser, selectIsError, selectFirebaseProviderId, selectIsMessage, selectFirebaseUpdatedDetails, SaveAllChangesAsync, setErrorToNull, removeMessage}) => {
    
    const [displayName, setDisplayName] = useState(null)
    const [emailAddress, setEmailAddress] = useState(null)
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [modalShow, setModalShow] = useState(false);

    console.log(selectFirebaseUpdatedDetails.auth.displayName, selectFirebaseUpdatedDetails.profile.displayName);

    useEffect(() => {

        selectIsMessage ? setModalShow(true) : setModalShow(false)

    }, [selectIsMessage])

    const onChangeHandler = (e, name) => {

        setErrorToNull();

        switch (name) {
            case 'displayname': 
                console.log(e.target.value); 
                setDisplayName(e.target.value); 
                break; 
            case 'email': 
                console.log(e.target.value); 
                setEmailAddress(e.target.value); 
                break; 
            case 'newpassword': 
                console.log(e.target.value); 
                setNewPassword(e.target.value);
                break; 
            case 'confirmpassword': 
                console.log(e.target.value); 
                setConfirmPassword(e.target.value); 
                break; 
            default: 
                return; 
        }

    }

    const onSubmitHandler = (e) => {
        e.preventDefault(); 
        
        const allDetails = {
            displayName: displayName ? displayName : selectCurrentUser.displayName,
            emailAddress: emailAddress ? emailAddress : selectCurrentUser.email,
            newPassword,
            confirmPassword
        }

        SaveAllChangesAsync(allDetails); 
        
    }
        
    
  return (
    <div className={styles.initial}>
      {/* <Header /> */}
      <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => removeMessage()}
            message={selectIsMessage}
        />
      <div className={styles.formContainer}>
        <Form onSubmit={onSubmitHandler}> 
            <Form.Group controlId="displayName">
                <Form.Label>Display name*</Form.Label>
                <Form.Control onChange={(e) => {onChangeHandler(e, 'displayname')}} value={displayName !== null ? displayName : (selectFirebaseUpdatedDetails.auth.displayName || selectFirebaseUpdatedDetails.profile.displayName) }  />
            </Form.Group>

            <Form.Group controlId="formGridEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" onChange={(e) => {onChangeHandler(e, 'email')}} value={emailAddress !== null ? emailAddress : selectFirebaseUpdatedDetails.auth.email} />
            </Form.Group>
            {
                selectFirebaseProviderId === 'password' ? 
                (<Fragment> 
                    <p>PASSWORD CHANGE</p>
                    <Form.Group controlId="formGridPassword2">
                        <Form.Label>New password(leave blank to leave unchanged)</Form.Label>
                        <Form.Control type="password" onChange={(e) => {onChangeHandler(e, 'newpassword')}} value={newPassword}/>
                    </Form.Group>
                    <Form.Group controlId="formGridPassword3">
                        <Form.Label>Confirm new password</Form.Label>
                        <Form.Control type="password" onChange={(e) => {onChangeHandler(e, 'confirmpassword')}} value={confirmPassword}/>
                    </Form.Group>
                </Fragment>) : '' 

            }

            <Button variant="success" type="submit">
                SAVE CHANGES
            </Button>
            </Form>
            {
                selectIsError && <p style={{color: 'red'}}>{selectIsError.message}</p>
            }
        </div>
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
    selectCurrentUser: selectCurrentUser,
    selectIsError: selectIsError,
    selectFirebaseProviderId: selectFirebaseProviderId,
    selectIsMessage: selectIsMessage,
    selectFirebaseUpdatedDetails: selectFirebaseUpdatedDetails
})

const mapDispatchToProps = dispatch => ({
    SaveAllChangesAsync: (allDetails) => dispatch(SaveAllChangesAsync(allDetails)),
    setErrorToNull: () => dispatch(setErrorToNull()),
    removeMessage: () => dispatch(removeMessage())
})
  

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetails);
