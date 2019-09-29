import React from 'react'

import styles from './with-spinner.module.scss'

const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
    return isLoading ? (
        <div className={styles.ldsRing}><div></div><div></div><div></div><div></div></div>
    ) : (
        <WrappedComponent {...otherProps} />
    )
}

export default WithSpinner