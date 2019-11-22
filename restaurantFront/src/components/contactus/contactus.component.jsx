import React from 'react'
import { Formik } from 'formik'; 
import * as Yup from 'yup'; 
import axios from 'axios'; 

import styles from './contactus.module.scss'
import Header from '../header/Header.component'
import ErrorMessage from '../../components/errorMessage/errorMessage.component'; 
import SimpleMap from '../../components/simpleMap/simpleMap.component';

const validationSchema = Yup.object().shape({
    name: Yup.string().min(1, "Must have a character").max(255, "Must be shorter than 255").required("Must enter a name"),
    email: Yup.string().email("Must be a valid email address").max(255, "Must be shorter than 255").required("Must enter a email"),
    subject: Yup.string().max(255, "Must be shorter than 255").required("Must enter a subject"),
    message: Yup.string().max(700, "Must be shorter than 700").required("Must enter a message")
})


const ContactUs = () => {
    return (
        <div className={styles.contactUsContainer}>
            <Header />
            <div className={styles.rowContainer}>

                <div className={styles.firstColContainer}>
                    <Formik initialValues={{name: '', email: '', subject: '', message:''}} validationSchema={validationSchema} onSubmit={(values, { setSubmitting, resetForm }) => {
                        setSubmitting(true);
                        console.log(values); 
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2)); 
                            resetForm(); 
                            setSubmitting(false); 
                        }, 500)

                        axios({ 
                            method: 'post', 
                            url: 'https://asia-east2-restaurant-45eb0.cloudfunctions.net/api/sendEmail', 
                            data: JSON.stringify(values),
                            headers: { 
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*'
                            }
                        }).then((result => {
                            console.log(result); 
                            
                        })).catch(error => {
                            console.log(error); 
                        })
                    }}>
                        {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                            <form onSubmit={handleSubmit}>
                                <div className={styles.inputRow}>
                                    <label className={styles.label} htmlFor="name"> 
                                    Name</label>
                                    <input type="text" name="name" id="name" placeholder="Enter your name" onChange={handleChange} value={values.name} onBlur={handleBlur} className={touched.name && errors.name ? 'has-error' : null } />
                                    <ErrorMessage touched={touched.name} message={errors.name} />
                                </div>
                                <div className={styles.inputRow}>
                                    <label className={styles.label} htmlFor="email"> 
                                    Email</label>
                                    <input type="email" name="email" id="email" placeholder="Enter your email" onChange={handleChange} value={values.email} onBlur={handleBlur} className={touched.email && errors.email ? 'has-error' : null }/>
                                    <ErrorMessage touched={touched.email} message={errors.email} />
                                </div>
                                <div className={styles.inputRow}>
                                    <label className={styles.label} htmlFor="subject"> 
                                    Subject</label>
                                    <input type="text" name="subject" id="subject" placeholder="Enter your subject" onChange={handleChange} value={values.subject} onBlur={handleBlur} className={touched.subject && errors.subject ? 'has-error' : null }/>
                                    <ErrorMessage touched={touched.subject} message={errors.subject} />
                                </div>
                                <div className={styles.inputRow}>
                                    <div style={{display: 'flex'}}>
                                        <label className={styles.label} htmlFor="message"> 
                                        Message</label>
                                        <textarea type="text" name="message" id="message"  style={{width: '193px'}}placeholder="Enter your message" onChange={handleChange} value={values.message} onBlur={handleBlur} className={touched.message && errors.message ? 'has-error' : null }/>
                                    </div>
                                    <ErrorMessage touched={touched.message} message={errors.message} />
                                </div>
                                <div className={styles.inputRow} style={{textAlign: 'center'}}>
                                    <button type="submit" disabled={isSubmitting} style={{padding: '0.3rem 0.6rem'}} >Submit</button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
                <div className={styles.secondColContainer}>
                    <SimpleMap /> 
                </div>
            </div>
        </div>
    )
}

export default ContactUs; 