import React from 'react'; 

import styles from './errorMessage.module.scss'; 

const ErrorMessage = ({ touched, message}) => {
    if (!touched) {
        return <div className="form-message invalid">&nbsp;</div>
    }
    if (message) {
        return <div className={styles.invalid} style={{marginLeft: '80px'}}>{message}</div> 
    }
    return <div className={styles.valid} style={{marginLeft: '80px'}}>all good</div>


}

export default ErrorMessage; 