import React from 'react'; 
import { Link } from 'react-router-dom';

import styles from './Homepage.module.scss'

import BackgroundSlider from 'react-background-slider'
import restaurantFrontCover from '../../assets/images/restaurant-front-page.jpg'
import ladyrestaurant from '../../assets/images/ladyrestaurant.jpg'

const Homepage = () => {
    
    return (
        
        <div className={styles.homepage}>
            <BackgroundSlider
                images={[restaurantFrontCover, ladyrestaurant]}
                duration={10} transition={2} />
            <p style={{fontSize: 50, marginBottom: 10}}>Welcome to Bar Restaurant</p>
            <nav>
                <ul className={styles.text}>
                    <li><Link to="/our-dishes">Our Dishes</Link></li>
                    <li><Link to="/about-us">About Us</Link></li>
                    <li><Link to="/contact-us">Contact Us</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Homepage