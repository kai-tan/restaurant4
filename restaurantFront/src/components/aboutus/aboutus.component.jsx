import React from 'react'

import styles from './aboutus.module.scss'
import Header from '../header/Header.component'
import AboutImage from '../../assets/images/About.jpeg'

const AboutUs = () => {
    return (
        <div className={styles.aboutUsContainer}>
            <Header />
            <div className={styles.firstRowContainer}>
                <div className={styles.firstcolContainer}><img src={AboutImage} style={{width: '100%', height: '100%'}} /></div>
                <div className={styles.secondcolContainer}>
                    <h2 className={styles.header}>OUR STORY</h2>
                    <p className={styles.paragraph} >Established in 2018, KanShenLu is founded by a few passionate and experienced nutritionists in Singapore and Malaysia. As a team, we sought to make the best health nutrition products for our valued customers.</p>

                    <p className={styles.paragraph} >Having accumulated years of experience in health nutrition, we are constantly improving ourselves by adopting innovative solutions to further enhance the effectiveness and quality of our products.</p>

                    <p className={styles.paragraph}>In KanShenLu, we strive not only to meet your expectation but to exceed them. We believe in building long-term relationships that go beyond one-time engagement and providing true value to our customers on a consistent, ongoing basis. We believe that is the only way where trust can be build.</p>

                    <p>In KanShenLu, we seek not only to be one of your health supplement vendor but your all-time trusted partner and advisor in health nutrition.</p>
                </div>
            </div>
            <div className={styles.secondRowContainer} >
                <div className={styles.thirdcolContainer}>
                    <h2 className={styles.header} >OUR CORPORATE IDENTITY</h2>
                    <p className={styles.paragraph}>“Kan Shen Lu” also symbolizes, as a company, we are constantly aiming to be at the top, to be a market leader in the supply of health nutrition products. It also means consistent innovation and enhancement in delivering the highest-quality products to our customers.</p>

                    <p className={styles.paragraph}>All in all, ‘Kan Shen Lu’ represents our unwavering commitment in providing the best health nutritional solutions for our valued customers</p>
                </div>
                <div className={styles.secondcolContainer}>Right</div>
            </div>
        </div>
    )
}

export default AboutUs; 