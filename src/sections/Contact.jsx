import React from 'react';
import styles from './Contact.module.css';
import Button from '../components/Button';
import RevealOnScroll from '../components/RevealOnScroll';

const Contact = () => {
    return (
        <section id="contact" className={styles.contact}>
            <div className={`container ${styles.container}`}>
                <RevealOnScroll width="100%">
                    <p className={styles.overline}>What's Next?</p>
                    <h2 className={styles.title}>Get In Touch</h2>
                    <p className={styles.description}>
                        Although I'm not currently looking for any new opportunities, my inbox is always open.
                        Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>
                    <div style={{ marginTop: '3rem' }}>
                        <Button href="mailto:example@email.com" variant="outline">Say Hello</Button>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default Contact;
