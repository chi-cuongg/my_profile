import React from 'react';
import styles from './Hero.module.css';
import Button from '../components/Button';
import RevealOnScroll from '../components/RevealOnScroll';

const Hero = () => {
    return (
        <section id="hero" className={styles.hero}>
            <div className={styles.container}>
                <RevealOnScroll>
                    <div className={styles.content}>
                        <p className={styles.greeting}>Hi, my name is</p>
                        <h1 className={styles.name}>Đào Chí Cường.</h1>
                        <h2 className={styles.tagline}>I build things for the web.</h2>
                        <p className={styles.description}>
                            I am a software engineering student with a passion for coding and building useful, innovative applications that solve real-world problems. I'm always eager to learn new technologies and constantly improving my skills to stay up to date in the ever-changing world of software development.
                        </p>
                        <div className={styles.ctaGroup}>
                            <Button href="#projects" variant="primary">Check out my work!</Button>
                            <Button href="#contact" variant="outline">Contact Me</Button>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default Hero;
