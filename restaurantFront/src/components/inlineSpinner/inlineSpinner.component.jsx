import React from 'react'; 

import styles from './inlineSpinner.module.scss';

const InlineSpinner = () => {
    return (
        <div className={styles.ldsRing} style={{margin: '100px auto', display: 'block'}}><div></div><div></div><div></div><div></div></div>
    )
}

export default InlineSpinner; 