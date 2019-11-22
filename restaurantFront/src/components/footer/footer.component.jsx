import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons"

import styles from './footer.module.scss'; 

function Footer() {
    return (
        <div style={{backgroundColor: '#777', width: '100%'}}>
            <div className={styles.main}>
                <div className={styles.firstCol}>
                    <div style={{borderBottom: '1px solid #000', display: 'inline-block', marginBottom: '0.7rem'}}>COMPANY</div>
                    <div>
                        <p><Link to="/" className={styles.linkStyle}>Home</Link></p>
                        <p><Link to="/about-us" className={styles.linkStyle}>About Us</Link></p>
                        <p><Link to="/contact-us" className={styles.linkStyle}>Contact Us</Link></p>
                    </div>
                </div>
                <div className={styles.secondCol}>
                    <div style={{borderBottom: '1px solid #000', display: 'inline-block', marginBottom: '0.7rem'}}>CONTACT</div>
                    <div>
                        <p>enquiries@thoseyears.com</p>
                        <p>+07 5569961</p>
                    </div>
                    <div>
                        <a href="https://www.google.com" target="_blank"><FontAwesomeIcon icon={faFacebook} size="lg" color="white" style={{marginRight: '0.5rem'}}/></a>
                        <a href="https://www.google.com" target="_blank"><FontAwesomeIcon icon={faTwitter} size="lg" color="white" style={{marginRight: '0.5rem'}}/></a>
                        <a href="https://www.google.com" target="_blank"><FontAwesomeIcon icon={faInstagram} size="lg" color="white" /></a>
                    </div>
                </div>
                <div className={styles.thirdCol}>
                    <div style={{borderBottom: '1px solid #000', display: 'inline-block', marginBottom: '0.7rem'}}>ADDRESS</div>
                    <div>
                        <p>No 29, Jalan Pendekar 17,</p>
                        <p>Taman Ungku Tun Aminah,</p>
                        <p>81300, Johor Bahru, Malaysia</p>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default Footer;
